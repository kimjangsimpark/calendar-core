import './day/day.component';
import './toolbar/toolbar.component';

import { Component, CustomElement } from '../engines/component';
import { DayComponent, DayComponentParams } from './day/day.component';
import template from './index.component.html';
import style from './index.component.scss';
import { CalendarService } from '../service/calendar.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ScheduleWeekLayerComponent } from './schedule/schedule-week/scheduleWeekLayer.component';

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
      day.setAttribute(DayComponentParams.INDEX, i.toString());
      day.setAttribute(DayComponentParams.DAY, (i % 7).toString());
      $calendar.appendChild(day);
    }

    for (let i = 0; i < 6; i++) {
      const scheduleWeekLayer = new ScheduleWeekLayerComponent(
        this.calendarService
      );
      scheduleWeekLayer.classList.add('schedule-week-layer');
      scheduleWeekLayer.setIndex(i.toString());
      $calendar.appendChild(scheduleWeekLayer);
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
        this.calendarService.setSelectedYear(Number(newValue));
        break;
      case IndexComponentParams.MONTH:
        this.calendarService.setSelectedMonth(Number(newValue));
        break;
    }
  }
  public setNextYear(): void {
    const current = this.calendarService.selectedYearAndMonth.getValue();
    this.calendarService.setSelectedYear(current.getFullYear() + 1);
  }

  public setNextMonth(): void {
    const current = this.calendarService.selectedYearAndMonth.getValue();
    this.calendarService.setSelectedMonth(current.getMonth() + 1);
  }

  public setPreviousYear(): void {
    const current = this.calendarService.selectedYearAndMonth.getValue();
    this.calendarService.setSelectedYear(current.getFullYear() + 1);
  }

  public setPreviousMonth(): void {
    const current = this.calendarService.selectedYearAndMonth.getValue();
    this.calendarService.setSelectedMonth(current.getMonth() - 1);
  }
}
