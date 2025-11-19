# 9. Implementation Guidance

## 9.1 Handoff to Development

**Design System Setup:**

1. Install shadcn/ui with Tailwind CSS
2. Configure Tailwind theme with Nixtia color palette
3. Install TAN Headline font and configure in Tailwind
4. Set up base spacing, typography, breakpoint overrides

**Component Implementation Priority:**

**Phase 1 - MVP Core:**

1. ProductCard (customer store)
2. CartWidget + CartSheet (sidebar)
3. PhoneInput (checkout)
4. PaymentMethodSelector (checkout)
5. RevenueChart (admin dashboard)

**Phase 2 - Post-Demo:** 6. Product CRUD forms (admin) 7. Advanced filtering/sorting components 8. WhatsApp integration components

**Development Best Practices:**

- Use shadcn/ui as foundation, extend with custom variants
- All custom components should follow shadcn patterns (Radix primitives + Tailwind)
- Maintain design tokens in Tailwind config (colors, spacing, typography)
- Component props should be typed (TypeScript)
- Accessibility props (aria-\*) required for custom components
- Responsive behavior defined mobile-first
- Test with keyboard navigation and screen readers

**Design QA Checklist:**

- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Touch targets minimum 44x44px on mobile
- [ ] Focus indicators visible on all interactive elements
- [ ] Keyboard navigation works without mouse
- [ ] Screen reader announces all meaningful content
- [ ] Responsive behavior matches breakpoint specifications
- [ ] Loading states prevent layout shift
- [ ] Error states provide actionable feedback
- [ ] Success states confirm user actions
- [ ] Empty states guide users to next action

---
