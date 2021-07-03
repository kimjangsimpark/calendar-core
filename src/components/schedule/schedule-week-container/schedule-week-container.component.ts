import { Component, CustomElement } from '../../../engines/component';
import { CalendarService, Schedule } from '../../../service/calendar.service';
import template from './schedule-week-container.component.html';
import style from './schedule-week-container.component.scss';
import { ScheduleBarComponent } from '../schedule-bar/schedule-bar.component';

export class ScheduleViewModel {
  private _top = 0;
  private _left = 0;
  private _width = 0;
  private _height = 0;
  private _startDate: Date;
  private _endDate: Date;

  constructor(private _model: Schedule) {
    this._startDate = new Date(this._model.startDate.getTime());
    this._endDate = new Date(this._model.endDate.getTime());
  }

  get getName(): string {
    return this._model.name;
  }

  get getDuration(): number {
    return this.endDate.getTime() - this.startDate.getTime();
  }

  get top(): number {
    return this._top;
  }

  set top(value: number) {
    this._top = value;
  }

  get left(): number {
    return this._left;
  }

  set left(value: number) {
    this._left = value;
  }

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  get startDate(): Date {
    return this._startDate;
  }

  set startDate(value: Date) {
    this._startDate = value;
  }

  get endDate(): Date {
    return this._endDate;
  }

  set endDate(value: Date) {
    this._endDate = value;
  }

  get model(): Schedule {
    return this._model;
  }

  set model(value: Schedule) {
    this._model = value;
  }
}

enum UnitsForSchedule {
  week = 7,
  top = 19,
  left = (1 / 7) * 100,
}

@Component({
  selector: 'schedule-week-container',
  template: template,
  style: style
})
export class ScheduleWeekContainerComponent extends CustomElement {
  private startDate: Date;
  private endDate: Date;
  private scheduleVMList: ScheduleViewModel[];
  private scheduleBarList: ScheduleBarComponent[];

  public constructor(
    private readonly calendarService: CalendarService,
    private readonly index: number
  ) {
    super();
    this.calendarService.selectedYearAndMonth.subscribe(this.getSubscriber());
    this.calendarService.selectedMonthSchedules.subscribe(this.getScheduleSubscriber());
  }

  private getScheduleSubscriber() {
    return (scheduleList: Schedule[]) => {
      this.scheduleVMList = scheduleList.reduce((result, schedule) => {
        if (
          schedule.endDate.getTime() < this.startDate.getTime() ||
          schedule.startDate.getTime() > this.endDate.getTime()
        ) {
          return [...result];
        } else {
          result.push(new ScheduleViewModel(schedule));
          return [...result];
        }
      }, new Array<ScheduleViewModel>());
      this.scheduleVMList.sort((a, b) => {
        return b.getDuration - a.getDuration;
      });
      this.scheduleBarList = new Array<ScheduleBarComponent>();
      this.scheduleVMList.forEach((schedule, index) => {
        schedule.top = (index + 1) * UnitsForSchedule.top;
        if (this.startDate.getDate() > this.endDate.getDate() &&
          this.endDate.getMonth() === schedule.startDate.getMonth()) {
          schedule.left =
            (6 - (this.endDate.getDate() - schedule.startDate.getDate()) >= 0
              ? 6 - (this.endDate.getDate() - schedule.startDate.getDate())
              : 0) * UnitsForSchedule.left;
          console.log('여봐라~', 6 - (this.endDate.getDate() - schedule.startDate.getDate()));
          console.log('여봐라~2', this.endDate.getDate());
          console.log('여봐라~3', schedule.startDate.getDate());

        } else {
          schedule.left =
            (schedule.startDate.getDate() - this.startDate.getDate() >= 0
              ? schedule.startDate.getDate() - this.startDate.getDate()
              : 0) * UnitsForSchedule.left;
        }
        const scheduleBar = new ScheduleBarComponent(
          this.calendarService,
          schedule
        );
        this.scheduleBarList.push(scheduleBar);
        this.shadowRoot.append(scheduleBar);
      });
    };
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
      this.startDate = new Date(getAxisDate(date).getTime());
      this.startDate.setDate(
        getAxisDate(date).getDate() + UnitsForSchedule.week * this.index
      );
      this.endDate = new Date(getAxisDate(date).getTime());
      this.endDate.setDate(
        getAxisDate(date).getDate() +
        UnitsForSchedule.week * (this.index + 1) -
        1
      );
    };
  }
}
