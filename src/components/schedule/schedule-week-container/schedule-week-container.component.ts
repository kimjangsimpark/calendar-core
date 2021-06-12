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
    this.calendarService.selectedYearAndMonth.subscribe(this.getSubscriber());
    this.calendarService.selectedMonthSchedules.subscribe((scheduleList) => {
      console.log(scheduleList);
    });
  }

  private getSubscriber(): (date: Date) => void {
    const getSelectedFirstDay = (): number => {
      return this.calendarService.getSelectedFirstDay();
    };

    const getAxisDate = (date: Date) => {
      const axisDate = new Date(date.getTime());
      axisDate.setDate(1);
      axisDate.setDate(-getSelectedFirstDay.call(this) + 1);
      return axisDate;
    };

    return (date) => {
      this.startDay = new Date(getAxisDate(date).getTime());
      this.startDay.setDate(
        getAxisDate(date).getDate() + UnitsForSchedule.week * this.index
      );
      this.endDay = new Date(getAxisDate(date).getTime());
      this.endDay.setDate(
        getAxisDate(date).getDate() +
          UnitsForSchedule.week * (this.index + 1) -
          1
      );
      console.log('스타트데이트:', this.startDay);
      console.log('엔드데이트22:', this.endDay);
    };
  }
}
