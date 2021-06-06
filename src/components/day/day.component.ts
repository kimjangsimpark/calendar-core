/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, CustomElement } from '../../engines/component';
import { CalendarService, Day } from '../../service/calendar.service';
import template from './day.component.html';
import style from './day.component.scss';

@Component({
  selector: 'kjsp-day',
  template: template,
  style: style,
})
export class DayComponent extends CustomElement {
  public day: Day;
  public date: Date;

  public constructor(
    private readonly calendarService: CalendarService,
    private readonly index: number
  ) {
    super();
    this.calendarService.selectedYearAndMonth.subscribe((date) => {
      const firstDay = this.calendarService.getSelectedFirstDay();
      const axisDate = new Date(date.getTime());
      axisDate.setDate(1);
      axisDate.setDate(-firstDay + 1);

      const targetDate = new Date(axisDate.getTime());
      targetDate.setDate(axisDate.getDate() + this.index);
      const $day = this.shadowRoot.querySelector('#day');
      $day.textContent = targetDate.getDate().toString();
    });
  }
}
