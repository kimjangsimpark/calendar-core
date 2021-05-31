/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component } from '../../engines/component';
import template from './day.component.html';
import style from './day.component.scss';

@Component({
  selector: 'kjsp-day',
  template: template,
  style: style,
})
export class DayComponent extends HTMLElement {
  public date: Date;

  public setDate(date: Date): void {
    this.date = date;
  }
}
