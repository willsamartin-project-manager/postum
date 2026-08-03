import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PostumProvider } from '@/context/postum-context';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://postum.app'),
  title: {
    default: 'Postum — Notificação Pós-Morte & Mapeamento de Legado',
    template: '%s | Postum',
  },
  description: 'Plataforma minimalista, segura e humanizada para mapeamento de legado e transmissão de instruções aos familiares.',
  keywords: [
    'mapeamento de legado',
    'notificação pós-morte',
    'planejamento sucessório digital',
    'herança digital',
    'testamento digital',
    'instruções pós-morte',
    'segurança familiar',
    'proteção de bens',
  ],
  authors: [{ name: 'Postum' }],
  creator: 'Postum',
  publisher: 'Postum',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://postum.app',
    title: 'Postum — Notificação Pós-Morte & Mapeamento de Legado',
    description: 'Plataforma minimalista, segura e humanizada para mapeamento de legado e transmissão de instruções aos familiares.',
    siteName: 'Postum',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Postum — Notificação Pós-Morte & Mapeamento de Legado',
    description: 'Plataforma minimalista, segura e humanizada para mapeamento de legado e transmissão de instruções aos familiares.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth overflow-x-hidden">
      <body className="min-h-screen flex flex-col bg-[#FAFAF9] text-[#1C1917] selection:bg-[#0D9488]/20 selection:text-[#0D9488] pb-16 md:pb-0 overflow-x-hidden w-full max-w-full">
        <PostumProvider>
          <Header />
          <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
          <Footer />
          <MobileBottomNav />
        </PostumProvider>
      </body>
    </html>
  );
}
