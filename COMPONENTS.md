# UI Components Documentation

This document describes all reusable UI components built for the CleanPro website using Next.js 14, Tailwind CSS, and TypeScript.

## Design System

### Colors
- **Primary Blue**: #2563EB (`bg-blue-600`, `text-blue-600`)
- **Dark Navy**: #0F172A (`bg-slate-900`, `text-slate-900`)
- **White**: #FFFFFF
- **Light Background**: #F1F5F9 (`bg-slate-100`)
- **Text Gray**: #64748B (`text-slate-500`)
- **Success Green**: #03543F text on #DEF7EC background
- **Border**: #E2E8F0 (`border-slate-200`)

### Typography
- **Headings**: Outfit font family (`font-heading`)
- **Body**: Inter font family (`font-body`)
- **Button**: `font-medium` at `text-lg` with `rounded-xl` (12px border radius)
- **Button Padding**: `py-3.5 px-8` (md size)

---

## Components

### 1. Button

A versatile button component with multiple variants and sizes.

**Location**: `src/components/ui/Button.tsx`

**Props**:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
```

**Variants**:
- `primary`: Blue background with white text (default)
- `secondary`: Dark navy background with white text
- `outline`: Border style with transparent background
- `ghost`: No background, text only

**Sizes**:
- `sm`: Small padding, smaller text
- `md`: Standard size with `py-3.5 px-8` (default)
- `lg`: Large padding and text

**Example Usage**:
```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md">
  Get Started
</Button>

<Button variant="outline" href="/services">
  Learn More
</Button>

<Button icon={<ArrowRight />} onClick={handleClick}>
  Submit
</Button>
```

---

### 2. Badge

Small pill-shaped badge component for labels and tags.

**Location**: `src/components/ui/Badge.tsx`

**Props**:
```typescript
interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'outline';
  className?: string;
}
```

**Variants**:
- `default`: Blue background, white text
- `success`: Green background (#DEF7EC), dark text
- `outline`: Border with transparent background

**Example Usage**:
```tsx
import { Badge } from '@/components/ui';

<Badge variant="default">Live System</Badge>
<Badge variant="success">Featured</Badge>
<Badge variant="outline">Coming Soon</Badge>
```

---

### 3. Card

Flexible card container with multiple style variants.

**Location**: `src/components/ui/Card.tsx`

**Props**:
```typescript
interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'sm' | 'md' | 'lg';
}
```

**Variants**:
- `default`: White background with subtle shadow
- `bordered`: White background with border
- `elevated`: White background with pronounced shadow

**Padding**:
- `sm`: 16px (1rem)
- `md`: 24px (1.5rem) - default
- `lg`: 32px (2rem)

**Example Usage**:
```tsx
import { Card } from '@/components/ui';

<Card variant="default" padding="lg">
  <h3>Service Card</h3>
  <p>Description here</p>
</Card>

<Card variant="elevated" className="hover:shadow-xl">
  Featured content
</Card>
```

---

### 4. Input

Text input field with label, error handling, and validation states.

**Location**: `src/components/ui/Input.tsx`

**Props**:
```typescript
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}
```

**Features**:
- Rounded corners (`rounded-xl`)
- Light background (`bg-slate-100`)
- Focus ring with primary color
- Error state styling
- Helper text support
- Label positioned above input

**Example Usage**:
```tsx
import { Input } from '@/components/ui';

<Input
  type="email"
  label="Email Address"
  placeholder="your@email.com"
  error={emailError}
  helperText="We'll never share your email"
/>

<Input
  type="text"
  label="Full Name"
  required
/>
```

---

### 5. Select

Dropdown select component matching Input styling.

**Location**: `src/components/ui/Select.tsx`

**Props**:
```typescript
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

interface SelectOption {
  value: string;
  label: string;
}
```

**Features**:
- Matches Input styling
- Custom chevron icon
- Disabled state support
- Error handling
- Helper text

**Example Usage**:
```tsx
import { Select } from '@/components/ui';

const serviceOptions = [
  { value: 'residential', label: 'Residential Cleaning' },
  { value: 'commercial', label: 'Commercial Cleaning' },
  { value: 'deep', label: 'Deep Cleaning' },
];

<Select
  label="Service Type"
  options={serviceOptions}
  placeholder="Select a service"
  onChange={(e) => console.log(e.target.value)}
/>
```

---

### 6. SectionHeading

Reusable section header with badge, title, and description.

**Location**: `src/components/ui/SectionHeading.tsx`

**Props**:
```typescript
interface SectionHeadingProps {
  subtitle?: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}
