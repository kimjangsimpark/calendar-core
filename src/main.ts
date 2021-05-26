import 'reflect-metadata';
import { Autowired, Root } from './engines/injectable';
import { IndexComponent } from './components/index.component';
import { CalendarService } from './service/calendar.service';
export const root = document.getElementById('root') as HTMLDivElement;

@Root()
export class KJSPCalendar {
  private readonly $wrapper: HTMLElement;

  @Autowired()
  private readonly calendarService: CalendarService;

  public constructor($wrapper: HTMLElement) {
    this.$wrapper = $wrapper;
    this.render();
  }

  public render(): void {
    const $index = document.createElement('calendar-index') as IndexComponent;
    this.$wrapper.append($index);
  }
}

const instance = new KJSPCalendar(root);
console.log(instance);
