import './day/day.component';
import './toolbar/toolbar.component';

import { Component, CustomElement } from '../engines/component';
import template from './index.component.html';
import style from './index.component.scss';
import { CalendarService } from '../service/calendar.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { WeekContainerComponent } from './week/week-container.component';
import { OverlayComponent } from './overlay/overlay.component';
import { fakeData } from '../data/fake.data';

enum IndexComponentParams {
  YEAR = 'year',
  MONTH = 'month',
}

@Component({
  selector: 'kjsp-index',
  template: template,
  style: style,
  root: true,
})
export class IndexComponent extends CustomElement {
  public calendarService: CalendarService = new CalendarService();
  public date = new Date();

  public static get observedAttributes(): string[] {
    return [IndexComponentParams.YEAR, IndexComponentParams.MONTH];
  }

  public constructor() {
    super();
    const $toolbar = new ToolbarComponent(this.calendarService);
    this.shadowRoot.prepend($toolbar);

    const $overlay = new OverlayComponent(this.calendarService);
    const $calendarWrapper = this.shadowRoot.getElementById('calendar-wrapper');
    $calendarWrapper.append($overlay);

    const $calendar = this.shadowRoot.querySelector('#index');

    for (let i = 0; i < 6; i++) {
      const scheduleWeekLayer = new WeekContainerComponent(
        this.calendarService,
        $overlay,
        i
      );
      $calendar.append(scheduleWeekLayer);
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

    // insert fake data
    this.calendarService.setSelectedMonthSchedule(fakeData);
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
        this.calendarService.setSelectedMonth(Number(newValue) - 1);
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
