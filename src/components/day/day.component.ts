/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, CustomElement } from '../../engines/component';
import { CalendarService, Day } from '../../service/calendar.service';
import { AddScheduleComponent } from '../dialogs/add-schedule/add-schedule.component';
import { OverlayComponent } from '../overlay/overlay.component';
import { WeekContainerComponent } from '../week/week-container.component';
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
    private readonly overlayComponent: OverlayComponent,
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

    this.addEventListener('click', this.onDayClicked.bind(this));
  }

  public getTop(): number {
    const parent = this.offsetParent as WeekContainerComponent;
    return parent.offsetTop;
  }

  public getLeft(): number {
    return this.offsetLeft;
  }

  public onDayClicked(e: Event): void {
    const rect = this.getBoundingClientRect();
    const axis = {
      x: this.getLeft(),
      y: this.getTop(),
      width: rect.width,
      height: rect.height,
    };

    const $schedule = new AddScheduleComponent();
    this.overlayComponent.openDialogComponent($schedule);
  }
}
