/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, CustomElement } from '../../engines/component';
import { CalendarService, Day } from '../../service/calendar.service';
import template from './day.component.html';
import style from './day.component.scss';

export enum DayComponentParams {
  DAY = 'day',
  INDEX = 'index',
}

@Component({
  selector: 'kjsp-day',
  template: template,
  style: style,
})
export class DayComponent extends CustomElement {
  public day: Day;
  public index: number;

  public static get observedAttributes(): DayComponentParams[] {
    return [DayComponentParams.INDEX, DayComponentParams.DAY];
  }

  public constructor(private readonly calendarService: CalendarService) {
    super();
    this.calendarService.selectedYearAndMonth.subscribe((date) => {
      console.log(date.getDay());
    });
  }

  public attributeChangedCallback(
    name: DayComponentParams,
    oldValue: string,
    newValue: string
  ): void {
    switch (name) {
      case DayComponentParams.DAY:
        this.day = Number(newValue) as Day;
        break;
      case DayComponentParams.INDEX:
        this.index = Number(newValue);
        break;
    }
  }
}
