'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Lock, LayoutDashboard, FileText, Users, Settings, LogOut, Menu, X, User } from 'lucide-react';
import { usePostum } from '@/context/postum-context';
import { StatusBadge } from '@/components/ui/StatusBadge';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { profile, user, logout } = usePostum();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF9]/95 backdrop-blur-md border-b border-[#E7E5E4] w-full max-w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 overflow-hidden">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-[#0F172A] text-white flex items-center justify-center font-serif text-lg sm:text-xl font-bold shadow-sm group-hover:bg-[#1E293B] transition-colors">
            P
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base sm:text-xl font-bold text-[#1C1917] tracking-tight group-hover:text-[#0D9488] transition-colors">
              Postum
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#78716C] -mt-1 font-mono uppercase tracking-wider">
              postum.app
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        {isDashboard ? (
          <nav className="hidden md:flex items-center gap-1 xl:gap-1.5 shrink-0">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs lg:text-sm font-medium whitespace-nowrap transition-colors ${
                pathname === '/dashboard'
                  ? 'bg-[#EFEDEB] text-[#1C1917]'
                  : 'text-[#57534E] hover:bg-[#F5F5F4] hover:text-[#1C1917]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Visão Geral</span>
            </Link>
            <Link
              href="/dashboard/avisos"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs lg:text-sm font-medium whitespace-nowrap transition-colors ${
                pathname === '/dashboard/avisos'
                  ? 'bg-[#EFEDEB] text-[#1C1917]'
                  : 'text-[#57534E] hover:bg-[#F5F5F4] hover:text-[#1C1917]'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>Instituições & Avisos</span>
            </Link>
            <Link
              href="/dashboard/familiares"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs lg:text-sm font-medium whitespace-nowrap transition-colors ${
                pathname === '/dashboard/familiares'
                  ? 'bg-[#EFEDEB] text-[#1C1917]'
                  : 'text-[#57534E] hover:bg-[#F5F5F4] hover:text-[#1C1917]'
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>Destinatários</span>
            </Link>
            <Link
              href="/dashboard/perfil"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs lg:text-sm font-medium whitespace-nowrap transition-colors ${
                pathname === '/dashboard/perfil'
                  ? 'bg-[#EFEDEB] text-[#1C1917]'
                  : 'text-[#57534E] hover:bg-[#F5F5F4] hover:text-[#1C1917]'
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span>Meu Perfil</span>
            </Link>
            <Link
              href="/dashboard/configuracoes"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs lg:text-sm font-medium whitespace-nowrap transition-colors ${
                pathname === '/dashboard/configuracoes'
                  ? 'bg-[#EFEDEB] text-[#1C1917]'
                  : 'text-[#57534E] hover:bg-[#F5F5F4] hover:text-[#1C1917]'
              }`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span>Configurações</span>
            </Link>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#57534E]">
            <a href="#como-funciona" className="hover:text-[#1C1917] transition-colors">Como funciona</a>
            <a href="#zero-storage" className="hover:text-[#1C1917] transition-colors">Zero Armazenamento</a>
            <a href="#planos" className="hover:text-[#1C1917] transition-colors">Planos</a>
            <a href="#faq" className="hover:text-[#1C1917] transition-colors">Perguntas</a>
          </nav>
        )}

        {/* User Auth & Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard/perfil"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[#57534E] hover:text-[#1C1917] bg-[#F5F5F4] hover:bg-[#EFEDEB] px-2.5 py-1.5 rounded border border-[#E7E5E4] max-w-[140px] md:max-w-[180px] lg:max-w-[220px] truncate transition-colors"
                title="Editar perfil"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Conta Ativa" />
                <span className="truncate">{profile?.full_name || user.email}</span>
              </Link>
              <button
                onClick={logout}
                className="p-2 min-h-[38px] min-w-[38px] flex items-center justify-center text-[#78716C] hover:text-[#DC2626] hover:bg-red-50 rounded transition-colors"
                title="Sair da conta"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-1 px-3 sm:px-4 py-2 min-h-[40px] bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs sm:text-sm font-semibold rounded-md transition-colors shadow-sm whitespace-nowrap shrink-0"
            >
              <span className="sm:hidden">Entrar</span>
              <span className="hidden sm:inline">Entrar / Cadastrar</span>
            </Link>
          )}

          {!isDashboard && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#1C1917]"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu for Landing Page */}
      {!isDashboard && mobileMenuOpen && (
        <div className="md:hidden bg-[#FAFAF9] border-b border-[#E7E5E4] px-4 py-4 space-y-3 font-medium text-sm text-[#1C1917] animate-in slide-in-from-top-2">
          <a
            href="#como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-[#E7E5E4]"
          >
            Como funciona
          </a>
          <a
            href="#zero-storage"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-[#E7E5E4]"
          >
            Zero Armazenamento
          </a>
          <a
            href="#planos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-[#E7E5E4]"
          >
            Planos
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2"
          >
            Perguntas
          </a>
        </div>
      )}
    </header>
  );
};
