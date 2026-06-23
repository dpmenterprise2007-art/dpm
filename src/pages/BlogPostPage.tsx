import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import BlogPost from '../components/blog/BlogPost';
import BlogGrid from '../components/blog/BlogGrid';
import { getPostBySlug, getRelatedPosts } from '../lib/blog';
import type { BlogPost as BlogPostType } from '../lib/blog';

/**
 * Blog post detail page component
 *
 * Displays a single blog post with related posts.
 * Uses the slug parameter from the URL to find the post.
 */
export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const foundPost = getPostBySlug(slug);
    setPost(foundPost);

    if (foundPost) {
      setRelatedPosts(getRelatedPosts(foundPost, 3));
    }

    setLoading(false);
  }, [slug]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </div>
    );
  }

  // Post not found - redirect to blog
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.title} | DPM Enterprise Blog</title>
        <meta name="description" content={post.excerpt || `${post.title} — read the full article on the DPM Enterprise Design Insights blog.`} />
        <link rel="canonical" href={`https://www.dpmenterprise.in/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.dpmenterprise.in/blog/${post.slug}`} />
        <meta property="og:image" content={post.featuredImage || 'https://www.dpmenterprise.in/airo-assets/images/pages/home/hero'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || post.title} />
        <meta name="twitter:image" content={post.featuredImage || 'https://www.dpmenterprise.in/airo-assets/images/pages/home/hero'} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt || post.title,
          "url": `https://www.dpmenterprise.in/blog/${post.slug}`,
          "image": post.featuredImage || 'https://www.dpmenterprise.in/airo-assets/images/pages/home/hero',
          "datePublished": post.publishedAt,
          "dateModified": post.updatedAt || post.publishedAt,
          "author": { "@type": "Organization", "name": "DPM Enterprise", "@id": "https://www.dpmenterprise.in/#organization" },
          "publisher": { "@id": "https://www.dpmenterprise.in/#organization" },
          "isPartOf": { "@id": "https://www.dpmenterprise.in/blog#blog" }
        })}</script>
      </Helmet>
      {/* Visually-hidden h1 for SEO/accessibility — visual title is styled as <p> in BlogPost */}
      <h1 className="sr-only">{post.title}</h1>
      {/* Back to Blog Link */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>
      </div>

      {/* Blog Post Content */}
      <BlogPost post={post} />

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-16 border-t border-border mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Related Posts
          </h2>
          <BlogGrid posts={relatedPosts} variant="default" columns={3} />
        </div>
      )}
    </div>
  );
}
