/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

export type ClassConstructor = new (...args: any[]) => HTMLElement;

export interface ComponentParams {
  selector: string;
  template: string;
  style?: string;
  root?: boolean;
}

export interface Metadata {
  $template: HTMLTemplateElement;
  template?: string;
  style?: string;
  root?: boolean;
}

export interface Metadatas {
  [key: string]: Metadata;
}

export interface Root {
  [key: string]: {
    [key: string]: any;
  };
}

const Root: Root = {};
const Metadatas: Metadatas = {};

export class CustomElement extends HTMLElement {
  private readonly metadata: Metadata;

  public constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(
      this.metadata.$template.content.cloneNode(true) as HTMLElement
    );
  }
}

/**
 * lifecycle 데코레이터
 */
export function Component(
  params: ComponentParams
): (constructor: ClassConstructor) => void {
  return function (constructor: ClassConstructor) {
    const $template = document.createElement('template');

    if (params.template) {
      $template.innerHTML += params.template;
    }
    if (params.style) {
      $template.innerHTML += `<style>${params.style.toString()}</style>`;
    }

    Metadatas[params.selector] = {
      $template: $template,
      template: params.template,
      style: params.style,
      root: params.root,
    };

    Object.defineProperties(constructor.prototype, {
      metadata: {
        get(): Metadata {
          return Metadatas[params.selector];
        },
      },
    });

    customElements.define(params.selector, constructor);
  };
}
