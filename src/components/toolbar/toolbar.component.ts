import { Component } from '../../engines/component';
import template from './toolbar.component.html';
import style from './toolbar.component.scss';

@Component({
  selector: 'kjsp-toolbar',
  template: template,
  style: style,
})
export class ToolbarComponent extends HTMLElement {}
