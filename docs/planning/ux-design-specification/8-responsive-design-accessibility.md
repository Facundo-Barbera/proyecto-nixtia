# 8. Responsive Design & Accessibility

## 8.1 Responsive Strategy

**Target Devices:**

- Mobile (320-767px): 80% of traffic - PRIMARY focus
- Tablet (768-1023px): 15% of traffic
- Desktop (1024px+): 5% of traffic

**Breakpoint Strategy:**

| Breakpoint  | Width Range | Layout Adaptations                                                                                                                                                                         |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Mobile**  | 320-767px   | • Single column product grid<br>• Bottom sheet cart (full screen)<br>• Hamburger menu for admin nav<br>• Stacked payment method cards<br>• Simplified dashboard (widgets stack vertically) |
| **Tablet**  | 768-1023px  | • 2-column product grid<br>• Sidebar cart sheet (slides from right)<br>• Top navigation bar (no hamburger)<br>• 2-column payment method cards<br>• Dashboard 2-widget columns              |
| **Desktop** | 1024px+     | • 3-4 column product grid<br>• Sidebar cart sheet<br>• Full top navigation<br>• 3-column payment methods (inline)<br>• Dashboard full 3-widget layout                                      |

**Adaptation Patterns:**

- **Navigation:**
  - Mobile: Logo (left) + Cart icon (right), Admin link in cart sheet footer
  - Tablet/Desktop: Logo (left) + "Store" / "Admin" links (center/right) + Cart icon (right)

- **Product Cards:**
  - Mobile: Full width cards, large tap targets
  - Tablet: 2-column grid, medium cards
  - Desktop: 3-column grid, compact but clear

- **Cart Sheet:**
  - Mobile: Full screen overlay with slide-up animation
  - Tablet/Desktop: 400px sidebar slides from right, dims background

- **Checkout Form:**
  - Mobile: Full-screen, fields stack vertically
  - Tablet/Desktop: Constrained 600px centered, fields still stack

- **Tables (Admin):**
  - Mobile: Card view (each row becomes a card)
  - Tablet: Horizontal scroll for full table
  - Desktop: Full table visible

- **Modals:**
  - Mobile: Full screen on small screens (< 640px)
  - Tablet/Desktop: Centered modal with max-width

## 8.2 Accessibility Strategy

**Compliance Target:** **WCAG 2.1 Level AA**

**Rationale:**

- Elder-friendly users may include vision/motor/cognitive challenges
- Professional credibility demands accessibility
- Future-proofs for legal requirements in key markets

**Key Requirements:**

**Color Contrast:**

- Text contrast ratio: 4.5:1 minimum (normal text), 3:1 (large text 18px+)
- UI component contrast: 3:1 minimum (buttons, borders, icons)
- All purple-600/slate-600 on white backgrounds meet AA standards
- Error/success states use sufficient contrast (red/green + icons, not color alone)

**Keyboard Navigation:**

- All interactive elements are keyboard accessible (tab order logical)
- Skip to main content link (hidden, visible on focus)
- Focus indicators: 2px purple-600 outline, 2px offset
- No keyboard traps (modals, dropdowns properly managed)
- Escape key closes modals/sheets

**Screen Reader Support:**

- Semantic HTML (nav, main, aside, article tags)
- ARIA landmarks where semantic HTML insufficient
- ARIA labels for icon-only buttons ("Shopping cart", "Remove from cart")
- Live regions for cart updates (aria-live="polite")
- Form labels properly associated (for/id attributes)
- Error messages linked with aria-describedby

**Focus Management:**

- Modals trap focus within (can't tab to background)
- Focus returns to trigger element on modal close
- Skip links for repetitive navigation
- Focus visible on all interactive elements

**Alternative Text:**

- Product images: Descriptive alt text ("Artisan nixtamalized corn masa, 1kg package")
- Decorative images: Empty alt attribute (alt="")
- Icons: Hidden from screen readers if redundant (aria-hidden="true")

**Form Accessibility:**

- Labels for all inputs (no placeholder-only labels)
- Required fields clearly marked (visual + "required" in label)
- Error messages descriptive and actionable ("Phone number must include area code")
- Autocomplete attributes for common fields (autocomplete="tel")

**Touch Target Size:**

- Minimum 44x44px touch targets (WCAG AAA, critical for elder-friendly)
- Buttons have generous padding (px-6 py-3 minimum)
- Product cards have large tap areas
- Spacing between adjacent targets (8px minimum)

**Motion & Animation:**

- Respect prefers-reduced-motion media query
- No auto-playing animations
- Transitions enhance, not required for understanding
- Loading indicators visible but not distracting

**Testing Strategy:**

**Automated Testing:**

- Lighthouse accessibility audit (target: 95+ score)
- axe DevTools browser extension
- Pa11y CI in build pipeline

**Manual Testing:**

- Keyboard-only navigation testing
- Screen reader testing (NVDA on Windows, VoiceOver on iOS)
- Color contrast validation (Stark plugin)
- Touch target size verification on real devices

**User Testing:**

- Include elder users in testing sessions
- Test with users with disabilities if possible
- Gather feedback on clarity and ease of use

---
