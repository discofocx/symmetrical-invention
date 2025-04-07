# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Code Style Guidelines
- **TypeScript**: Use strict typing with interfaces and type definitions
- **Imports**: Use `@/` alias for src directory imports (e.g., `@/components/ui/Button`)
- **Components**: Use functional components with explicit type definitions
- **Naming**:
  - Components: PascalCase (e.g., `Button.tsx`)
  - Utilities/hooks: camelCase
  - Types/interfaces: PascalCase
- **Error handling**: Use try/catch with logging for file operations
- **CSS**: Use Tailwind utility classes with custom colors (peach, forest, cream, teal)
- **File organization**:
  - UI components in `src/components/ui/`
  - Layout components in `src/components/layout/`
  - Content in `src/content/`
  - Type definitions in `src/types/`
  - Utility functions in `src/lib/`