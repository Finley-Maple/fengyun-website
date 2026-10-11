import type { Metadata } from 'next';
import ContactPage from '@/components/pages/ContactPage';
import { contactMetadata } from '@/components/pages/contactMeta';

export const metadata: Metadata = contactMetadata.zh;

export default function Page() {
  return <ContactPage lang="zh" />;
}
