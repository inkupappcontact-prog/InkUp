# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup with Next.js, Tailwind CSS, and TypeScript
- Authentication system with Supabase (email/password + Google OAuth)
- User roles: Reader and Author
- Comic upload and management dashboard for authors
- Comic reader with responsive design
- Payment integration with Stripe for InkPoints system
- Landing page with RGPD-compliant cookie consent
- Settings panel with multiple sections (General, Notifications, Privacy, Appearance, Billing, Help)
- Test suite with Vitest (unit tests + integration tests)
- Code quality improvements following Herald Async rules

### Security
- Secured Supabase API keys using environment variables
- Added Row Level Security (RLS) policies for database access
- Protected routes with role-based access control

### Fixed
- Removed console.log statements from production code
- Fixed TypeScript 'any' types in authentication pages
- Standardized naming conventions (camelCase, PascalCase, SCREAMING_SNAKE_CASE)
- Eliminated nested ternaries in components
- Added proper error handling for async operations

## [0.1.0] - 2026-03-09

### Added
- Initial release of InkUp platform
- Basic authentication flow
- Dashboard for authors
- Comic discovery page
- User profile management
