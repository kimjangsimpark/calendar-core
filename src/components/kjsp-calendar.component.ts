/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component, Lifecycle } from '../engines/component';
import { Autowired } from '../engines/injectable';
import { CalendarService } from '../service/calendar.service';
import template from './kjsp-calendar.component.html';
import style from './kjsp-calendar.component.scss';

@Component({
  selector: 'kjsp-calendar',
  template: template,
  style: style,
})
export class KJSPCalendarComponent extends HTMLElement implements Lifecycle {
  @Autowired()
  calendarService: CalendarService;

  onRendered(): void {
    console.log(this.shadowRoot);
  }
}
