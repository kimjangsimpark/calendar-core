/* eslint-disable @typescript-eslint/no-explicit-any */

export type ClassConstructor = new (...args: any[]) => any;
export interface Component {
  selector: string;
  template: string;
  style?: string;
}

/**
 * lifecycle 데코레이터
 */
export function Component<T extends ClassConstructor>(
  params: Component
): (constructor: T) => void {
  return function (constructor: T) {
    customElements.define(
      params.selector,
      class extends HTMLElement {
        public constructor() {
          super();
          this.attachShadow({ mode: 'open' });
          if (this.shadowRoot) {
            this.shadowRoot.innerHTML += params.template;
            if (params.style) {
              this.shadowRoot.innerHTML += `<style>${params.style.toString()}</style>`;
            }
          }
          console.log('constructed');
        }
      }
    );
  };
}
