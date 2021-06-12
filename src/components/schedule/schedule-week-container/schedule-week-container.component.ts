import { Component, CustomElement } from '../../../engines/component';
import { CalendarService } from '../../../service/calendar.service';
import template from './schedule-week-container.component.html';
import style from './schedule-week-container.component.scss';

enum UnitsForSchedule {
  week = 7,
}

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
      const firstDay = this.calendarService.getSelectedFirstDay();
      const axisDate = new Date(date.getTime());
      console.log(' 데이트 :', date, axisDate);
      axisDate.setDate(1);
      axisDate.setDate(-firstDay + 1);
      console.log('인덱스', this.index, axisDate);
      this.startDay = new Date(axisDate.getTime());
      this.startDay.setDate(
        axisDate.getDate() + UnitsForSchedule.week * this.index
      );
      this.endDay = new Date(axisDate.getTime());
      this.endDay.setDate(
        axisDate.getDate() + UnitsForSchedule.week * (this.index + 1) - 1
      );
      console.log('스타트데이트:', this.startDay);
      console.log('엔드데이트22:', this.endDay);
    });
    this.calendarService.selectedMonthSchedules.subscribe((scheduleList) => {
      console.log(scheduleList);
    });
  }
}
