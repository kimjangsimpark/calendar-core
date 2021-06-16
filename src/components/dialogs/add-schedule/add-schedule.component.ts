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
      .getElementById('close')
      .addEventListener('click', this.onCloseClicked.bind(this));

    this.shadowRoot
      .getElementById('submit')
      .addEventListener('click', this.onSubmitClicked.bind(this));

    const $allDay = this.shadowRoot.getElementById('allDay') as HTMLInputElement;
    $allDay.addEventListener(
      'click', 
      this.onAllDayClicked.bind(
        this, 
        $allDay
      )
    );
  }

  public onAllDayClicked(
    $allDay: HTMLInputElement,
  ): void {
    const $startDate = this.shadowRoot.getElementById('startDate') as HTMLInputElement;
    const $endDate = this.shadowRoot.getElementById('endDate') as HTMLInputElement;
    $startDate.type = $allDay.checked ? 'date' : 'datetime-local';
    $endDate.type = $allDay.checked ? 'date' : 'datetime-local';
  }

  public onCloseClicked(): void {
    this.overlayComponent.clear();
  }

  public onSubmitClicked(): void {
    this.overlayComponent.clear();
  }
}
