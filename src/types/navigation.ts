export interface NavItem {
  label: string;
  href: string;
}

export const navigationItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '/experience' },
  { label: 'CV', href: '/cv' },
  { label: 'Publications', href: '/publications' },
  { label: 'Personal Interests', href: '/personal-interests' },
  { label: 'Contact', href: '/contact' },
]; 