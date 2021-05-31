import './day/day.component';
import './toolbar/toolbar.component';

import { Component } from '../engines/component';
import { DayComponent } from './day/day.component';
import template from './index.component.html';
import style from './index.component.scss';

@Component({
  selector: 'kjsp-index',
  template: template,
  style: style,
})
export class IndexComponent extends HTMLElement {
  public date = new Date();

  connectedCallback(): void {
    console.log(this.date);
    const $calendar = this.shadowRoot?.querySelector('#index');
    for (let i = 0; i < 7 * 5; i++) {
      const day = document.createElement('kjsp-day') as DayComponent;
      $calendar?.appendChild(day);
    }
  }
}
