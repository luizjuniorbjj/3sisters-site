# Component Examples & Usage Guide

Quick reference for implementing each UI component with real-world examples.

## 1. Button Component

```tsx
import { Button } from '@/components/ui';
import { ArrowRight, Check } from 'lucide-react';

// Primary variant (default)
<Button>Get Started</Button>

// With icon
<Button icon={<ArrowRight size={20} />}>
  Explore Services
</Button>

// Secondary variant
<Button variant="secondary" size="lg">
  Learn More
</Button>

// Outline variant
<Button variant="outline">
  View Pricing
</Button>

// Ghost variant
<Button variant="ghost" size="sm">
  Skip
</Button>

// As a link
<Button href="/services" variant="primary">
  Services
</Button>

// Disabled state
<Button disabled>
  Coming Soon
</Button>
```

## 2. Badge Component

```tsx
import { Badge } from '@/components/ui';

// Default (blue)
<Badge>Live System</Badge>

// Success (green)
<Badge variant="success">Featured</Badge>

// Outline
<Badge variant="outline">Available Soon</Badge>

// In a section
<div className="space-y-2">
  <Badge>WHO WE ARE</Badge>
  <h2 className="text-3xl font-bold">Professional Cleaning</h2>
</div>
```

## 3. Card Component

```tsx
import { Card } from '@/components/ui';

// Default card
<Card>
  <h3 className="text-xl font-bold">Service Title</h3>
  <p>Service description goes here</p>
</Card>

// Bordered card
<Card variant="bordered" padding="lg">
  <div className="flex items-center gap-4">
    <div className="w-16 h-16 bg-blue-100 rounded-lg" />
    <div>
      <h4 className="font-bold">Residential Cleaning</h4>
      <p className="text-slate-500">Premium home cleaning</p>
    </div>
  </div>
</Card>

// Elevated card with custom styling
<Card 
  variant="elevated" 
  padding="md"
  className="hover:shadow-2xl transition-shadow cursor-pointer"
>
  <div className="text-center">
    <div className="text-4xl font-bold text-blue-600">4.9</div>
    <p className="text-slate-600">Customer Rating</p>
  </div>
</Card>

// Grid of cards
<div className="grid grid-cols-3 gap-6">
  {services.map(service => (
    <Card key={service.id} variant="default">
      <h3>{service.name}</h3>
      <p>{service.description}</p>
    </Card>
  ))}
</div>
```

## 4. Input Component

```tsx
import { Input } from '@/components/ui';
import { useState } from 'react';

function ContactForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (\!email.includes('@')) {
      setError('Please enter a valid email');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Basic input */}
      <Input
        type="text"
        label="Full Name"
        placeholder="John Doe"
        required
      />

      {/* Email input with error */}
      <Input
        type="email"
        label="Email Address"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
        helperText="We'll never share your email"
      />

      {/* Password input */}
      <Input
        type="password"
        label="Password"
        placeholder="Enter password"
      />

      {/* Phone input */}
      <Input
        type="tel"
        label="Phone Number"
        placeholder="(555) 123-4567"
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

## 5. Select Component

```tsx
import { Select } from '@/components/ui';
import { useState } from 'react';

function ServiceSelector() {
  const [selectedService, setSelectedService] = useState('');

  const serviceOptions = [
    { value: 'residential', label: 'Residential Cleaning' },
    { value: 'commercial', label: 'Commercial Cleaning' },
    { value: 'deep', label: 'Deep Cleaning' },
    { value: 'window', label: 'Window Washing' },
    { value: 'carpet', label: 'Carpet Cleaning' },
  ];

  return (
    <Select
      label="Select Service"
      options={serviceOptions}
      placeholder="Choose a cleaning service"
      value={selectedService}
      onChange={(e) => setSelectedService(e.target.value)}
    />
  );
}

// Multiple selects in a form
<form className="space-y-4">
  <Select
    label="Service Type"
    options={serviceOptions}
    placeholder="Select service"
  />
  
  <Select
    label="Frequency"
    options={[
      { value: 'weekly', label: 'Weekly' },
      { value: 'biweekly', label: 'Bi-weekly' },
      { value: 'monthly', label: 'Monthly' },
    ]}
  />

  <Select
    label="Time Slot"
    options={[
      { value: 'morning', label: 'Morning (8am - 12pm)' },
      { value: 'afternoon', label: 'Afternoon (12pm - 4pm)' },
      { value: 'evening', label: 'Evening (4pm - 8pm)' },
    ]}
  />
