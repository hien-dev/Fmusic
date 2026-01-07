type Debounced<T extends (...args: any[]) => any> = ((...args: Parameters<T>) => void) & {
  cancel: () => void;
};

export function debounce<T extends (...args: any[]) => any>(fn: T, wait = 300): Debounced<T> {
  let t: ReturnType<typeof setTimeout> | null = null;

  const debounced = ((...args: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => {
      t = null;
      fn(...args);
    }, wait);
  }) as Debounced<T>;

  debounced.cancel = () => {
    if (t) clearTimeout(t);
    t = null;
  };

  return debounced;
}
