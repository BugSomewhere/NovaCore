# DESIGN.md — NovaCore Platform

## Product Overview

**NovaCore** is an enterprise full-stack project management platform built for development teams. It helps engineers track projects, manage tasks in Kanban/Scrum workflows, and monitor team performance in real time. The target audience is software engineers, tech leads, and CTOs at mid-to-large engineering organizations.

---

## Brand Identity

**Voice:** Precise, confident, technical — never corporate-fluffy. NovaCore speaks like a senior engineer, not a startup marketing team.

**Feeling:** Fast, reliable, no-nonsense. The UI should feel like a tool that respects the user's time — zero clutter, immediate clarity.

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-bg-base` | `#0A0E1A` | Main page background |
| `--color-bg-surface` | `#111827` | Cards, panels, sidebar |
| `--color-bg-elevated` | `#1E2533` | Modals, dropdowns, hover states |
| `--color-border` | `#2A3347` | Borders, dividers |
| `--color-accent-primary` | `#6366F1` | Primary CTA, active nav, key highlights (Indigo-500) |
| `--color-accent-secondary` | `#818CF8` | Hover states, secondary links (Indigo-400) |
| `--color-accent-glow` | `rgba(99,102,241,0.15)` | Soft glow behind accent elements |
| `--color-success` | `#10B981` | Completed status, positive trends |
| `--color-warning` | `#F59E0B` | Pending status, warnings |
| `--color-error` | `#EF4444` | Failed status, errors |
| `--color-info` | `#3B82F6` | In-progress status, info |
| `--color-text-primary` | `#F1F5F9` | Main body text |
| `--color-text-secondary` | `#94A3B8` | Subtext, labels, captions |
| `--color-text-muted` | `#4B5563` | Placeholder text, disabled |

---

## Typography

| Role | Font | Weight | Size | Usage |
|---|---|---|---|---|
| Display | `Inter` | 800 (ExtraBold) | 48–64px | Hero headlines |
| Heading 1 | `Inter` | 700 (Bold) | 32–40px | Page titles |
| Heading 2 | `Inter` | 600 (SemiBold) | 20–24px | Section titles, card headers |
| Body | `Inter` | 400 (Regular) | 14–16px | General text, descriptions |
| Label | `Inter` | 500 (Medium) | 12–13px | Form labels, nav items, badges |
| Code/Mono | `JetBrains Mono` | 400 | 13px | Code snippets, technical values |

**Type rules:**
- All text in sentence case (not ALLCAPS except badge labels)
- Line height: 1.5 for body, 1.2 for headings
- Letter spacing: -0.02em for display headings, normal for body

---

## Spacing & Layout

- **Base unit:** 4px
- **Border radius:** `rounded-lg` (8px) for cards, `rounded-xl` (12px) for modals, `rounded-full` for pills/badges
- **Card padding:** 24px
- **Section gap:** 48px between major sections
- **Sidebar width:** 240px (fixed)
- **Max content width:** 1280px centered

---

## Component Specifications

### Buttons

**Primary Button**
- Background: `#6366F1` → hover `#4F46E5`
- Text: white, 14px medium
- Padding: 10px 20px
- Border radius: 8px
- Subtle box-shadow: `0 0 20px rgba(99,102,241,0.3)` on hover

**Ghost Button**
- Background: transparent
- Border: 1px solid `#2A3347`
- Text: `#94A3B8` → hover text white, hover border `#6366F1`

**Danger Button**
- Background: `#EF4444`
- Use only for destructive actions

### Input Fields

- Background: `#111827`
- Border: `1px solid #2A3347`
- Border on focus: `#6366F1` with glow `rgba(99,102,241,0.2)`
- Text: `#F1F5F9`, placeholder `#4B5563`
- Padding: 10px 14px
- Border radius: 8px
- Icon (left): `#6366F1` color

### Cards

- Background: `#111827`
- Border: `1px solid #2A3347`
- Border radius: 12px
- Padding: 24px
- Hover: border color shifts to `#6366F1`, subtle lift `translateY(-2px)`
- Transition: `all 0.2s ease`

### Status Badges

- `COMPLETED`: bg `rgba(16,185,129,0.1)`, text `#10B981`, border `rgba(16,185,129,0.2)`
- `IN PROGRESS`: bg `rgba(59,130,246,0.1)`, text `#3B82F6`, border `rgba(59,130,246,0.2)`
- `FAILED`: bg `rgba(239,68,68,0.1)`, text `#EF4444`, border `rgba(239,68,68,0.2)`
- `PENDING`: bg `rgba(245,158,11,0.1)`, text `#F59E0B`, border `rgba(245,158,11,0.2)`
- Font: 11px, 600 weight, letter-spacing 0.05em, uppercase

### Navigation (Sidebar)

- Background: `#111827`
- Active item: left border `3px solid #6366F1`, bg `rgba(99,102,241,0.1)`, text white
- Inactive: text `#94A3B8`, no border
- Icon + label horizontal layout, 14px medium
- Item height: 40px

---

## Page Specifications

### Page 1: Homepage / Landing Page

**Sections (top to bottom):**

1. **Navbar** — Fixed top, bg `#0A0E1A` with bottom border `#2A3347`
   - Left: NovaCore logo (indigo icon + white wordmark)
   - Center: nav links — Features, Pricing, Docs (text `#94A3B8`, hover white)
   - Right: "Sign In" ghost button + "Get Started" primary button

