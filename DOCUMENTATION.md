# Fixsova Clone - Documentação Completa

## A. Resumo do Site Analisado

O **Fixsova** é um template de site profissional para serviços de limpeza residencial e comercial construído no Webflow. O site apresenta design moderno, limpo e minimalista com foco em conversão, confiança e agendamento de serviços.

**Seções principais da Home:** Hero com calculadora de preço, Serviços com tabs, Por que Escolher, O que Fazemos, Depoimentos, Preços com toggle mensal/anual, Agendamento, Blog, CTA final.

---

## B. Mapa de Páginas

```
/ (Home)
├── /about (Sobre Nós)
├── /services (Serviços)
├── /pricing (Preços)
├── /contact (Contato)
├── /faq (Perguntas Frequentes)
├── /blog (Blog/Journal)
├── /team (Nossa Equipe)
├── /booking (Agendamento)
└── /legal
    ├── /legal/terms (Termos de Serviço)
    └── /legal/privacy (Política de Privacidade)
```

**Navegação principal:** Home | About | Services | Pages (dropdown) | Contact Us
**Dropdown "Pages":** Our Team, Booking, Blog, Pricing, FAQ

---

## C. Design System

### Cores
| Token | Hex | Uso |
|-------|-----|-----|
| Primary | #2563EB | Botões, links, destaques |
| Dark | #0F172A | Texto, navbar, footer |
| Muted | #64748B | Texto secundário |
| Surface | #F8FAFC | Backgrounds alternados |
| Surface-Alt | #F1F5F9 | Inputs, cards |
| Border | #E2E8F0 | Bordas, divisores |
| Green Accent | #03543F / #DEF7EC | Badges de sucesso |

### Tipografia
| Elemento | Fonte | Tamanho | Peso |
|----------|-------|---------|------|
| H1 (Display) | Outfit | 76px | 700 |
| H2 | Outfit | 48px | 700 |
| H3 | Outfit | 36px | 600 |
| H4 | Outfit | 24px | 600 |
| Body | Inter | 18px | 400 |
| Body Large | Inter | 20px | 400 |
| Caption | Inter | 14px | 400 |

### Componentes
- **Botões:** border-radius 12px, padding 14px 32px, variantes primary/secondary/outline
- **Cards:** rounded-2xl (16px), shadow-card, border border-slate-200
- **Badges:** rounded-full, text pequeno, variantes primary/success/outline
- **Inputs:** rounded-xl, bg-slate-50, border-slate-200, focus:ring-primary
- **Seções:** padding vertical 80-120px, max-width 1280px

### Responsividade
- Mobile first (< 640px)
- Tablet (sm: 640px)
- Desktop (md: 768px, lg: 1024px)
- Large (xl: 1280px)

---

## D. Arquitetura Técnica

**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS 3.4
**Dependências extras:** lucide-react (ícones), framer-motion (animações), clsx + tailwind-merge (utilitários)

---

## E. Estrutura de Arquivos

```
cleanpro-site/
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
└── src/
    ├── app/
    │   ├── layout.tsx              # Layout raiz (fonts, Header, Footer)
    │   ├── page.tsx                # Home (9 seções)
    │   ├── about/page.tsx          # Sobre nós
    │   ├── services/page.tsx       # Serviços
    │   ├── pricing/page.tsx        # Preços + FAQ
    │   ├── contact/page.tsx        # Contato + formulário
    │   ├── faq/page.tsx            # FAQ accordion
    │   ├── blog/page.tsx           # Blog grid
    │   ├── team/page.tsx           # Equipe
    │   ├── booking/page.tsx        # Agendamento
    │   └── legal/
    │       ├── terms/page.tsx      # Termos de serviço
    │       └── privacy/page.tsx    # Política de privacidade
    ├── components/
    │   ├── ui/                     # 10 componentes reutilizáveis
    │   │   ├── Badge.tsx
    │   │   ├── Button.tsx
    │   │   ├── Card.tsx
    │   │   ├── Input.tsx
    │   │   ├── Select.tsx
    │   │   ├── Modal.tsx
    │   │   ├── Tabs.tsx
    │   │   ├── PricingToggle.tsx
    │   │   ├── SectionHeading.tsx
    │   │   ├── StarRating.tsx
    │   │   └── index.ts
    │   ├── layout/                 # Componentes de layout
    │   │   ├── Header.tsx          # Navbar sticky
    │   │   ├── Footer.tsx          # Footer dark
    │   │   ├── PageHero.tsx        # Hero reutilizável
    │   │   └── index.ts
    │   └── sections/               # Seções da Home
    │       ├── HeroSection.tsx
    │       ├── ServicesSection.tsx
    │       ├── WhyChooseSection.tsx
    │       ├── WhatWeDoSection.tsx
    │       ├── TestimonialsSection.tsx
    │       ├── PricingSection.tsx
    │       ├── BookingSection.tsx
    │       ├── BlogSection.tsx
    │       ├── CTASection.tsx
    │       └── index.ts
    ├── data/
    │   └── site.ts                 # TODOS os dados do site
    ├── lib/
    │   └── utils.ts                # cn() e utilidades
    ├── styles/
    │   └── globals.css             # Estilos globais + Tailwind
    └── types/
        └── index.ts                # Interfaces TypeScript
```

**Total: 46 arquivos | ~3850 linhas de código**

---

## F. Como Usar

### Instalação
```bash
cd cleanpro-site
npm install
npm run dev
```
Acesse http://localhost:3000

### Como editar conteúdo
Edite o arquivo `src/data/site.ts`. Todos os textos, preços, serviços, depoimentos e dados estão centralizados nele.

### Como trocar cores
Edite `tailwind.config.ts` na seção `colors`. Os tokens semânticos (primary, dark, muted, etc.) propagam automaticamente para todos os componentes.

### Como trocar fontes
1. Edite `src/app/layout.tsx` para trocar as fontes do Next.js
2. Atualize `tailwind.config.ts` na seção `fontFamily`

### Como adicionar novas páginas
1. Crie uma pasta em `src/app/nome-da-pagina/`
2. Adicione `page.tsx` com o componente da página
3. Adicione a rota na navegação em `src/data/site.ts`

### Como manter consistência visual
- Use sempre os componentes de `@/components/ui/` (Button, Badge, Card, etc.)
- Use as classes do Tailwind config (não hardcode cores)
- Siga o padrão: Badge de subtítulo + Heading + Descrição para cada seção
- Use `container-main` e `section-padding` para layout consistente

---

## G. Convenções

- **Nomenclatura:** PascalCase para componentes, camelCase para funções/variáveis
- **Imports:** Paths absolutos com `@/` (ex: `@/components/ui/Button`)
- **Componentes client:** Usar `'use client'` apenas quando necessário (estado, efeitos)
- **Dados:** Centralizados em `src/data/site.ts`, tipados em `src/types/index.ts`
- **Estilo:** Tailwind utility-first, sem CSS custom exceto globals.css

---

## H. Próximos Passos

1. **Imagens:** Substituir placeholders por imagens reais (Unsplash, fotos próprias)
2. **Animações:** Adicionar framer-motion para scroll animations (fade-in, slide-up)
3. **Forms:** Conectar formulários a backend (API Routes ou serviço externo)
4. **CMS:** Integrar blog com headless CMS (Contentful, Sanity, etc.)
5. **SEO:** Adicionar sitemap.xml, robots.txt, Open Graph meta tags
6. **Analytics:** Integrar Google Analytics ou Plausible
7. **Testes:** Adicionar testes com Jest + React Testing Library
8. **Deploy:** Deploy no Vercel (recomendado para Next.js)