</form>
```

## 6. SectionHeading Component

```tsx
import { SectionHeading } from '@/components/ui';

// Left-aligned (default)
<SectionHeading
  subtitle="OUR SERVICES"
  title="Professional Cleaning Solutions"
  description="We offer comprehensive cleaning services for homes and businesses"
/>

// Center-aligned
<SectionHeading
  subtitle="WHY CHOOSE US"
  title="The #1 Cleaning Platform"
  description="Trusted by thousands of satisfied customers"
  align="center"
/>

// With styled title
<SectionHeading
  title={
    <>
      Premium Cleaning for Your
      <span className="text-blue-600"> Home & Business</span>
    </>
  }
  description="Experience excellence in every clean"
/>

// Hero section
<div className="py-20 bg-gradient-to-b from-slate-50 to-white">
  <SectionHeading
    subtitle="WELCOME"
    title={
      <>
        Your Trusted <span className="text-blue-600">Cleaning</span> Partner
      </>
    }
    description="Delivering exceptional cleaning services with professionalism and care"
    align="center"
    className="mx-auto max-w-2xl"
  />
</div>
```

## 7. Modal Component

```tsx
import { Modal } from '@/components/ui';
import { useState } from 'react';
import { Play } from 'lucide-react';

function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        <Play size={20} />
        Watch Our Process
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="How We Clean"
      >
        <video 
          width="100%" 
          height="400" 
          controls
          className="rounded-lg"
        >
          <source src="/demo-video.mp4" type="video/mp4" />
        </video>
        <p className="mt-4 text-slate-600">
          Watch our professional cleaning process in action
        </p>
      </Modal>
    </>
  );
}

