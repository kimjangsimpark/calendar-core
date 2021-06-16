import { Component } from '../../../engines/component';
import { DialogComponent } from '../../extendables/dialog.component';
import { DialogTargetAxis, OverlayComponent } from '../../overlay/overlay.component';
import template from './view-schedule.component.html';
import style from './view-schedule.component.scss';

@Component({
  selector: 'kjsp-view-schedule',
  template: template,
  style: style,
})
export class ViewScheduleComponent extends DialogComponent {

  public constructor(
    public readonly overlayComponent: OverlayComponent,
    public readonly axis: DialogTargetAxis,
  ) {
    super(overlayComponent, axis);
  }

}