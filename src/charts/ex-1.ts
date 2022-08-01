import {Chart, registerables} from "chart.js";
import { generateData } from "./data";
import {GradientPlugin} from "./gradient.plugin";
import { CustomTooltipPlugin } from './custom-tooltip.plugin'
import { FooterPlugin } from './footer.plugin'
Chart.register(...registerables);


const baseColor = 'rgba(0, 200, 83, 1)';
const baseColorRgb = '0, 200, 83';
const customTooltip = new CustomTooltipPlugin(baseColorRgb, '$');
const gradientPlugin = new GradientPlugin(baseColorRgb);
const footerPlugin = new FooterPlugin('$');


export const Example1 = (app: HTMLDivElement) => {
    const canvas = app.querySelector('canvas') as HTMLCanvasElement;

    const data = generateData();

    const pointRadius = () => Array.from({length: data.length}, (_, i) => {
        if (i === 0 || i === data.length - 1) return 2
        return 0
    });
    const pointRadiusValue = pointRadius();

    new Chart(canvas, {
        type: 'line',
        data: {
            labels: data.map(({ date }) => date),
            datasets: [
                {
                    borderWidth: 1,
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
                    bottom: 32
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
            customTooltip.getPlugin(),
            footerPlugin.getPlugin()
        ],

    })

}
