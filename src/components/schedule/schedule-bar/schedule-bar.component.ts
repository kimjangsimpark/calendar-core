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
    console.log(this.scheduleVM);
    const $scheduleName = this.shadowRoot.querySelector('#schedule-name');
    $scheduleName.textContent = this.scheduleVM.getName;
    console.dir($scheduleName);
    this.style.top = String(this.scheduleVM.top) + 'px';
  }

  public attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    this.index = Number(newValue);
  }
}
