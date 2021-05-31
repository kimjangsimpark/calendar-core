import 'reflect-metadata';
import './components/index.component';
import { Root } from './engines/injectable';
import { IndexComponent } from './components/index.component';
import { CalendarService } from './service/calendar.service';
export const root = document.getElementById('root') as HTMLDivElement;

@Root()
export class KJSPCalendar {
  private readonly $wrapper: HTMLElement;

  private readonly calendarService: CalendarService = new CalendarService(
    new Date()
  );

  public constructor($wrapper: HTMLElement) {
    this.$wrapper = $wrapper;
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

const instance = new KJSPCalendar(root);
console.log(instance);
