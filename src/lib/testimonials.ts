export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  company: string;
  projectType: string;
  location: string;
  rating: number;
  testimonial: string;
  image?: string;
  projectValue?: string;
  completionYear: string;
}

/**
 * INSTRUCTIONS FOR UPDATING TESTIMONIALS:
 * 
 * 1. Replace sample testimonials with REAL client testimonials
 * 2. Get written permission from clients before publishing
 * 3. Use actual project details and locations
 * 4. Add real client photos (with permission) or use professional avatars
 * 5. Include project value if client permits
 * 6. Keep testimonials authentic and specific
 * 
 * REQUIRED FIELDS:
 * - name: Client's full name
 * - designation: Their job title
 * - company: Company/Organization name
 * - projectType: Type of project (e.g., "Corporate Office Interior")
 * - location: Project location city
 * - rating: 1-5 stars (be honest)
 * - testimonial: Their actual feedback (2-4 sentences)
 * - completionYear: Year project was completed
 * 
 * OPTIONAL FIELDS:
 * - image: URL to client photo (with permission)
 * - projectValue: Project budget/value (if client permits)
 */

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: '[Client Name]',
    designation: '[Designation]',
    company: '[Company Name]',
    projectType: 'Corporate Office Interior',
    location: 'Mumbai',
    rating: 5,
    testimonial: '[Replace with actual client testimonial. Get written permission before publishing. Include specific details about quality, timeline, and service.]',
    completionYear: '2025',
    projectValue: '₹[Amount] Lakhs',
  },
  {
    id: '2',
    name: '[Client Name]',
    designation: '[Designation]',
    company: '[Company Name]',
    projectType: 'Residential Interior',
    location: 'Virar',
    rating: 5,
    testimonial: '[Replace with actual client testimonial. Focus on design quality, execution, and customer service experience.]',
    completionYear: '2024',
  },
  {
    id: '3',
    name: '[Client Name]',
    designation: '[Designation]',
    company: '[Government Department/PSU]',
    projectType: 'Government Project',
    location: 'Maharashtra',
    rating: 5,
    testimonial: '[Replace with actual client testimonial. Highlight compliance, quality standards, and timely delivery.]',
    completionYear: '2024',
    projectValue: '₹[Amount] Lakhs',
  },
];

/**
 * HOW TO ADD NEW TESTIMONIALS:
 * 
 * 1. Contact completed project clients
 * 2. Request written testimonial and permission to publish
 * 3. Get professional photo or use avatar
 * 4. Copy the template below and fill in real details:
 * 
 * {
 *   id: '[unique-number]',
 *   name: '[Full Name]',
 *   designation: '[Job Title]',
 *   company: '[Company Name]',
 *   projectType: '[Project Type]',
 *   location: '[City]',
 *   rating: [1-5],
 *   testimonial: '[Actual testimonial text]',
 *   completionYear: '[YYYY]',
 *   image: '[optional-photo-url]',
 *   projectValue: '[optional-budget]',
 * }
 * 
 * 5. Add to the testimonials array above
 * 6. Keep most recent testimonials at the top
 */