2. **Hero** — Centered, full-width, min-height 90vh
   - Small eyebrow label: `ENTERPRISE-GRADE PLATFORM` (indigo pill badge)
   - H1: "Accelerating Full-Stack Development" — 64px, bold, white
   - Gradient text on "Full-Stack": linear-gradient from `#6366F1` to `#818CF8`
   - Subtext: "Build enterprise-grade applications faster with our opinionated Next.js and NestJS starter. NovaCore provides the infrastructure, you provide the vision." — 18px, `#94A3B8`
   - Two buttons: "Get Started Free" (primary) + "View Live Demo →" (ghost)
   - Below buttons: social proof — "Trusted by 10,000+ developers" with 5 avatar circles
   - Hero visual: dark UI mockup of the dashboard, floating with a soft indigo glow underneath

3. **Features** — 3-column card grid
   - Title: "Everything you need to ship faster"
   - Cards: Secure Authentication, Seamless Database Integration, Real-time Analytics
   - Each card: indigo icon top-left, h3 title, 2-line description

4. **Tech Stack** — Horizontal logo strip
   - Label: "Built on the best tools in the ecosystem"
   - Logos: Next.js, NestJS, PostgreSQL, TypeScript, TailwindCSS, Docker

5. **Footer** — Simple, dark, 2-line
   - © 2025 NovaCore Infrastructure. All rights reserved.

---

### Page 2: Sign In Page

**Layout:** Centered split — Left decorative panel (40%) + Right form panel (60%)

**Left panel (decorative):**
- Gradient background: `#0A0E1A` → deep indigo
- NovaCore logo at top
- Large headline: "Welcome back to your command center"
- 3 feature highlight rows with checkmark icons:
  - ✓ Real-time project collaboration
  - ✓ Kanban & Scrum boards
  - ✓ Enterprise-grade security
- Abstract grid/mesh background decoration in indigo

**Right panel (form):**
- Background: `#111827`
- Heading: "Sign In" (28px bold, white)
- Subtext: "Welcome back to your command center." (`#94A3B8`)
- Fields:
  - Email address (mail icon, placeholder: `name@company.com`)
  - Password (lock icon, eye toggle)
- Row below fields: "Remember me for 30 days" checkbox (left) + "Forgot password?" link (right, indigo)
- Primary CTA: "Sign In" button (full width)
- Divider: `── Or continue with ──`
- OAuth row: Google button + GitHub button (equal width, side by side)
- Footer: "Don't have an account? **Request Access**" (indigo link)
- Bottom: "© 2025 NovaCore Infrastructure. All rights reserved."

---

### Page 3: Register / Request Access Page

**Layout:** Centered single-column card, max-width 480px, on dark background

**Top:** NovaCore logo centered

**Step indicator:** 3 steps horizontal
- Step 1: "Account Info" (active, indigo circle)
- Step 2: "Workspace Setup" (inactive)
- Step 3: "Invite Team" (inactive)
- Connected by a horizontal line

**Form (Step 1 — Account Info):**
- Heading: "Create your account" (24px bold)
- Subtext: "Start your 14-day free trial. No credit card required."
- Fields:
  - Full Name (user icon)
  - Work Email (mail icon)
  - Password (lock icon) + password strength bar below (Weak / Fair / Strong)
  - Confirm Password
- Checkbox: "I agree to the Terms of Service and Privacy Policy"
- CTA: "Continue →" (full width, primary)
- Footer: "Already have an account? Sign In" (indigo link)

---

### Page 4: Dashboard Overview

**Layout:** Fixed sidebar left (240px) + top navbar + scrollable main content

**Sidebar:**
- Logo top (NovaCore icon + wordmark)
- Nav items: Overview (active), Projects, Tasks, Team, Settings
- Divider line
- Bottom: Support, Sign Out
- Very bottom: User avatar + name + role

**Top Navbar (main area):**
- Page title: "Dashboard Overview" (20px semibold)
- Right side: search bar + notification bell (with red dot) + user avatar

**Stats Row (4 cards, equal width):**
- Total Projects: `124` — "+12% from last month" (green up arrow)
- Active Tasks: `842` — "+8% capacity"
- Users Online: `1,492` — "+2.5% load"
- Server Health: `99.9%` — "All systems operational"

**Middle Section (2 columns):**
- Left: "Project Activity" — area/line chart, last 7 days, indigo line
- Right: "Recent Tasks" list
  - Database Migration — `COMPLETED`
  - API Gateway Re... — `IN PROGRESS`
  - Cache Invalidation Issue — `FAILED`
  - Security Audit Q3 — `PENDING`

**Bottom CTA:**
- "+ New Project" button (indigo, prominent)

---

## Motion & Interaction

- Card hover: `translateY(-2px)` + border glow, `transition: all 0.2s ease`
- Button hover: slight brightness increase + shadow glow
- Input focus: border color shift to indigo + soft glow ring
- Page load: fade-in `opacity 0 → 1` over 300ms
- No heavy animations — keep it fast and professional

---

## Do's and Don'ts

**Do:**
- Use dark backgrounds consistently across all 4 pages
- Keep indigo (`#6366F1`) as the ONLY accent color
- Use consistent border radius and spacing tokens
- Keep sidebar always 240px wide on desktop

**Don't:**
- Mix light and dark themes between pages
- Use more than one accent color family
- Add decorative gradients that aren't indigo/slate
- Use font sizes smaller than 12px
- Add rounded corners larger than 12px on cards