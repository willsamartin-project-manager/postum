# Postum App Development Plan (`postum-app.md`)

> **Project Type:** WEB (Next.js 15 / App Router, TypeScript, Tailwind CSS, Supabase, Lucide Icons)

---

## Overview

O **Postum (Postum.app)** é uma plataforma minimalista, segura e humanizada de **Notificação Pós-Morte & Mapeamento de Legado (Dead Man's Switch)**. O aplicativo permite ao usuário mapear a existência de contas, investimentos, apólices e instruções para familiares, atrelado a um mecanismo de Heartbeat (Check-in periódico) com fase de carência, carta de aviso prévio e disparo final automatizado.

---

## Tech Stack & Architecture

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS (configurado com o Design System ThoughtStream: Slate `#0F172A`, Teal `#0D9488`, Warm off-white `#FAFAF9`)
- **Icons:** `lucide-react`
- **Database & Backend:** Supabase (PostgreSQL, RLS, Auth, Edge Functions)
- **Local Dev Mock & Simulation:** Provider React com estado em `localStorage` para testes sem chave Supabase.

---

## Key Directories & Files

```
c:/Users/wilkinson/Desktop/Meus Produtos/Postum/
├── postum-spec.md
├── postum-design-system.md
├── postum-app.md
├── supabase/
│   ├── migrations/
│   │   └── 20260802_init.sql
│   └── functions/
│       └── process-checkins/
│           └── index.ts
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx (Landing Page)
│   │   ├── checkin/[token]/page.tsx (Magic Link Check-in)
│   │   ├── cancel-release/[token]/page.tsx (Carta de Aviso / Cancelamento)
│   │   └── dashboard/
│   │       ├── page.tsx (Dashboard principal / Heartbeat)
│   │       ├── avisos/page.tsx (Gerenciador de Avisos)
│   │       ├── familiares/page.tsx (Gerenciador de Destinatários)
│   │       └── configuracoes/page.tsx (Assinatura, Frequência & Simulador)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   ├── CheckinButton.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   └── ProtocolSimulator.tsx
│   │   └── modals/
│   │       ├── NoticeModal.tsx
│   │       └── RecipientModal.tsx
│   ├── context/
│   │   └── postum-context.tsx
│   ├── lib/
│   │   ├── types.ts
│   │   └── supabase/
│   │       └── client.ts
```

---

## Task Breakdown

### Task 1: Setup & Design System Configuration
- **Agent:** `frontend-specialist`
- **Skill:** `frontend-design`
- **INPUT:** `postum-design-system.md`
- **OUTPUT:** `package.json`, `tailwind.config.ts`, `src/app/globals.css`, `src/app/layout.tsx`
- **VERIFY:** `npm run build` passa sem erros de sintaxe ou CSS.

### Task 2: Supabase Schema & Edge Function
- **Agent:** `database-architect`
- **Skill:** `database-design`
- **INPUT:** `postum-spec.md` (Seção 4 & 5)
- **OUTPUT:** `supabase/migrations/20260802_init.sql`, `supabase/functions/process-checkins/index.ts`, `src/lib/types.ts`
- **VERIFY:** Tipagem TypeScript condizente com as tabelas SQL e RLS.

### Task 3: State Context & Simulation Engine
- **Agent:** `frontend-specialist`
- **Skill:** `frontend-architecture`
- **INPUT:** `src/lib/types.ts`
- **OUTPUT:** `src/context/postum-context.tsx` (Suporte a estado dinâmico, CRUD de avisos/familiares, simulador de tempo e fases de protocolo).
- **VERIFY:** Estado reativo funcionando e persistindo no `localStorage`.

### Task 4: Components & Modals
- **Agent:** `frontend-specialist`
- **Skill:** `frontend-design`
- **INPUT:** `postum-design-system.md`
- **OUTPUT:** `Header.tsx`, `Sidebar.tsx`, `Footer.tsx`, `CheckinButton.tsx`, `StatusBadge.tsx`, `NoticeModal.tsx`, `RecipientModal.tsx`, `ProtocolSimulator.tsx`
- **VERIFY:** Todos os componentes renderizam com tokens do Design System.

### Task 5: App Pages Implementation
- **Agent:** `frontend-specialist`
- **Skill:** `nextjs-react-expert`
- **INPUT:** Especificações de telas em `postum-spec.md` (Seção 6)
- **OUTPUT:** Landing Page, Dashboard, Avisos, Familiares, Configurações, Magic Link Check-in e Cancelamento Emergencial.
- **VERIFY:** Navegação entre páginas sem erros, fluxo completo executável.

---

## Phase X: Verification Checklist

- [x] `npm run lint` & `npx tsc --noEmit` passam sem erros
- [x] `npm run build` compila com sucesso
- [x] Landing page reflete a proposta de valor "Zero Armazenamento Sensível"
- [x] Check-in botão Teal (`#0D9488`) atualiza a data do próximo check-in
- [x] Modal de inclusão de avisos mapeia categorias e associa destinatários
- [x] Simulador de protocolo testa os 4 estados: Ativo -> Carência -> Carta de Aviso -> Legado Liberado

## ✅ PHASE X COMPLETE
- Lint & Type Check: ✅ Pass (0 erros)
- Build Verification: ✅ Pass (8/8 rotas estáticas e dinâmicas compiladas)
- Supabase Setup: ✅ `.env.local` configurado com URL e Anon Key
- Date: 2026-08-02

