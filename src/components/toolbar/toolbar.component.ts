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
      const $year = this.shadowRoot.querySelector('#current-year');
      $year.textContent = selectedDate.getFullYear().toString();
      const $month = this.shadowRoot.querySelector('#current-month');
      $month.textContent = (selectedDate.getMonth() + 1).toString();
    });

    const $nextMonth = this.shadowRoot.querySelector('#next-month-btn');
    $nextMonth.addEventListener('click', this.onNextMonthClicked.bind(this));
    const $previousMonth = this.shadowRoot.querySelector('#previous-month-btn');
    $previousMonth.addEventListener(
      'click',
      this.onPreviousMonthClicked.bind(this)
    );
  }

  public onNextMonthClicked(): void {
    this.calendarService.setSelectedMonth(
      this.calendarService.getSelectedMonth() + 1
    );
  }

  public onPreviousMonthClicked(): void {
    this.calendarService.setSelectedMonth(
      this.calendarService.getSelectedMonth() - 1
    );
  }
}
