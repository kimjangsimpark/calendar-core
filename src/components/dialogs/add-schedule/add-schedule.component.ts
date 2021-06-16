import { Component, CustomElement } from '../../../engines/component';
import { DialogComponent } from '../../extendables/dialog.component';
import { DialogTargetAxis, OverlayComponent } from '../../overlay/overlay.component';
import template from './add-schedule.component.html';
import style from './add-schedule.component.scss';

enum Position {
  RIGHT,
  BOTTOM,
  LEFT,
  TOP,
}

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
export class AddScheduleComponent extends DialogComponent {

  public constructor(
    public readonly overlayComponent: OverlayComponent,
    public readonly parentAxis: DialogTargetAxis
  ) {
    super(overlayComponent, parentAxis);
    this.shadowRoot
      .querySelector('#close')
      .addEventListener('click', this.onCloseClicked.bind(this));
  }

  public onCloseClicked(): void {
    this.overlayComponent.clear();
  }
}
