import './day/day.component';
import './toolbar/toolbar.component';

import { Component, CustomElement } from '../engines/component';
import { DayComponent } from './day/day.component';
import template from './index.component.html';
import style from './index.component.scss';
import { CalendarService } from '../service/calendar.service';
import { ToolbarComponent } from './toolbar/toolbar.component';

enum IndexComponentParams {
  YEAR = 'year',
  MONTH = 'month',
}

@Component({
  selector: 'kjsp-index',
  template: template,
  style: style,
})
export class IndexComponent extends CustomElement {
  public date = new Date();
  public calendarService: CalendarService = new CalendarService();

  public static get observedAttributes(): string[] {
    return [IndexComponentParams.YEAR, IndexComponentParams.MONTH];
  }

  public constructor() {
    super();
    const $toolbar = new ToolbarComponent(this.calendarService);
    this.shadowRoot.prepend($toolbar);

    const $calendar = this.shadowRoot.querySelector('#index');
    for (let i = 0; i < 7 * 6; i++) {
      const day = new DayComponent(this.calendarService);
      day.classList.add('day');
      day.setAttribute('index', i.toString());
      $calendar.appendChild(day);
    }

    this.calendarService.selectedYearAndMonth.subscribe((date) => {
      const event = new CustomEvent('yearAndMonthChange', {
        detail: {
          date: date,
        },
        composed: true,
      });
      this.dispatchEvent(event);
    });
  }

  public attributeChangedCallback(
    name: IndexComponentParams,
    oldValue: string,
    newValue: string
  ): void {
    switch (name) {
      case IndexComponentParams.YEAR:
        this.setYear(Number(newValue));
        break;
      case IndexComponentParams.MONTH:
        this.setMonth(Number(newValue));
        break;
    }
  }

  public setYear(year: number): void {
    const current = this.calendarService.selectedYearAndMonth.getValue();
    current.setFullYear(year);
    this.calendarService.selectedYearAndMonth.next(current);
  }

  public setMonth(month: number): void {
    const current = this.calendarService.selectedYearAndMonth.getValue();
    current.setMonth(month);
    this.calendarService.selectedYearAndMonth.next(current);
  }

  public setNextYear(): void {
    const current = this.calendarService.selectedYearAndMonth.getValue();
    this.setYear(current.getFullYear() + 1);
  }

  public setNextMonth(): void {
    const current = this.calendarService.selectedYearAndMonth.getValue();
    this.setMonth(current.getMonth() + 1);
  }

  public setPreviousYear(): void {
    const current = this.calendarService.selectedYearAndMonth.getValue();
    this.setYear(current.getFullYear() + 1);
  }

  public setPreviousMonth(): void {
    const current = this.calendarService.selectedYearAndMonth.getValue();
    this.setMonth(current.getMonth() - 1);
  }
}
