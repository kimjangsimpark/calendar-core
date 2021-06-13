import { Component, CustomElement } from '../../engines/component';
import { CalendarService } from '../../service/calendar.service';
import template from './overlay.component.html';
import style from './overlay.component.scss';

export interface DialogTargetAxis {
  x: number;
  y: number;
  width: number;
  height: number;
}

@Component({
  selector: 'kjsp-overlay',
  template: template,
  style: style,
})
export class OverlayComponent extends CustomElement {
  public constructor(private readonly calendarService: CalendarService) {
    super();
    console.log(this);
  }

  public hasOpenedAny(): boolean {
    return !!this.shadowRoot.children.length;
  }

  public clear(): void {
    this.shadowRoot.innerHTML = '';
  }

  public getMaxHeight(): number {
    return this.offsetParent.getBoundingClientRect().height;
  }

  public getMaxWidth(): number {
    return this.offsetParent.getBoundingClientRect().width;
  }

  public openDialogComponent(component: CustomElement): void {
    component.style.position = 'fixed';
    this.shadowRoot.appendChild(component);
  }
}
