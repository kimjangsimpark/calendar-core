import './day/day.component';
import './toolbar/toolbar.component';

import { Component } from '../engines/component';
import { DayComponent } from './day/day.component';
import template from './index.component.html';
import style from './index.component.scss';
import { CalendarService } from '../service/calendar.service';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component('kjsp-index')
export class IndexComponent extends HTMLElement {
  public date = new Date();

  public constructor(private readonly calendarService: CalendarService) {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML += template;
    this.shadowRoot.innerHTML += `<style>${style.toString()}</style>`;
    const $toolbar = new ToolbarComponent(this.calendarService);
    this.shadowRoot.append($toolbar);
    const $calendar = this.shadowRoot.querySelector('#index');
    for (let i = 0; i < 7 * 5; i++) {
      const day = new DayComponent(this.calendarService);
      day.classList.add('day');
      day.setAttribute('index', i.toString());
      $calendar?.appendChild(day);
    }
  }
}
