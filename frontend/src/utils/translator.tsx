export function CreateTranslator(translations: Record<string, unknown>) {
  return (key: string) => {
    const keys = key.split('.');
    let value: unknown = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Return the key if path doesn't exist
      }
    }
    
    return typeof value === 'string' ? value : key;
  };
}
