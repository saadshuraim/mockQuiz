# MockQuiz Design Guidelines

## Design Approach
**Utility-Focused Application** - This is a productivity/study tool where clarity, efficiency, and ease of use are paramount. The design should feel warm and approachable while maintaining functional simplicity.

---

## Color System

### Primary Palette
- **Teal** `#14B8A6` - Primary action buttons, active states, progress indicators
- **Deep Indigo** `#312E81` - Headlines, primary text, navigation headers
- **Soft Coral** `#FF7A7A` - Error states, incorrect answer indicators, warning messages
- **Warm Yellow** `#FBBF24` - Success states, correct answer indicators, accents
- **Off-white** `#FBFAFF` - Main background color

### Implementation
- Use Teal for all primary CTAs ("Create New Quiz", "Save Quiz", "Start Quiz")
- Deep Indigo for all H1-H3 headings and section titles
- Coral for validation errors and incorrect quiz answers
- Yellow for success confirmations and correct quiz answers
- Off-white as the base background across all pages

---

## Typography

### Font Families
- **Poppins** (Bold 600-700) - Use for all headlines (H1, H2, H3) and primary buttons
- **Inter** (Regular 400, Medium 500) - Use for body text, labels, and secondary elements

### Type Scale
- **H1**: 2.5rem (40px) Poppins Bold - Page titles
- **H2**: 2rem (32px) Poppins Bold - Section headers
- **H3**: 1.5rem (24px) Poppins SemiBold - Card titles, subsection headers
- **Body**: 1rem (16px) Inter Regular - All body text, descriptions
- **Small**: 0.875rem (14px) Inter Regular - Helper text, metadata, timestamps

---

## Layout System

### Spacing Units
Use Tailwind spacing primitives: **2, 4, 6, 8, 12, 16, 20** (e.g., `p-4`, `mt-8`, `gap-6`)
- Compact spacing: `gap-2`, `p-4` for dense UI elements
- Standard spacing: `gap-6`, `p-8` for cards and sections
- Generous spacing: `gap-12`, `py-20` for page-level separation

### Container Structure
- Max width: `max-w-7xl` for main content areas
- Dashboard/listings: `max-w-6xl` centered
- Quiz-taking interface: `max-w-4xl` for optimal reading
- Settings page: `max-w-3xl` for focused forms

---

## Component Library

### Cards
- **Border Radius**: 10-12px (rounded-xl)
- **Shadow**: Soft shadow `shadow-md` on default, `shadow-lg` on hover
- **Padding**: `p-6` to `p-8` depending on content density
- **Background**: White with subtle border or light off-white fill

### Buttons
- **Primary**: Teal background, white text, Poppins Medium
- **Border Radius**: 8-10px (rounded-lg)
- **Padding**: `px-6 py-3` for standard, `px-8 py-4` for hero CTAs
- **Hover**: Slightly darker teal with subtle lift (shadow increase)
- **Blurred Background**: When placed over images, use `backdrop-blur-md` with semi-transparent teal background

### Forms & Inputs
- **Text Input**: White background, light gray border, `rounded-lg`, `p-3`
- **Textarea** (for paste box): Large prominent area, `min-h-64`, clear placeholder text
- **Focus State**: Teal border (`ring-2 ring-teal-500`)
- **Labels**: Inter Medium, Deep Indigo color

### Tabs (Upload Page)
- **Active Tab**: Teal underline or background highlight, Deep Indigo text
- **Inactive Tab**: Gray text, no background
- **Spacing**: `gap-8` between tabs

### Progress Indicators
- **Quiz Progress Bar**: Teal fill, light gray background, `h-2` height, rounded ends
- **Display**: Show "Question X of Y" alongside visual bar

### Quiz Question Cards
- **Layout**: Single question per card, generous whitespace
- **Options**: Radio buttons or clickable cards with hover states
- **Selected State**: Teal border or light teal background
- **Correct/Incorrect Indicators**: Yellow checkmark or Coral X icon with color-coded backgrounds

### Lists (Dashboard)
- **Quiz Cards**: Grid layout `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` with `gap-6`
- **Result Items**: Single column list with clear visual separation between attempts
- **Metadata**: Small gray text showing date/score

### Modals
- **Background Overlay**: `backdrop-blur-sm` with semi-transparent dark overlay
- **Modal Card**: White, `rounded-xl`, `shadow-2xl`, centered
- **Confirmation Dialogs**: Clear warning text with Coral accent for destructive actions

---

## Page-Specific Layouts

### Dashboard (`/`)
- Two-section layout: "My Quizzes" and "My Results"
- Empty states with friendly illustrations and "Create New Quiz" CTA
- Quiz cards in grid format showing title, question count, last taken date

### Upload Page (`/upload`)
- **Tabbed Interface**: "Create & Paste" (default) and "Upload a File"
- **Tab 1 - Paste**:
  - AI Helper section at top with copyable prompt template in code-style box
  - Large textarea (min-h-64) with clear label and format examples
  - Prominent "Preview Quiz" button below
- **Tab 2 - Upload**:
  - Drag-and-drop zone with dashed border and upload icon
  - Format guidance cards showing JSON/CSV/TXT examples

### Preview Page (`/preview`)
- List of parsed questions in collapsed/expandable cards
- Error messages in Coral boxes if parsing issues found
- Title/Description input fields at top
- "Save Quiz" CTA button (Teal, prominent)

### Quiz Taking (`/quiz/:quizId`)
- Progress bar fixed at top
- Single question card centered (`max-w-4xl`)
- Large, tappable option buttons
- "Next" and "Finish" navigation buttons

### Results Page (`/results/:attemptId`)
- Score summary card at top (large, celebratory if high score)
- Per-question review list below with expand/collapse
- Color-coded correct (Yellow) vs incorrect (Coral) answers
- Explanations shown in subtle gray boxes

### Settings (`/settings`)
- Simple vertical list of actions
- "Export Data" button with download icon
- "Clear All Data" with warning text and confirmation requirement

---

## Animations

**Use Sparingly** - Only for meaningful feedback:
- Smooth transitions on tab switches (`transition-all duration-200`)
- Subtle scale on button hover (`hover:scale-105`)
- Fade-in for quiz questions (`fade-in 300ms`)
- Progress bar fill animation (smooth width transition)
- Success/error toast notifications (slide-in from top)

---

## Images

**No Hero Image** - This is a utility app focused on functionality over marketing aesthetics. 

**Icons Only**:
- Use **Heroicons** (outline style) for:
  - Upload cloud icon
  - Quiz/document icons
  - Check/X marks for answers
  - Settings gear
  - Download icon for export
- Keep icons consistent in stroke width and size

---

## Accessibility

- Maintain WCAG AA color contrast ratios
- Focus indicators on all interactive elements (teal ring)
- Clear label-input associations
- Keyboard navigation support for quiz-taking flow
- Screen reader friendly result announcements