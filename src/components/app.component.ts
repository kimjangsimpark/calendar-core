import { Component } from '../engines/component';
import templateUrl from './app.component.html';
import styleUrl from './app.component.scss';

Component({
  elementName: 'app-component',
  template: templateUrl,
  style: styleUrl,
  extends: HTMLDivElement,
});
