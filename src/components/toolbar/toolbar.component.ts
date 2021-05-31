import { Component } from '../../engines/component';
import { CalendarService } from '../../service/calendar.service';
import template from './toolbar.component.html';
import style from './toolbar.component.scss';

@Component('kjsp-toolbar')
export class ToolbarComponent extends HTMLElement {
  public date: Date;

  public constructor(private readonly calendarService: CalendarService) {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML += template;
      this.shadowRoot.innerHTML += `<style>${style.toString()}</style>`;
    }
    // this.calendarService.selectedDate.subscribe((date) => {
    //   this.date = date;

    //   this.shadowRoot.querySelector(
    //     '#current-year'
    //   ).innerHTML += this.date.getFullYear();
    // });
    console.log(this.calendarService);
  }

  public connectedCallback(): void {
    console.log(this.calendarService);
  }
}
