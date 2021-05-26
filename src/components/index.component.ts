/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, Lifecycle } from '../engines/component';
import template from './index.component.html';
import style from './index.component.scss';

@Component({
  selector: 'calendar-index',
  template: template,
  style: style,
})
export class IndexComponent extends HTMLElement implements Lifecycle {
  public constructor() {
    super();
  }

  onRendered(): void {
    console.log(this.shadowRoot);
  }
}
