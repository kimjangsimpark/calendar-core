/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, CustomElement } from '../../../engines/component';
import { CalendarService } from '../../../service/calendar.service';
import template from './schedule-bar.component.html';
import style from './schedule-bar.component.scss';
import { ScheduleViewModel } from '../schedule-week-container/schedule-week-container.component';

@Component({
  selector: 'kjsp-schedulebar',
  template: template,
  style: style
})
export class ScheduleBarComponent extends CustomElement {
  public index: number;

  public static get observedAttributes(): string[] {
    return ['index'];
  }

  public constructor(
    private readonly calendarService: CalendarService,
    private scheduleVM: ScheduleViewModel
  ) {
    super();
    const $scheduleName = this.shadowRoot.querySelector('#schedule-name');
    $scheduleName.textContent =
      this.scheduleVM.getName +
      ' ' +
      this.scheduleVM.startDate.toLocaleDateString() +
      ' ~ ' +
      this.scheduleVM.endDate.toLocaleDateString();
    this.style.top = String(this.scheduleVM.top) + 'px';
    this.style.left = String(this.scheduleVM.left) + '%';
  }

  public attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    this.index = Number(newValue);
  }
}
