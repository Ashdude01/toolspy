# Tool Pages Accessibility Implementation Guide

## Overview

This guide provides patterns and examples for implementing accessibility (aria-labels and required attributes) across all tool pages in the application.

## ✅ Completed Examples

The following tool pages have been fully updated and can serve as reference:
- `app/(tools)/base64-encoder-decoder/page.tsx`
- `app/(tools)/age-calculator/page.tsx`
- `app/(tools)/pdf-converter/page.tsx`
- `components/tools/shared/universal-file-upload.tsx`

## Common Patterns

### 1. Icon-Only Buttons

**Problem**: Buttons with only icons are not accessible to screen readers.

**Solution**: Add `aria-label` and mark icons as `aria-hidden="true"`.

```tsx
// ❌ Bad
<Button onClick={handleAction}>
  <Icon className="h-4 w-4" />
</Button>

// ✅ Good
<Button 
  onClick={handleAction}
  aria-label="Descriptive action name"
>
  <Icon className="h-4 w-4" aria-hidden="true" />
  <span className="sr-only">Descriptive action name</span>
</Button>
```

**Examples**:
- Swap mode button: `aria-label="Swap between encode and decode mode"`
- Remove file button: `aria-label="Remove {filename}"`
- Copy button: `aria-label="Copy to clipboard"`
- Download button: `aria-label="Download file"`

### 2. Form Inputs with Labels

**Problem**: Inputs without proper labels are not accessible.

**Solution**: Use `Label` component with `htmlFor` and `id` on input.

```tsx
// ❌ Bad
<Label>Birth Date</Label>
<Input type="date" value={date} onChange={...} />

// ✅ Good
<Label htmlFor="birth-date">Birth Date <span className="text-red-500" aria-label="required">*</span></Label>
<Input
  id="birth-date"
  type="date"
  value={date}
  onChange={...}
  required
  aria-required="true"
  aria-describedby="birth-date-description"
/>
<p id="birth-date-description" className="sr-only">Enter your birth date. This field is required.</p>
```

### 3. Textarea with Labels

**Problem**: Textareas often lack proper labels.

**Solution**: Add hidden label and `aria-describedby`.

```tsx
// ❌ Bad
<Textarea
  placeholder="Enter text..."
  value={text}
  onChange={...}
/>

// ✅ Good
<Label htmlFor="input-textarea" className="sr-only">
  Text to encode
</Label>
<Textarea
  id="input-textarea"
  placeholder="Enter text..."
  value={text}
  onChange={...}
  aria-describedby="input-description"
/>
<div id="input-description" className="sr-only">
  Enter the text you want to encode
</div>
```

### 4. Select/Dropdown Components

**Problem**: Select components need proper labels and aria attributes.

**Solution**: Add `htmlFor` on Label, `id` and `aria-label` on SelectTrigger.

```tsx
// ❌ Bad
<Label>Format</Label>
<Select value={format} onValueChange={setFormat}>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  ...
</Select>

// ✅ Good
<Label htmlFor="format-select">Format</Label>
<Select value={format} onValueChange={setFormat}>
  <SelectTrigger id="format-select" aria-label="Select output format">
    <SelectValue />
  </SelectTrigger>
  ...
</Select>
```

### 5. Slider Components

**Problem**: Sliders need proper labels and ARIA value attributes.

**Solution**: Add `id`, `htmlFor`, and ARIA value attributes.

```tsx
// ❌ Bad
<Label>Quality: {quality}%</Label>
<Slider
  value={quality}
  onValueChange={setQuality}
  max={100}
  min={10}
/>

// ✅ Good
<Label htmlFor="quality-slider">Quality: {quality}%</Label>
<Slider
  id="quality-slider"
  value={quality}
  onValueChange={setQuality}
  max={100}
  min={10}
  aria-label="Image quality slider"
  aria-valuemin={10}
  aria-valuemax={100}
  aria-valuenow={quality}
/>
```

### 6. File Inputs

**Problem**: Hidden file inputs need proper labels.

**Solution**: Add `aria-label` to the input and button.

```tsx
// ❌ Bad
<input
  type="file"
  id="file-input"
  className="hidden"
  onChange={handleFile}
/>
<Button onClick={() => document.getElementById('file-input')?.click()}>
  Upload File
</Button>

// ✅ Good
<input
  type="file"
  id="file-input"
  className="hidden"
  onChange={handleFile}
  aria-label="Select file to upload"
/>
<Button 
  onClick={() => document.getElementById('file-input')?.click()}
  aria-label="Select file to upload"
>
  Upload File
</Button>
```

### 7. Action Buttons