```

**Features**:
- Badge subtitle support
- Large heading (text-4xl → text-5xl on desktop)
- Optional description text
- Left or center alignment
- Title can contain ReactNode for custom styling

**Example Usage**:
```tsx
import { SectionHeading } from '@/components/ui';

<SectionHeading
  subtitle="ABOUT US"
  title="Professional Cleaning Services"
  description="We provide top-quality cleaning solutions for homes and businesses"
  align="center"
/>

// With styled title
<SectionHeading
  title={
    <>
      Why Choose <span className="text-blue-600">CleanPro</span>
    </>
  }
  align="left"
/>
```

---

### 7. Modal

Dialog/modal component with overlay and content area.

**Location**: `src/components/ui/Modal.tsx`

**Props**:
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
  closeButton?: boolean;
}
```

**Features**:
- Overlay with semi-transparent background
- Close button with X icon
- Scrollable content area
- Optional title header
- Body overflow prevention
- Click outside to close
- Smooth animations

**Example Usage**:
```tsx
import { Modal } from '@/components/ui';
import { useState } from 'react';

export function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Watch Demo</button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Our Service Process"
      >
        <video width="100%" controls>
          <source src="/demo.mp4" type="video/mp4" />
        </video>
      </Modal>
    </>
  );
}
```

---

### 8. Tabs

Horizontal tab component with active states and content switching.

**Location**: `src/components/ui/Tabs.tsx`

**Props**:
```typescript
interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}
```

**Features**:
- Pill-style tab buttons
- Active state (blue bg, white text)
- Inactive state (gray text)
- Hover effects
- Callback on tab change
- Default tab selection

**Example Usage**:
```tsx
import { Tabs } from '@/components/ui';

const serviceTabs = [
  {
    id: 'residential',
    label: 'Residential',
    content: <ResidentialServices />
  },
  {
    id: 'commercial',
    label: 'Commercial',
    content: <CommercialServices />
  },
  {
    id: 'deep',
    label: 'Deep Cleaning',
    content: <DeepCleaningServices />
  },
];

<Tabs
  tabs={serviceTabs}
  defaultTab="residential"
  onChange={(tabId) => console.log(`Selected: ${tabId}`)}
/>
```

---

### 9. PricingToggle

Monthly/Yearly pricing toggle switch.

**Location**: `src/components/ui/PricingToggle.tsx`

**Props**:
```typescript
interface PricingToggleProps {
  onChange?: (isYearly: boolean) => void;
  defaultYearly?: boolean;
}
```

**Features**:
- Smooth animated toggle
- "SAVE 20%" badge for yearly
- Color changes based on state
- Callback on toggle change
- Responsive design

**Example Usage**:
```tsx
import { PricingToggle } from '@/components/ui';
import { useState } from 'react';

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div>
      <PricingToggle
        onChange={(yearly) => setIsYearly(yearly)}
      />
      
      <div className="grid grid-cols-3 gap-6 mt-12">
        {plans.map(plan => (
          <PlanCard
            key={plan.id}
            price={isYearly ? plan.yearlyPrice : plan.monthlyPrice}
            {...plan}
          />
        ))}
      </div>
    </div>
  );
}
```

---

### 10. StarRating

Star rating display component.

**Location**: `src/components/ui/StarRating.tsx`

**Props**:
```typescript
interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  color?: string;
}
```

**Features**:
- Display ratings with stars (full and half)
- Customizable star size
- Optional rating label
- Custom color support
- Yellow stars by default

**Example Usage**:
```tsx
import { StarRating } from '@/components/ui';

<StarRating rating={4.9} />

<StarRating
  rating={3.5}
  size="lg"
  showLabel={true}
  color="text-blue-600"
/>

// In customer reviews
<StarRating rating={5} maxRating={5} />
```

---

## Global Utilities

All components use the `cn()` utility from `@/lib/utils` for class merging. Make sure you have:

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Tailwind Configuration

Ensure your `tailwind.config.ts` includes custom fonts:

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

## Usage Pattern

Always import from the barrel export:

```tsx
import { Button, Badge, Card, Input, Select } from '@/components/ui';
```

Not:

```tsx
import { Button } from '@/components/ui/Button';
```

---

## Testing & Accessibility

All components follow these accessibility guidelines:

- Semantic HTML (`button`, `input`, `select`)
- ARIA labels where appropriate
- Keyboard navigation support
- Focus states clearly visible
- Color contrast meets WCAG AA standards
- Form labels associated with inputs

---

## Future Enhancements

Potential additions:

- Tooltip component
- Dropdown menu component
- Breadcrumb navigation
- Pagination
- Alert/Toast notifications
- Form validation hooks
- Loading states for Button
- Skeleton loaders
