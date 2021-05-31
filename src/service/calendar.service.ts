import { BehaviorSubject, Subject } from '../engines/observable';

export class CalendarService {
  public currentDate = new Date();
  public selectedDate = new BehaviorSubject(new Date());

  public constructor(selectedDate?: Date) {
    if (selectedDate) {
      this.selectedDate.next(selectedDate);
    } else {
      this.selectedDate.next(new Date());
    }
  }
}