**Problem**: Action buttons need descriptive labels.

**Solution**: Add `aria-label` with context.

```tsx
// ❌ Bad
<Button onClick={handleConvert} disabled={!files.length}>
  Convert
</Button>

// ✅ Good
<Button 
  onClick={handleConvert} 
  disabled={!files.length}
  aria-label={`Convert ${files.length} file(s) to ${format} format`}
>
  Convert
</Button>
```

### 8. Required Fields

**Problem**: Required fields need clear indication.

**Solution**: Add `required`, `aria-required="true"`, and visual indicator.

```tsx
// ❌ Bad
<Label>Email</Label>
<Input type="email" value={email} required />

// ✅ Good
<Label htmlFor="email">
  Email <span className="text-red-500" aria-label="required">*</span>
</Label>
<Input
  id="email"
  type="email"
  value={email}
  required
  aria-required="true"
/>
```

### 9. Checkboxes and Radio Buttons

**Problem**: Checkboxes need proper labels.

**Solution**: Use `htmlFor` and `id` association.

```tsx
// ❌ Bad
<input type="checkbox" checked={checked} onChange={...} />
<Label>Enable feature</Label>

// ✅ Good
<input
  type="checkbox"
  id="enable-feature"
  checked={checked}
  onChange={...}
/>
<Label htmlFor="enable-feature">Enable feature</Label>
```

### 10. Cards with Interactive Elements

**Problem**: Cards used as buttons need proper ARIA.

**Solution**: Add `role="button"`, `tabIndex`, `aria-label`, and keyboard handlers.

```tsx
// ❌ Bad
<Card onClick={handleClick} className="cursor-pointer">
  Click me
</Card>

// ✅ Good
<Card
  onClick={handleClick}
  className="cursor-pointer"
  role="button"
  tabIndex={0}
  aria-label="Upload files. Drag and drop or click to select"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Click me
</Card>
```

## Checklist for Each Tool Page

When updating a tool page, ensure:

- [ ] All icon-only buttons have `aria-label`
- [ ] All icons in buttons have `aria-hidden="true"`
- [ ] All form inputs have associated `Label` with `htmlFor` and `id`
- [ ] Required fields have `required`, `aria-required="true"`, and visual indicator
- [ ] Textareas have labels (visible or `sr-only`)
- [ ] Select components have `id` and `aria-label` on trigger
- [ ] Sliders have `id`, `htmlFor`, and ARIA value attributes
- [ ] File inputs have `aria-label`
- [ ] Action buttons have descriptive `aria-label`
- [ ] Cards used as buttons have proper ARIA attributes
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible

## Quick Reference: Common aria-labels

```tsx
// Buttons
aria-label="Copy to clipboard"
aria-label="Download file"
aria-label="Remove {item name}"
aria-label="Clear all"
aria-label="Reset calculator"
aria-label="Convert {count} file(s) to {format}"
aria-label="Upload files"
aria-label="Save preferences"

// Inputs
aria-label="Enter {description}"
aria-describedby="input-description"

// Selects
aria-label="Select {option type}"

// Sliders
aria-label="{Description} slider"
aria-valuemin={min}
aria-valuemax={max}
aria-valuenow={current}
```

## Testing

After implementing accessibility:

1. **Keyboard Navigation**:
   - Tab through all interactive elements
   - Verify focus indicators are visible
   - Press Enter/Space to activate buttons

2. **Screen Reader**:
   - Test with NVDA (Windows) or VoiceOver (Mac)
   - Verify all buttons announce their purpose
   - Verify form inputs have labels
   - Verify required fields are indicated

3. **Automated Tools**:
   - Run Lighthouse accessibility audit
   - Use axe DevTools extension
   - Check for any violations

## Files to Update

Apply these patterns to all tool pages in `app/(tools)/`:

### High Priority (Most Used):
- [x] base64-encoder-decoder
- [x] age-calculator
- [x] pdf-converter
- [ ] image-compressor
- [ ] image-converter
- [ ] percentage-calculator

### Medium Priority:
- [ ] bmi-calculator
- [ ] investment-calculator
- [ ] loan-calculator
- [ ] merge-pdf
- [ ] split-pdf
- [ ] json-formatter

### All Other Tools:
- Apply the same patterns to remaining tool pages

## Notes

- Use `sr-only` class for screen-reader-only text
- Always mark decorative icons as `aria-hidden="true"`
- Provide context in `aria-label` (e.g., "Remove file.pdf" not just "Remove")
- Test with actual screen readers, not just automated tools
- Keep labels concise but descriptive

---

**Last Updated**: 2024
**Version**: 1.0

