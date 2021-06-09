/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, CustomElement } from '../../engines/component';
import { CalendarService, Schedule } from '../../service/calendar.service';
import { DayComponent } from '../day/day.component';
import { OverlayComponent } from '../overlay/overlay.component';
import { ScheduleWeekContainerComponent } from '../schedule/schedule-week-container/schedule-week-container.component';
import template from './week-container.component.html';
import style from './week-container.component.scss';

@Component({
  selector: 'kjsp-week-container',
  template: template,
  style: style,
})
export class WeekContainerComponent extends CustomElement {
  public schedule: Schedule;

  public constructor(
    private readonly calendarService: CalendarService,
    private readonly overlayComponent: OverlayComponent,
    private readonly index: number
  ) {
    super();
    for (let i = 0; i < 7; i++) {
      const $day = new DayComponent(
        this.calendarService,
        this.overlayComponent,
        this.index * 7 + i
      );
      this.shadowRoot.append($day);
    }
    const $scheduleContainer = new ScheduleWeekContainerComponent(
      this.calendarService,
      this.index
    );
    this.shadowRoot.append($scheduleContainer);
  }
}
