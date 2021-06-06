/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, CustomElement } from '../../../engines/component';
import { CalendarService, Schedule } from '../../../service/calendar.service';
import { DayComponent } from '../../day/day.component';
import template from './scheduleWeekLayer.component.html';
import style from './scheduleWeekLayer.component.scss';

@Component({
  selector: 'kjsp-schedule-week-layer',
  template: template,
  style: style,
})
export class ScheduleWeekLayerComponent extends CustomElement {
  public schedule: Schedule;

  public constructor(
    private readonly calendarService: CalendarService,
    private readonly index: number
  ) {
    super();

    for (let i = 0; i < 7; i++) {
      const $day = new DayComponent(this.calendarService, this.index * 7 + i);
      this.shadowRoot.append($day);
    }

    // this.calendarService.selectedYearAndMonth.subscribe((date) => {
    //   console.log(date);
    // });
  }

  // public setIndex(index: string): void {
  //   this.setAttribute('index', index);
  //   this.style.top = ((100 / 6) * Number(index)).toString() + '%';
  // }
}
