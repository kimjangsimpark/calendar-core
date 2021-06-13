import { Component, CustomElement } from '../../../engines/component';
import {
  DialogTargetAxis,
  OverlayComponent,
} from '../../overlay/overlay.component';
import template from './add-schedule.component.html';
import style from './add-schedule.component.scss';

enum Position {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
}

const ExpectedOrder: Position[] = [
  Position.TOP,
  Position.RIGHT,
  Position.BOTTOM,
  Position.LEFT,
];

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
    const rect = this.getBoundingClientRect();

    this.style.left = `${parentAxis.x + parentAxis.width}px`;
    this.style.top = `${
      parentAxis.y - (rect.height - parentAxis.height) / 2
    }px`;
  }

  public getRendablePosition(): void {}
}
