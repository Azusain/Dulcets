export function CreateTranslator(translations: Record<string, string>) {
  return (key: string) => translations[key] || key;
}
