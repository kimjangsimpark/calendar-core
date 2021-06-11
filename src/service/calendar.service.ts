import { BehaviorSubject } from '../engines/observable';

export interface CalendarOptions {
  selectedDate?: Date;
  onSelectedYearAndMonthChanged: (date: Date) => void;
}

export interface Schedule {
  id: string;
  startDate: Date;
  endDate: Date;
  name: string;
  content: string;
  isAllDay: boolean;
}

export enum Day {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

export class CalendarService {
  public readonly currentDate = new Date();

  public readonly selectedYearAndMonth: BehaviorSubject<Date> = new BehaviorSubject(
    new Date()
  );
  public readonly selectedMonthSchedules: BehaviorSubject<
    Schedule[]
  > = new BehaviorSubject<Schedule[]>([]);

  public constructor() {
    this.selectedYearAndMonth.subscribe((selectedDate) => {
      // if (options.onSelectedYearAndMonthChanged) {
      //   options.onSelectedYearAndMonthChanged(selectedDate);
      // }
    });
  }

  public getSelectedFirstDay(): number {
    const clone = new Date(this.selectedYearAndMonth.getValue().getTime());
    clone.setDate(1);
    return clone.getDay();
  }

  public getSelectedLastDate(): number {
    const clone = new Date(this.selectedYearAndMonth.getValue().getTime());
    clone.setDate(0);
    return clone.getDate();
  }

  public getSelectedYear(): number {
    const current = this.selectedYearAndMonth.getValue();
    return current.getFullYear();
  }

  public getSelectedMonth(): number {
    const current = this.selectedYearAndMonth.getValue();
    return current.getMonth();
  }

  public setSelectedYear(year: number): void {
    const current = new Date(this.selectedYearAndMonth.getValue().getTime());
    current.setFullYear(year);
    this.selectedYearAndMonth.next(current);
  }

  public setSelectedMonth(month: number): void {
    const current = new Date(this.selectedYearAndMonth.getValue().getTime());
    current.setMonth(month);
    this.selectedYearAndMonth.next(current);
  }

  public setSelectedMonthSchedule(scheduleList: Schedule[]): void {
    this.selectedMonthSchedules.next(scheduleList);
  }
}
