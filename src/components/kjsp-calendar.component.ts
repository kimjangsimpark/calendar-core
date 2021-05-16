import { Component } from '../engines/component';
import template from './kjsp-calendar.component.html';
import style from './kjsp-calendar.component.scss';

@Component({
  selector: 'kjsp-calendar',
  template: template,
  style: style,
})
export class KJSPCalendarComponent {
  public name: string;

  public constructor() {
    this.name = 'hansol';
  }
}
