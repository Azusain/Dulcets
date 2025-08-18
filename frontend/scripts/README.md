# Project Health Check Scripts

Simple scripts to maintain code quality and prevent redundant code in the project.

## Available Scripts

### 1. Unused Component Checker

**Command:** `npm run check:components` or `node scripts/check-unused-components.js`

**Purpose:** Find TSX components that are not used anywhere in the project (excludes components in `unused/` directory).

**Output:** Lists unused components with their file paths.

### 2. i18n Translation Checker  

**Command:** `npm run check:i18n` or `node scripts/check-i18n.js`

**Purpose:** Check i18n translation files for:
- Unused translation keys (exist in translation files but not used in code)
- Missing translations across language files (inconsistent keys between languages)

**Output:** Lists unused translation keys and missing translations per language.

### 3. Delete Unused Components

**Command:** `npm run clean:components` or `node scripts/delete-unused-components.js`

**Purpose:** Automatically delete unused TSX components (excludes Next.js special files and unused/ directory).

**Output:** Lists components to be deleted and deletion results.

**⚠️ WARNING:** This permanently deletes files. Use with caution!

### 4. Delete Unused i18n Keys

**Command:** `npm run clean:i18n` or `node scripts/delete-unused-i18n.js`

**Purpose:** Automatically delete unused translation keys from ALL language files.

**Output:** Shows progress and deletion summary for each language file.

**⚠️ WARNING:** This permanently modifies translation files. Use with caution!

### 5. Complete Health Check

**Command:** `npm run check:health` or `node scripts/project-health-check.js`

**Purpose:** Run both component and i18n checks in sequence.

**Output:** Combined results from both checks with a final summary.

## How These Scripts Work

### Component Detection
- Scans all `.tsx` files in `src/` directory (excluding `unused/` folder)  
- Checks if each component is imported/referenced in any source file
- Uses regex patterns to detect imports and JSX usage

### i18n Key Detection
- Loads all language files from `public/locales/` directory
- Scans source code for translation key usage patterns:
  - Direct key usage: `'translation.key'`
  - t() function calls: `t('translation.key')`
- Compares keys across all language files to find inconsistencies

## Integration with Development Workflow

Add to your CI/CD pipeline to automatically detect:
- Unused components that should be moved to `unused/` or deleted  
- Unused translation keys that can be removed
- Missing translations that need to be added

## Exit Codes

- **0**: All checks passed
- **1**: Issues found (unused components, unused keys, or missing translations)

Use these exit codes in CI/CD to fail builds when issues are detected.
