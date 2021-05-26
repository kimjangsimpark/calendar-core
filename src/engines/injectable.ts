export function Autowired() {
  return (target: any, name: string): any => {
    const descriptor = {
      get(this: any) {},
      set(value: any) {},
      enumerable: true,
      configurable: true,
    };
    Object.defineProperty(target, name, descriptor);
  };
}
