import './day/day.component';
import './toolbar/toolbar.component';

import { Component, CustomElement } from '../engines/component';
import template from './index.component.html';
import style from './index.component.scss';
import { CalendarService, Schedule } from '../service/calendar.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { WeekContainerComponent } from './week/week-container.component';
import { OverlayComponent } from './overlay/overlay.component';

enum IndexComponentParams {
  YEAR = 'year',
  MONTH = 'month',
}

@Component({
  selector: 'kjsp-index',
  template: template,
  style: style,
  root: true
})
export class IndexComponent extends CustomElement {
  public calendarService: CalendarService = new CalendarService();
  public date = new Date();
  // private readonly $toolbar: ToolbarComponent;

  public static get observedAttributes(): string[] {
    return [IndexComponentParams.YEAR, IndexComponentParams.MONTH];
  }

  public constructor() {
    super();
    // this.$toolbar = new ToolbarComponent(this.calendarService);
    // this.shadowRoot.prepend(this.$toolbar);
    const $toolbar = new ToolbarComponent(this.calendarService);
    this.shadowRoot.prepend($toolbar);
    this.offToolbar();

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
      $overlay.clear();
      const event = new CustomEvent('yearAndMonthChange', {
        detail: {
          date: date
        },
        composed: true
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

  public setSelectedMonthSchedule(scheduleList: Schedule[]): void {
    this.calendarService.setSelectedMonthSchedule(scheduleList);
  }

  public offToolbar(): void {
    const $toolbar = this.shadowRoot.querySelector<ToolbarComponent>('kjsp-toolbar');
    $toolbar.style.display = 'none';
  }
  public onToolbar():void{
    const $toolbar = this.shadowRoot.querySelector<ToolbarComponent>('kjsp-toolbar');
    $toolbar.style.display = 'flex';
  }
}
