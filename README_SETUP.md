# CleanPro UI Components Setup

## Files Created

All production-ready UI components have been created in `src/components/ui/`:

### Component Files (10 total)
1. **Button.tsx** - Primary, secondary, outline, and ghost button variants with sizes
2. **Badge.tsx** - Pill-shaped badges with default, success, and outline variants
3. **Card.tsx** - Flexible card containers with shadows and borders
4. **Input.tsx** - Form input with labels, error states, and helper text
5. **Select.tsx** - Dropdown select with icon and error handling
6. **SectionHeading.tsx** - Reusable section headers with badges and descriptions
7. **Modal.tsx** - Dialog/modal with overlay and close button
8. **Tabs.tsx** - Horizontal pill-style tabs with active states
9. **PricingToggle.tsx** - Monthly/Yearly toggle with savings badge
10. **StarRating.tsx** - Star rating display with full/half stars

### Supporting Files
- **index.ts** - Barrel export for clean imports
- **COMPONENTS.md** - Complete component documentation
- **README_SETUP.md** - This file

## Quick Start

### 1. Install Dependencies

Make sure you have the required Lucide React icons:

```bash
npm install lucide-react
```

### 2. Setup Utilities

Create `src/lib/utils.ts` if it doesn't exist:

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 3. Configure Tailwind

Update `tailwind.config.ts` with custom fonts:

```typescript
import type { Config } from "tailwindcss"

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#2563EB',
        dark: '#0F172A',
      },
    },
  },
}

export default config
```

### 4. Import Fonts

In your `app/layout.tsx` or `pages/_document.tsx`, import the fonts:

```typescript
import { Outfit, Inter } from 'next/font/google'

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-heading',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
})
```

Then apply to your root div:

```typescript
<html className={`${outfit.variable} ${inter.variable}`}>
  <body className="font-body">
    {children}
  </body>
</html>
```

## Component Usage

### Basic Example

```tsx
import { Button, Card, Badge, Input } from '@/components/ui';

export default function Page() {
  return (
    <Card className="max-w-md">
      <Badge>Welcome</Badge>
      <h1 className="text-2xl font-heading font-bold mt-4">
        CleanPro Services
      </h1>
      
      <Input 
        type="email" 
        label="Email" 
        placeholder="your@email.com"
        className="mt-4"
      />
      
      <Button 
        className="mt-6 w-full" 
        size="md"
      >
        Get Started
      </Button>
    </Card>
  );
}
```

## Design Tokens Reference

### Colors
- Primary Blue: `#2563EB` (use `bg-blue-600` or `text-blue-600`)
- Dark Navy: `#0F172A` (use `bg-slate-900` or `text-slate-900`)
- White: `#FFFFFF`
- Light Background: `#F1F5F9` (use `bg-slate-100`)
- Text Gray: `#64748B` (use `text-slate-500`)
- Success Green: Green text on `#DEF7EC` background

### Spacing & Sizing
- Button Border Radius: `rounded-xl` (12px)
- Button Padding (md): `py-3.5 px-8`
- Card Border Radius: `rounded-2xl` (16px)
- Input Border Radius: `rounded-xl`

### Typography
- Headings: `font-heading` (Outfit)
- Body: `font-body` (Inter)
- Button: `font-medium text-lg`

## Component Overview

### Button
- Variants: primary (default), secondary, outline, ghost
- Sizes: sm, md (default), lg
- Features: Optional icon, href support, disabled state

### Badge
- Variants: default (blue), success (green), outline
- Use for: Labels, tags, status indicators

### Card
- Variants: default (subtle shadow), bordered, elevated
- Padding: sm (16px), md (24px, default), lg (32px)
- Use for: Content containers, service cards

### Input
- Features: Label on top, error display, helper text
- Styling: bg-slate-100, focus ring with blue
- Types: email, text, password, etc.

### Select
- Features: Custom chevron icon, error states, helper text
- Requires: options array with value/label pairs

### SectionHeading
- Features: Badge subtitle, large title, description
- Alignment: left (default) or center
- Title supports ReactNode for custom styling

### Modal
- Features: Overlay, close button, scrollable content
- State: Controlled with isOpen prop
- Click outside to close (optional)

### Tabs
- Features: Pill-style buttons, active state styling
- State: Controlled with defaultTab prop
- Callback: onChange fires when tab changes

### PricingToggle
- Features: Smooth animation, SAVE 20% badge
- State: Toggle returns true/false for yearly
- Styling: Blue active, gray inactive

### StarRating
- Features: Full and half stars, custom sizing
- Display: Rating label optional
- Customization: Color property for star color

## File Structure

```
cleanpro-site/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       ├── SectionHeading.tsx
│   │       ├── Modal.tsx
│   │       ├── Tabs.tsx
│   │       ├── PricingToggle.tsx
│   │       ├── StarRating.tsx
│   │       └── index.ts
│   └── lib/
│       └── utils.ts
├── tailwind.config.ts
├── COMPONENTS.md
└── README_SETUP.md
```

## Next Steps

1. Review `COMPONENTS.md` for detailed documentation
2. Start building your pages using these components
3. Customize colors/spacing in `tailwind.config.ts` as needed
4. Add new components to `src/components/ui/` following the same pattern

## Support

For component usage examples, refer to the detailed documentation in `COMPONENTS.md` or check the PropTypes in each component file.
