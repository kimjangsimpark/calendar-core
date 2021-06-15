/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, CustomElement } from '../../../engines/component';
import { CalendarService } from '../../../service/calendar.service';
import template from './schedulebar.component.html';
import style from './schedulebar.component.scss';
import { ScheduleViewModel } from '../schedule-week-container/schedule-week-container.component';

@Component({
  selector: 'kjsp-schedulebar',
  template: template,
  style: style,
})
export class SchedulebarComponent extends CustomElement {
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
  }

  public attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    this.index = Number(newValue);
  }
}
