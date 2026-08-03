'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Users, User, Settings } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  // Only render on dashboard routes
  if (!pathname?.startsWith('/dashboard')) return null;

  const navItems = [
    {
      label: 'Geral',
      href: '/dashboard',
      icon: LayoutDashboard,
      active: pathname === '/dashboard',
    },
    {
      label: 'Avisos',
      href: '/dashboard/avisos',
      icon: FileText,
      active: pathname === '/dashboard/avisos',
    },
    {
      label: 'Familiares',
      href: '/dashboard/familiares',
      icon: Users,
      active: pathname === '/dashboard/familiares',
    },
    {
      label: 'Perfil',
      href: '/dashboard/perfil',
      icon: User,
      active: pathname === '/dashboard/perfil',
    },
    {
      label: 'Ajustes',
      href: '/dashboard/configuracoes',
      icon: Settings,
      active: pathname === '/dashboard/configuracoes',
    },
  ];

  return (
    <nav aria-label="Navegação móvel" className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FAFAF9]/95 backdrop-blur-md border-t border-[#E7E5E4] px-2 py-1 shadow-lg pb-safe">
      <div className="flex items-center justify-around h-14">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[48px] px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                item.active
                  ? 'text-[#0D9488] font-semibold bg-[#0D9488]/10 scale-105'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${item.active ? 'text-[#0D9488]' : 'text-[#78716C]'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
