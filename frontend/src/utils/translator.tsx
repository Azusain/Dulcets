export function CreateTranslator(translations: Record<string, unknown>) {
  return (key: string) => {
    const keys = key.split('.');
    let value: unknown = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return the key if path doesn't exist
      }
    }
    
    return typeof value === 'string' ? value : key;
  };
}
