/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, CustomElement } from '../../../engines/component';
import { CalendarService } from '../../../service/calendar.service';
import template from './scheduleWeekLayer.component.html';
import style from './scheduleWeekLayer.component.scss';

@Component({
  selector: 'kjsp-schedule-week-layer',
  template: template,
  style: style,
})
export class ScheduleWeekLayerComponent extends CustomElement {
  public index: number;

  public static get observedAttributes(): string[] {
    return ['index'];
  }

  public constructor(private readonly calendarService: CalendarService) {
    super();
    this.calendarService.selectedYearAndMonth.subscribe((date) => {
      console.log(date);
    });
  }

  public setIndex(index: string): void {
    this.setAttribute('index', index);
    this.style.top = ((100 / 6) * Number(index)).toString() + '%';
  }
  public attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    this.index = Number(newValue);
  }
}