// Image modal gallery
function ImageModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {images.map(img => (
          <img
            key={img.id}
            src={img.src}
            alt={img.alt}
            onClick={() => {
              setSelectedImage(img.src);
              setIsOpen(true);
            }}
            className="cursor-pointer hover:opacity-80"
          />
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <img src={selectedImage} alt="Full view" className="w-full rounded-lg" />
      </Modal>
    </>
  );
}
```

## 8. Tabs Component

```tsx
import { Tabs } from '@/components/ui';

function ServiceTabs() {
  const serviceTabs = [
    {
      id: 'residential',
      label: 'Residential',
      content: (
        <div>
          <h3 className="text-xl font-bold">Residential Cleaning</h3>
          <p className="mt-2 text-slate-600">
            Professional cleaning services for your home including:
          </p>
          <ul className="mt-4 space-y-2">
            <li>Dusting and vacuuming</li>
            <li>Kitchen and bathroom cleaning</li>
            <li>Floor polishing</li>
            <li>Window cleaning</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'commercial',
      label: 'Commercial',
      content: (
        <div>
          <h3 className="text-xl font-bold">Commercial Cleaning</h3>
          <p className="mt-2 text-slate-600">
            Keep your business spotless with our commercial solutions.
          </p>
        </div>
      ),
    },
    {
      id: 'deep',
      label: 'Deep Cleaning',
      content: (
        <div>
          <h3 className="text-xl font-bold">Deep Cleaning Services</h3>
          <p className="mt-2 text-slate-600">
            Thorough cleaning for every corner of your space.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <Tabs
        tabs={serviceTabs}
        defaultTab="residential"
        onChange={(tabId) => console.log('Selected:', tabId)}
      />
    </div>
  );
}
```

## 9. PricingToggle Component

```tsx
import { PricingToggle } from '@/components/ui';
import { useState } from 'react';

function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: ['Basic cleaning', '4x per month', 'Email support'],
    },
    {
      id: 'professional',
      name: 'Professional',
      monthlyPrice: 59,
      yearlyPrice: 590,
      features: ['Deep cleaning', '8x per month', '24/7 support'],
    },
    {
      id: 'premium',
      name: 'Premium',
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: ['Full service', 'Unlimited', 'Dedicated team'],
    },
  ];

  return (
    <div className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
        <PricingToggle
          defaultYearly={false}
          onChange={setIsYearly}
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {plans.map(plan => (
          <div
            key={plan.id}
            className="border border-slate-200 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <div className="mt-4">
              <span className="text-4xl font-bold">
                ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
              </span>
              <span className="text-slate-500">
                /{isYearly ? 'year' : 'month'}
              </span>
            </div>
            <ul className="mt-6 space-y-3">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-center gap-2">
                  <Check size={20} className="text-blue-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 10. StarRating Component

```tsx
import { StarRating } from '@/components/ui';

// Display rating
<StarRating rating={4.9} />

// Large size without label
<StarRating rating={5} size="lg" showLabel={false} />

// Custom color
<StarRating 
  rating={3.5} 
  size="md" 
  color="text-blue-600"
/>

// In a review card
<div className="border border-slate-200 rounded-lg p-6">
  <StarRating rating={4.8} showLabel={true} />
  <p className="mt-3 text-slate-700">
    "Excellent service\! The team was professional and thorough."
  </p>
  <p className="mt-2 font-semibold text-slate-900">
    Sarah Johnson
  </p>
</div>

// Customer testimonials
<div className="grid grid-cols-3 gap-6">
  {testimonials.map(review => (
    <Card key={review.id}>
      <StarRating rating={review.rating} />
      <p className="mt-4 text-slate-700">{review.text}</p>
      <p className="mt-4 font-semibold">{review.author}</p>
    </Card>
  ))}
</div>
```

## Complete Page Example

```tsx
'use client';

import { useState } from 'react';
import {
  Button,
  Badge,
  Card,
  Input,
  Select,
  SectionHeading,
  Modal,
  Tabs,
  PricingToggle,
  StarRating,
} from '@/components/ui';

export default function ServicesPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-slate-50">
        <SectionHeading
          subtitle="OUR SERVICES"
          title="Professional Cleaning for Every Need"
          description="Discover our comprehensive cleaning solutions"
          align="center"
          className="max-w-2xl mx-auto"
        />
        <div className="flex gap-4 justify-center mt-8">
          <Button variant="primary">Get Started</Button>
          <Button
            variant="outline"
            onClick={() => setIsVideoOpen(true)}
          >
            Watch Demo
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Our Cleaning Services"
            align="center"
            className="mb-12"
          />

          <div className="grid grid-cols-3 gap-6">
            <Card variant="elevated">
              <Badge>Popular</Badge>
              <h3 className="mt-4 text-xl font-bold">Residential</h3>
              <p className="mt-2 text-slate-600">
                Professional home cleaning
              </p>
              <Button className="mt-6 w-full" size="sm">
                Learn More
              </Button>
            </Card>

            <Card>
              <h3 className="text-xl font-bold">Commercial</h3>
              <p className="mt-2 text-slate-600">
                Business cleaning solutions
              </p>
              <Button className="mt-6 w-full" size="sm">
                Learn More
              </Button>
            </Card>

            <Card>
              <h3 className="text-xl font-bold">Deep Clean</h3>
              <p className="mt-2 text-slate-600">
                Comprehensive deep cleaning
              </p>
              <Button className="mt-6 w-full" size="sm">
                Learn More
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Simple, Transparent Pricing"
            align="center"
            className="mb-8"
          />

          <div className="flex justify-center mb-12">
            <PricingToggle onChange={setIsYearly} />
          </div>

          <div className="grid grid-cols-3 gap-6">
            {[29, 59, 99].map(price => (
              <Card key={price} variant="bordered">
                <h3 className="font-bold">Plan</h3>
                <div className="mt-4 text-3xl font-bold">
                  ${isYearly ? Math.round(price * 10) : price}
                </div>
                <Button className="mt-6 w-full">Select Plan</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            subtitle="TESTIMONIALS"
            title="What Our Customers Say"
            align="center"
            className="mb-12"
          />

          <div className="grid grid-cols-3 gap-6">
            <Card>
              <StarRating rating={4.9} />
              <p className="mt-4">
                "Outstanding service\! Highly recommend."
              </p>
            </Card>
            <Card>
              <StarRating rating={5} />
              <p className="mt-4">
                "Professional and thorough. Worth every penny."
              </p>
            </Card>
            <Card>
              <StarRating rating={4.8} />
              <p className="mt-4">
                "Best cleaning service in town\!"
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <Modal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title="Our Process"
      >
        <video width="100%" controls className="rounded-lg">
          <source src="/demo.mp4" type="video/mp4" />
        </video>
      </Modal>
    </main>
  );
}
```

---

## Component Props Cheat Sheet

| Component | Key Props | Default |
|-----------|-----------|---------|
| Button | variant, size, href, onClick | primary, md |
| Badge | variant | default |
| Card | variant, padding | default, md |
| Input | label, error, helperText | - |
| Select | options, label, placeholder | - |
| SectionHeading | subtitle, title, align | -, - left |
| Modal | isOpen, onClose, title | - |
| Tabs | tabs, defaultTab, onChange | - |
| PricingToggle | onChange, defaultYearly | false |
| StarRating | rating, size, showLabel | md, true |

