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

  public getYear(): number {
    const current = this.selectedYearAndMonth.getValue();
    return current.getFullYear();
  }

  public getMonth(): number {
    const current = this.selectedYearAndMonth.getValue();
    return current.getMonth();
  }

  public setYear(year: number): void {
    const current = this.selectedYearAndMonth.getValue();
    current.setFullYear(year);
    this.selectedYearAndMonth.next(current);
  }

  public setMonth(month: number): void {
    const current = this.selectedYearAndMonth.getValue();
    current.setMonth(month);
    this.selectedYearAndMonth.next(current);
  }

}
