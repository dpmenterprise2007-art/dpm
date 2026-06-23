/**
 * DPM Enterprise — Shared Dashboard Navigation Config
 * Used by all dashboard pages via Dashboard layout
 */
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  FileText,
  DollarSign,
  MessageCircle,
  Settings,
  Brain,
  Target,
  Megaphone,
  Crown,
  Crosshair,
  CheckCircle,
  BarChart3,
  ShoppingBag,
  UserCheck,
  Zap,
  Bot,
} from 'lucide-react';

export const dpmDashboardNav = {
  sidebar: {
    logo: {
      text: 'DPM Enterprise',
      href: '/dashboard/director',
    },
    navigation: {
      main: [
        { title: 'Director Overview', href: '/dashboard/director', icon: LayoutDashboard },
        { title: 'Control Panel', href: '/dashboard/control-panel', icon: BarChart3 },
        { title: 'Master Sheet', href: '/dashboard/master-sheet', icon: FileText },
        { title: 'All Leads', href: '/dashboard/leads', icon: Users },
        { title: 'Sales Pipeline', href: '/dashboard/sales-pipeline', icon: TrendingUp },
        { title: 'Lead Verification', href: '/dashboard/lead-verification', icon: CheckCircle },
        { title: 'Lead Follow-up', href: '/dashboard/lead-followup', icon: Target },
        { title: 'AI Hunter Control', href: '/dashboard/ai-hunter', icon: Crosshair },
        { title: 'AI Lead Intelligence', href: '/dashboard/ai-lead-intelligence', icon: Brain },
        { title: 'AI Sales & Marketing', href: '/dashboard/ai-sales-marketing', icon: Bot },
        { title: 'AI Master Control', href: '/dashboard/ai-master-control', icon: Zap },
        { title: 'AI Automation', href: '/dashboard/ai-automation', icon: Settings },
        { title: 'Marketing Hub', href: '/dashboard/marketing', icon: Megaphone },
        { title: 'WhatsApp', href: '/dashboard/whatsapp', icon: MessageCircle },
        { title: 'Finance Center', href: '/dashboard/finance', icon: DollarSign },
        { title: 'GeM Portal', href: '/dashboard/gem-portal', icon: ShoppingBag },
        { title: 'Automation Settings', href: '/dashboard/automation-settings', icon: Settings },
      ],
      secondary: [
        { title: 'Admin Portal', href: '/dashboard/admin-portal', icon: Crown },
        { title: 'User Management', href: '/dashboard/admin-users', icon: UserCheck },
      ],
    },
  },
  header: {
    user: {
      name: 'Director',
      email: 'admin@dpmenterprise.in',
      initials: 'DPM',
    },
  },
};
