import { Component, Lifecycle } from '../engines/component';
import template from './kjsp-calendar.component.html';
import style from './kjsp-calendar.component.scss';

@Component({
  selector: 'kjsp-calendar',
  template: template,
  style: style,
})
export class KJSPCalendarComponent extends HTMLElement implements Lifecycle {

  onRendered(): void {
    console.log(this.shadowRoot);
    this.shadowRoot?.querySelector('#my-button')?.addEventListener('click', e => {
      console.log('hello world');
    });
  }

}