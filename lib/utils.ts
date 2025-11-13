
type ClassValue = string | number | boolean | undefined | null;
type ClassProp = ClassValue | ClassValue[];

export function cn(...inputs: ClassProp[]): string {
  const classNames = new Set<string>();

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string') {
      classNames.add(input);
    } else if (Array.isArray(input)) {
      for (const value of input) {
        if (typeof value === 'string') {
          classNames.add(value);
        }
      }
    }
  }

  return Array.from(classNames).join(' ');
}
