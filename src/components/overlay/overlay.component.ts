import { Component, CustomElement } from '../../engines/component';
import template from './overlay.component.html';
import style from './overlay.component.scss';

@Component({
  selector: 'kjsp-overlay',
  template: template,
  style: style,
})
export class OverlayComponent extends CustomElement {}
