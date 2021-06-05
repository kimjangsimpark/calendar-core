import { BehaviorSubject } from '../engines/observable';

export interface CalendarOptions {
  selectedDate?: Date;
  onSelectedYearAndMonthChanged: (date: Date) => void;
}

export interface Schedule {
  startDate: Date;
  endDate: Date;
  name: string;
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

  public setYearAndMonth(date: Date): void {
    this.selectedYearAndMonth.next(date);
  }

  public setSchedules(schedules: Schedule[]): void {
    this.selectedMonthSchedules.next(schedules);
  }
}
