import { Component, CustomElement } from '../../../engines/component';
import { DialogTargetAxis, OverlayComponent } from '../../overlay/overlay.component';
import template from './add-schedule.component.html';
import style from './add-schedule.component.scss';

enum Position {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
}

const ExpectedOrder: Position[] = [Position.TOP, Position.RIGHT, Position.BOTTOM, Position.LEFT];

@Component({
  selector: 'kjsp-add-schedule',
  template: template,
  style: style,
})
export class AddScheduleComponent extends CustomElement {

  public constructor(
    private readonly overlayComponent: OverlayComponent,
    private readonly parentAxis: DialogTargetAxis
  ) {
    super();
    this.overlayComponent.clear();
    this.overlayComponent.shadowRoot.append(this);
    this.getRendablePosition();
  }
  
  public getRendablePosition(): void {
    const rect = this.getBoundingClientRect();

    const maxWidth = this.overlayComponent.getMaxWidth();
    const maxHeight = this.overlayComponent.getMaxHeight();

    // 우하좌상 우선순위 x 축 정의
    if (
      this.parentAxis.x + this.parentAxis.width + rect.width < maxWidth
    ) {
      this.style.left = `${this.parentAxis.x + this.parentAxis.width}px`;
    } else if (
      this.parentAxis.x + this.parentAxis.width + ((rect.width - this.parentAxis.width) / 2) < maxWidth
    ) {
      this.style.left = `${this.parentAxis.x - ((rect.width - this.parentAxis.width) / 2)}px`;
    } else if (
      this.parentAxis.x - rect.width < this.parentAxis.x
    ) {
      this.style.left = `${this.parentAxis.x - rect.width}px`;
    } else {
      throw new Error('Unsupported position');
    }

    // y 축 보정 실행
  }
}
