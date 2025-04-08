# Altivento Website Development Plan

## Site Architecture Overview

Based on the provided documentation, Altivento's site will be implemented as a multi-page application (MPA) with the following key sections:

- Home page
- About Us
- Wedding Packages (collaboration with Quinta El Refugio)
- Products and Services (with subcategories for different product types)
- Project Gallery
- FAQ
- Contact
- Blog (planned for Phase 3)

## Recommended Build Order

Here's a strategic approach to building the components in order of priority and dependency:

### 1. Core Framework Setup
- Project initialization with Next.js 14+ and TypeScript
- TailwindCSS v4 configuration with the custom color palette
- Base layout components (Header, Footer)
- Routing structure

### 2. Design System Components
- Typography system (Boska for headings, Switzer for body)
- Color system implementation
- Button styles
- Card components
- Form elements
- Navigation components

### 3. Home Page
- Hero section with slider
- Category navigation
- Featured testimonials
- Quick quote CTA

### 4. Products and Services - Main Catalog
- Overview page with category listings
- Individual product category pages, starting with the most important:
  - Carpas (Tents) - Their primary product
  - Pistas de Baile (Dance Floors)
  - Other product categories

### 5. About Us Page
- Company history and values
- Team and operational capacity
- Competitive advantages

### 6. Contact System
- Contact page with smart form
- WhatsApp integration
- Form submission handling with API routes

### 7. Wedding Packages
- Package comparison
- Interactive calculator based on guest numbers
- Integration with Quinta El Refugio offerings

### 8. Gallery System
- Filterable gallery infrastructure
- Image optimization and lazy loading
- Gallery organization by event type

### 9. FAQ Section
- Organized by topics
- Expandable/collapsible questions

### 10. Performance Optimization
- Image optimization
- Code splitting strategies
- Caching policy implementation
- Core Web Vitals optimization

### 11. SEO Implementation
- Metadata strategy
- Structured data (Schema.org)
- SEO-friendly URLs
- Image alt text system

### 12. Additional Features (for later phases)
- Blog system
- Multilingual support
- Advanced budget calculator
- Newsletter integration

## Development Strategy Considerations

### Component Hierarchy
Start with atomic components, then compose them into larger sections. This ensures consistency and reusability across the site.

### Content Management
Implement a consistent approach to content using Markdown/JSON files before building the components that will display it. This separation of concerns makes future content updates easier.

### Progressive Enhancement
Build the core static functionality first, then enhance with interactive elements. This ensures the site remains functional even if JavaScript fails to load.

### Responsive Design
Design mobile-first, then expand to larger screens. This approach typically results in cleaner CSS and better performance on mobile devices.

### Testing Milestones
Establish testing points after completing logical groups of components. This allows for early identification of issues and stakeholder feedback.

## Benefits of This Approach

- Early validation of core design systems
- Focus on high-priority pages first
- Building reusable components that can be leveraged across the site
- Implementation of the most business-critical features earlier in the development cycle
- Allowing for incremental testing and stakeholder feedback

## Alignment with Project Phases

This build order aligns with the three-phase approach outlined in the project documentation:

### Phase 1: Foundation (8 weeks)
Covers items 1-6 in our build order, establishing the core site functionality.

### Phase 2: Expansion (6 weeks)
Covers items 7-9, expanding the site with more specialized features.

### Phase 3: Refinement (6 weeks)
Covers items 10-12, optimizing performance and adding additional features.

## Technical Considerations

### Static Generation Strategy
- Use SSG (Static Site Generation) for primary content pages
- Implement ISR (Incremental Static Regeneration) for semi-dynamic content
- Use client-side hydration only for interactive components
- Implement API routes for form handling and dynamic data requests

### Performance Targets
- Lighthouse score 90+ across all categories
- First Contentful Paint < 1.2s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- Time to Interactive < 3.5s