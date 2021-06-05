import 'reflect-metadata';
import './components/index.component';
import { IndexComponent } from './components/index.component';
export const root = document.getElementById('root') as HTMLDivElement;

const element = document.createElement('kjsp-index') as IndexComponent;
root.appendChild(element);

element.setAttribute('year', '1994');
element.setAttribute('month', '8');

element.addEventListener('yearAndMonthChange', (e) => {
  console.log(e);
});

console.log(element);
