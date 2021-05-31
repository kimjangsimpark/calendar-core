/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */

export type ClassConstructor = new (...args: any[]) => Lifecycle;

export interface OnRender {
  onRender?(): void;
}

export interface Lifecycle extends OnRender, HTMLElement {}

export interface Component {
  selector: string;
  template: string;
  style?: string;
}

/**
 * lifecycle 데코레이터
 */
export function Component(
  params: Component
): (constructor: ClassConstructor) => void {
  return function (constructor: ClassConstructor) {
    customElements.define(
      params.selector,
      class extends constructor {
        constructor() {
          super();
          this.attachShadow({ mode: 'open' });
          if (this.shadowRoot) {
            this.shadowRoot.innerHTML += params.template;
            if (params.style) {
              this.shadowRoot.innerHTML += `<style>${params.style.toString()}</style>`;
            }
          }
        }
      }
    );
  };
}
