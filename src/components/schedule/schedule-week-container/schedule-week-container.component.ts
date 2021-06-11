import { Component, CustomElement } from '../../../engines/component';
import { CalendarService } from '../../../service/calendar.service';
import template from './schedule-week-container.component.html';
import style from './schedule-week-container.component.scss';

@Component({
  selector: 'schedule-week-container',
  template: template,
  style: style,
})
export class ScheduleWeekContainerComponent extends CustomElement {
  private startDay: Date;
  private endDay: Date;

  public constructor(
    private readonly calendarService: CalendarService,
    private readonly index: number
  ) {
    super();
    this.calendarService.selectedYearAndMonth.subscribe((date) => {
      console.log('서비스에서 받은 구독결과 인덱스 & 데이트', this.index, date);
    });
    this.calendarService.selectedMonthSchedules.subscribe((scheduleList) => {
      console.log(scheduleList);
    });
  }
}
