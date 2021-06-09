import { Component, CustomElement } from '../../../engines/component';
import template from './add-schedule.component.html';
import style from './add-schedule.component.scss';

@Component({
  selector: 'kjsp-add-schedule',
  template: template,
  style: style,
})
export class AddScheduleComponent extends CustomElement {}
