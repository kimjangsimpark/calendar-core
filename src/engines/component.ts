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
    public metadata: Metadata = metadata;

    constructor() {
      super();
      this.innerHTML += metadata.template;
      if (metadata.style) {
        this.innerHTML += `<style>${metadata.style.toString()}</style>`;
      }
    }
  };

  customElements.define(metadata.elementName, Class);
}
