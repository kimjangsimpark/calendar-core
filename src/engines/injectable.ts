export function Autowired<T, C>(constructor: C) {
  return (target: T, name: string): any => {
    Object.defineProperty(target, name, {
      enumerable: false,
      configurable: false,
      value: constructor,
    });
  };
}
