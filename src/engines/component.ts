export interface Metadata {
  elementName: string;
  template: string;
  style?: string;
  extends?: new (...args: any[]) => HTMLElement;
}

export interface Lifecycle {
  onMount: () => void;
}

export function Component(metadata: Metadata): void {
  const E = metadata.extends || HTMLElement;
  console.log(E);
  const Class = class extends HTMLElement {
    public shadow: ShadowRoot;
    public metadata: Metadata = metadata;

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      this.shadow.innerHTML += metadata.template;
      if (metadata.style) {
        this.shadow.innerHTML += `<style>${metadata.style.toString()}</style>`;
      }
    }
  };

  customElements.define(metadata.elementName, Class);
}
