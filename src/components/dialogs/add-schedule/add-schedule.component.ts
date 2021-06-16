import { Component, CustomElement } from '../../../engines/component';
import { DialogTargetAxis, OverlayComponent } from '../../overlay/overlay.component';
import template from './add-schedule.component.html';
import style from './add-schedule.component.scss';

enum X {
  RIGHT,
  MIDDLE,
  LEFT,
}

enum Y {
  TOP,
  MIDDLE,
  BOTTOM,
}

@Component({
  selector: 'kjsp-add-schedule',
  template: template,
  style: style,
})
export class AddScheduleComponent extends CustomElement {

  public xMode: X;
  public yMode: Y;

  public constructor(
    private readonly overlayComponent: OverlayComponent,
    private readonly parentAxis: DialogTargetAxis
  ) {
    super();
    this.overlayComponent.clear();
    this.overlayComponent.shadowRoot.append(this);
    this.shadowRoot.querySelector('#close').addEventListener('click', this.onCloseClicked.bind(this));
    this.setX();
    this.setY();
  }
  
  public setX(): void {
    const rect = this.getBoundingClientRect();
    const maxWidth = this.overlayComponent.getMaxWidth();
    const maxHeight = this.overlayComponent.getMaxHeight();
    if (
      this.parentAxis.x + this.parentAxis.width + rect.width < maxWidth
    ) {
      this.style.left = `${this.parentAxis.x + this.parentAxis.width}px`;
      this.xMode = X.RIGHT;
    } else if (
      this.parentAxis.x + this.parentAxis.width + ((rect.width - this.parentAxis.width) / 2) < maxWidth
    ) {
      this.style.left = `${this.parentAxis.x - ((rect.width - this.parentAxis.width) / 2)}px`;
      this.xMode = X.MIDDLE;
    } else if (
      this.parentAxis.x - rect.width < this.parentAxis.x
    ) {
      this.style.left = `${this.parentAxis.x - rect.width}px`;
      this.xMode = X.LEFT;
    } else {
      throw new Error('Unsupported position');
    }
  }

  public setY(): void {
    const rect = this.getBoundingClientRect();
    const maxHeight = this.overlayComponent.getMaxHeight();
    if (
      this.parentAxis.y + this.parentAxis.height + ((rect.height - this.parentAxis.height) / 2) <= maxHeight &&
      this.xMode !== X.MIDDLE
    ) {
      this.style.top = `${this.parentAxis.y - ((rect.height - this.parentAxis.height) / 2)}px`;
      this.yMode = Y.MIDDLE;
    } else {
      if (
        this.parentAxis.y + this.parentAxis.height + rect.height <= maxHeight
      ) {
        this.style.top = `${this.parentAxis.y + this.parentAxis.height}px`;
        this.yMode = Y.BOTTOM;
      } else {
        this.style.top = `${this.parentAxis.y - rect.height}px`;
      }
    }
  }

  public onCloseClicked(): void {
    this.overlayComponent.clear();
  }
}
