import './style.css'
import { ChartApp } from "./charts/chart";

document.querySelectorAll('[data-chart]').forEach(el => ChartApp(el as HTMLDivElement))
