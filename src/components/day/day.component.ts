/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, CustomElement } from '../../engines/component';
import { CalendarService } from '../../service/calendar.service';
import template from './day.component.html';
import style from './day.component.scss';

@Component({
  selector: 'kjsp-day',
  template: template,
  style: style,
})
export class DayComponent extends CustomElement {
  public index: number;

  public static get observedAttributes(): string[] {
    return ['index'];
  }

  public constructor(private readonly calendarService: CalendarService) {
    super();
    this.calendarService.selectedDate.subscribe((date) => {
      console.log(date);
    });
  }

  public attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    this.index = Number(newValue);
  }
}
