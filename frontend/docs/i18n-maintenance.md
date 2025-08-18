# i18n Maintenance Guide

This guide explains how to maintain and manage internationalization (i18n) keys in this React/Next.js project, inspired by best practices from companies like Bytebase.

## Overview

Our i18n maintenance approach combines:
- **Static analysis** of source code to find used translation keys
- **Dynamic pattern detection** for complex key construction
- **Manual review** before making any destructive changes
- **Cross-language consistency checking**

## Tools

### Professional i18n Checker (`npm run analyze:i18n`)

This is our primary tool for i18n analysis. It provides comprehensive reporting without making any destructive changes.

**Features:**
- ✅ Detects static keys like `t('header.title')`
- ✅ Handles dynamic keys like `t(\`about.genres.${genre}.content\`)`
- ✅ Finds missing translations across languages
- ✅ Identifies inconsistent keys between language files
- ✅ Reports potentially unused keys
- ✅ Safe: Read-only analysis, no file modifications

**Usage:**
```bash
npm run analyze:i18n
```

### Legacy Tools (Use with Caution)

- `npm run analyze:i18n:old` - Previous analyzer (less accurate)
- `npm run clean:i18n` - **DANGEROUS**: Automatically deletes keys
- `npm run check:i18n` - Basic key validation

⚠️ **Warning:** The `clean:i18n` script can be overly aggressive and delete important dynamic keys. Always use `analyze:i18n` first and manually review results.

## Common Patterns

### Static Keys
```typescript
// Simple static keys
t('header.title')
t('common.submit')
```

### Dynamic Keys
```typescript
// Template literal construction
t(`about.genres.${genre}.content`)

// Variable-based construction
const key = `services.${serviceType}.description`;
t(key)
```

### Feature-based Patterns
```typescript
// Features array
features.map(feature => ({
  title: t(`about.why_choose_us.features.${feature}.title`),
  description: t(`about.why_choose_us.features.${feature}.description`)
}))
```

## Workflow

### 1. Regular Analysis
Run the professional checker regularly:
```bash
npm run analyze:i18n
```

### 2. Review Results
The output includes several sections:

#### ✅ Used Keys
Keys that are actively used in the codebase. Keys marked with 🔄 were detected through dynamic patterns.

#### ❌ Missing in Translations
Keys used in code but missing from translation files. These need to be added.

#### ⚠️ Inconsistent Across Languages
Keys present in some language files but missing in others. These need to be synchronized.

#### 🤔 Potentially Unused
Keys in translation files that weren't detected in source code. These may be:
- Complex dynamic keys not covered by patterns
- Keys used by external libraries
- Server-side only keys
- Actually unused keys (candidates for removal)

### 3. Fix Issues

#### Missing Translations
Add missing keys to all language files:
```json
// public/locales/en.json
{
  "missing.key": "English translation"
}

// public/locales/jp.json  
{
  "missing.key": "Japanese translation"
}
```

#### Inconsistent Keys
Ensure all languages have the same keys, even if some translations are temporary placeholders.

#### Remove Unused Keys
Only after manual verification that a key is truly unused:
1. Remove from all language files
2. Run `npm run analyze:i18n` to verify
3. Test the application thoroughly

## Dynamic Key Configuration

The checker includes configuration for known dynamic patterns in your project:

```javascript
knownDynamicPatterns: [
  {
    // Matches: t(`about.genres.${genre}.content`)
    pattern: /t\(`about\.genres\.\$\{[^}]+\}\.content`\)/g,
    generateKeys: () => ['idol', 'jrock', 'jpop', 'orchestra', 'edm', 'bgm']
      .map(genre => `about.genres.${genre}.content`)
  },
  // ... more patterns
]
```

### Adding New Dynamic Patterns

If you introduce new dynamic key patterns, update the configuration in `scripts/professional-i18n-check.js`:

1. Add the regex pattern that matches your usage
2. Provide a function that generates all possible keys
3. Test with `npm run analyze:i18n`

## Best Practices

### ✅ Do
- Run `npm run analyze:i18n` before making i18n changes
- Add new keys to all language files simultaneously
- Use descriptive, hierarchical key names
- Document dynamic key patterns
- Test after removing any keys

### ❌ Don't
- Use `npm run clean:i18n` without careful analysis
- Remove keys without understanding their usage context
- Ignore inconsistencies between language files
- Add dynamic keys without updating the checker configuration

## Troubleshooting

### "Keys exist but show as unused"
This usually means:
1. Complex dynamic construction not covered by patterns
2. Usage in external libraries or server-side code
3. The key is referenced in a way not detected by patterns

**Solution:** Add appropriate patterns to the checker configuration.

### "False positive unused keys"
Some keys might be used in ways not easily detectable:
1. Computed property names
2. External library integration
3. Server-side rendering contexts

**Solution:** Manually verify before removal and consider adding ignore patterns.

### "Missing translations not detected"
The checker relies on static analysis. If keys are constructed in very complex ways:
1. Review the dynamic patterns configuration
2. Consider refactoring to use simpler key construction
3. Add manual checks for known edge cases

## Integration with CI/CD

Consider adding the checker to your CI/CD pipeline:

```yaml
# Example GitHub Actions step
- name: Check i18n consistency
  run: npm run analyze:i18n
```

The checker exits with status code 1 if there are missing translations or inconsistencies, making it suitable for CI/CD integration.

## Comparison with Other Tools

### Bytebase Approach
- ✅ Google Translate integration for auto-translation
- ✅ ESLint plugin for Vue.js projects (`@intlify/eslint-plugin-vue-i18n`)
- ❌ Vue-specific, doesn't work with React/Next.js

### Our Approach
- ✅ React/Next.js compatible
- ✅ Dynamic key pattern detection
- ✅ Multi-language consistency checking
- ✅ Safe, read-only analysis
- ❌ No auto-translation (manual process)

This approach provides the safety and accuracy needed for React projects while maintaining the thorough analysis capabilities demonstrated by successful i18n implementations.
