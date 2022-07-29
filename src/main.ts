import './style.css'
import {Example1} from "./charts/ex-1";

document.querySelectorAll('[data-chart]').forEach(el => Example1(el as HTMLDivElement))
