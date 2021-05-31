/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */

export type ClassConstructor = new (...args: any[]) => HTMLElement;

/**
 * lifecycle 데코레이터
 */
export function Component(
  selector: string
): (constructor: ClassConstructor) => void {
  return function (constructor: ClassConstructor) {
    customElements.define(selector, constructor);
  };
}
