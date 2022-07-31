import {Chart, registerables} from "chart.js";
import {Data} from "./data";
import {GradientPlugin} from "./gradient.plugin";
import { LinePlugin } from './line.plugin'
Chart.register(...registerables);


const baseColor = '#00C853';
const baseColorRgb = '0, 200, 83';

const linePlugin = new LinePlugin(baseColorRgb);

export const Example1 = (app: HTMLDivElement) => {
    const canvas = app.querySelector('canvas') as HTMLCanvasElement;
    const data = Data();
    const pointRadius = () => Array.from({length: data.length}, (_, i) => {
        if (i === 0 || i === data.length - 1) return 2
        return 0
    });

    const gradientPlugin = new GradientPlugin(baseColorRgb);
    const pointRadiusValue = pointRadius();

    new Chart(canvas, {
        type: 'line',
        data: {
            labels: data.map(({ date }) => date),
            datasets: [
                {
                    borderWidth: 0.5,
                    borderColor: baseColor,
                    fill: true,
                    data: data.map(({ value }) => value),
                    pointBackgroundColor: baseColor,
                    hoverBackgroundColor: baseColor,
                    pointRadius: pointRadiusValue,
                    pointBorderWidth: 0,
                    pointHitRadius: 0,
                    pointHoverRadius: 3,
                    hoverBorderWidth: 0,
                    tension: 0,
                    spanGaps: false
                }
            ],
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 42,
                    left: 12,
                    right: 12,
                    bottom: 0
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    enabled: false,
                },
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false,
                },
            },
            responsive: true,
            interaction: {
                intersect: false,
                mode: 'index',
            }
        },
        plugins: [
            gradientPlugin.getPlugin(),
            linePlugin.getPlugin()
        ],

    })

}
