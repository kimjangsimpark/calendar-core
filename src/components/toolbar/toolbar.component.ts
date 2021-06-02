import { Component, CustomElement } from '../../engines/component';
import { CalendarService } from '../../service/calendar.service';
import template from './toolbar.component.html';
import style from './toolbar.component.scss';

@Component({
  selector: 'kjsp-toolbar',
  template: template,
  style: style,
})
export class ToolbarComponent extends CustomElement {
  public date: Date;

  public constructor(private readonly calendarService: CalendarService) {
    super();
    calendarService.selectedYearAndMonth.subscribe((selectedDate) => {
      const el = this.shadowRoot.querySelector('#current-year');
      el.innerHTML = selectedDate.getFullYear().toString();
    });
  }

  public connectedCallback(): void {
    console.log(this.calendarService);
  }
}
