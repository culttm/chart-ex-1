import './style.css'
// import {Corner} from "./charts/corner";
import {Example1} from "./charts/ex-1";
//
document.querySelectorAll('[data-chart]').forEach(el => Example1(el as HTMLDivElement))


// const canvas = new Corner(document.getElementById('example') as HTMLCanvasElement);

// canvas.draw();
