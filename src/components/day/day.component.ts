/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Component } from '../../engines/component';
import { CalendarService } from '../../service/calendar.service';
import template from './day.component.html';
import style from './day.component.scss';

@Component('kjsp-day')
export class DayComponent extends HTMLElement {
  public index: number;

  public static get observedAttributes(): string[] {
    return ['index'];
  }

  public constructor(private readonly calendarService: CalendarService) {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML += template;
      this.shadowRoot.innerHTML += `<style>${style.toString()}</style>`;
    }

    this.calendarService.selectedDate.subscribe((date) => {
      console.log(date);
    });
  }

  public attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    this.index = Number(newValue);
  }
}
