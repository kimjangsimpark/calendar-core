import { root } from '../main';
import templateUrl from './module.html';
import styleUrl from './module.scss';

(async () => {
  try {
    const templateResponse = await fetch(templateUrl);
    const template = await templateResponse.text();
    root.innerHTML += template;

    const styleResponse = await fetch(styleUrl);
    const style = await styleResponse.text();
    root.innerHTML += `<style>${style}<style>`;
  } catch (e) {
    console.error(e);
  }
})().catch((error) => {
  console.error(error);
});
