import { Component } from '../../../engines/component';
import { DialogComponent } from '../../extendables/dialog.component';
import { DialogTargetAxis, OverlayComponent } from '../../overlay/overlay.component';
import template from './edit-schedule.component.html';
import style from './edit-schedule.component.scss';

@Component({
  selector: 'kjsp-edit-schedule',
  template: template,
  style: style,
})
export class EditScheduleComponent extends DialogComponent {

  public constructor(
    public readonly overlayComponent: OverlayComponent,
    public readonly axis: DialogTargetAxis,
  ) {
    super(overlayComponent, axis);
  }

}