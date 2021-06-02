import 'reflect-metadata';
import './components/index.component';
import { Root } from './engines/injectable';
import { IndexComponent } from './components/index.component';
import { CalendarOptions, CalendarService } from './service/calendar.service';
export const root = document.getElementById('root') as HTMLDivElement;

@Root()
export class KJSPCalendar {
  private readonly $wrapper: HTMLElement;

  private readonly calendarService: CalendarService;

  public constructor($wrapper: HTMLElement, options: CalendarOptions) {
    this.$wrapper = $wrapper;
    this.calendarService = new CalendarService(options);
    this.render();
  }

  public render(): void {
    const Constructor = customElements.get('kjsp-index') as new (
      service: CalendarService
    ) => IndexComponent;

    const $index = new Constructor(this.calendarService);
    this.$wrapper.append($index);
  }
}

const instance = new KJSPCalendar(root, {
  selectedDate: new Date(),
  onSelectedYearAndMonthChanged: (event) => {
    console.log(event);
  },
});
