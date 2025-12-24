# Accessibility Testing Checklist

## Quick Accessibility Test Guide

### Keyboard Navigation Test

1. **Tab Navigation**:
   - [ ] Open homepage
   - [ ] Press Tab repeatedly
   - [ ] Verify all interactive elements receive focus
   - [ ] Verify focus indicators are visible (outline/ring)

2. **Button Activation**:
   - [ ] Tab to theme toggle button
   - [ ] Press Enter/Space
   - [ ] Verify theme changes
   - [ ] Tab to menu button (mobile)
   - [ ] Press Enter
   - [ ] Verify menu opens

3. **Escape Key**:
   - [ ] Open mobile menu
   - [ ] Press Escape
   - [ ] Verify menu closes
   - [ ] Open cookie consent modal
   - [ ] Press Escape
   - [ ] Verify modal closes

4. **Arrow Keys** (if applicable):
   - [ ] Navigate dropdown menus with arrow keys
   - [ ] Verify selection works

### Screen Reader Test

**Using NVDA (Windows)** or **VoiceOver (Mac)**:

1. **Header Elements**:
   - [ ] Theme toggle announces: "Toggle theme" or "Switch to Light/Dark Mode"
   - [ ] Menu button announces: "Open menu" or "Close menu"
   - [ ] Menu state announces: "expanded" or "collapsed"

2. **FAQ Accordion**:
   - [ ] Question button announces question text
   - [ ] State announces: "expanded" or "collapsed"
   - [ ] Answer content is associated with question

3. **Cookie Consent**:
   - [ ] Banner title announces: "Cookie Preferences"
   - [ ] Buttons announce: "Accept All", "Reject All", "Customize"
   - [ ] Modal title announces: "Manage Cookie Preferences"
   - [ ] Toggle switches announce state: "checked" or "unchecked"

4. **Links**:
   - [ ] All links have descriptive text
   - [ ] Icon-only links have aria-label
   - [ ] Social media links announce platform name

### Visual Focus Indicators

1. **Check All Interactive Elements**:
   - [ ] Buttons show focus ring/outline
   - [ ] Links show focus indicator
   - [ ] Form inputs show focus indicator
   - [ ] Focus is visible in both light and dark themes

### Color Contrast

1. **Text Readability**:
   - [ ] All text meets WCAG AA contrast (4.5:1 for normal text)
   - [ ] Focus indicators are visible
   - [ ] Error states are distinguishable

### Semantic HTML

1. **Verify Structure**:
   - [ ] Buttons are `<button>` elements, not `<div>`
   - [ ] Links are `<a>` elements
   - [ ] Headings use proper hierarchy (h1, h2, h3)
   - [ ] Forms have associated labels
   - [ ] Lists use `<ul>` or `<ol>`

### ARIA Attributes

1. **Check Required ARIA**:
   - [ ] Icon-only buttons have `aria-label`
   - [ ] Menu toggles have `aria-expanded`
   - [ ] Modals have `aria-modal="true"`
   - [ ] Regions have `role` attributes where needed
   - [ ] No redundant ARIA (e.g., `aria-label` on element with visible text)

### Mobile Accessibility

1. **Touch Targets**:
   - [ ] All buttons are at least 44x44px
   - [ ] Links have adequate spacing
   - [ ] No overlapping interactive elements

2. **Mobile Menu**:
   - [ ] Menu opens/closes correctly
   - [ ] Focus trap works in menu
   - [ ] Escape closes menu
   - [ ] Backdrop click closes menu

### Automated Testing Tools

1. **Lighthouse**:
   - [ ] Run Lighthouse accessibility audit
   - [ ] Score should be 90+ (aim for 100)
   - [ ] Fix any reported issues

2. **axe DevTools**:
   - [ ] Install axe DevTools browser extension
   - [ ] Run scan on homepage
   - [ ] Fix any violations

3. **WAVE**:
   - [ ] Use WAVE browser extension
   - [ ] Check for errors and warnings
   - [ ] Review contrast issues

### Common Issues to Check

- [ ] No "click here" or "read more" links (use descriptive text)
- [ ] No empty buttons or links
- [ ] No missing alt text on images (decorative images have empty alt)
- [ ] No duplicate IDs
- [ ] No missing form labels
- [ ] No keyboard traps

### Browser Testing

Test in:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

With screen readers:
- [ ] NVDA (Windows)
- [ ] JAWS (Windows)
- [ ] VoiceOver (Mac/iOS)
- [ ] TalkBack (Android)

---

## Quick Fixes Reference

### Missing aria-label
```tsx
// Bad
<button><Icon /></button>

// Good
<button aria-label="Close menu"><Icon /></button>
```

### Missing aria-expanded
```tsx
// Bad
<button onClick={toggleMenu}>Menu</button>

// Good
<button 
  onClick={toggleMenu}
  aria-expanded={isOpen}
  aria-controls="menu-id"
>
  Menu
</button>
```

### Missing semantic HTML
```tsx
// Bad
<div onClick={handleClick}>Click me</div>

// Good
<button onClick={handleClick}>Click me</button>
```

---

**Last Updated**: 2024

