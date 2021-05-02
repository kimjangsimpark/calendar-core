import { Component } from '../engines/component';
import templateUrl from './second.component.html';

Component({
  elementName: 'second-component',
  template: templateUrl,
  extends: HTMLDivElement,
});
