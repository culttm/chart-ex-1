import {Chart, registerables} from "chart.js";
import { generateData } from "./data";
import {GradientPlugin} from "./gradient.plugin";
import { CustomTooltipPlugin } from './custom-tooltip.plugin'
import { FooterPlugin } from './footer.plugin'
import {themes} from "./theme";
import {hex2rgba} from "./hex2rgba";
Chart.register(...registerables);


export const Example1 = (app: HTMLDivElement) => {
    const canvas = app.querySelector('canvas') as HTMLCanvasElement;


    // TODO -------
    const randomNumber = ~~(Math.random() * 3);
    const currentTheme = Object.values(themes)[randomNumber];
    // TODO -------

    const customTooltip = new CustomTooltipPlugin(currentTheme, '$ __VALUE__');
    const footerPlugin = new FooterPlugin(currentTheme);
    const gradientPlugin = new GradientPlugin(currentTheme);

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
                    borderColor: hex2rgba(currentTheme.baseColor),
                    fill: true,
                    data: data.map(({ value }) => value),
                    pointBackgroundColor: hex2rgba(currentTheme.baseColor),
                    hoverBackgroundColor: hex2rgba(currentTheme.baseColor),
                    pointRadius: pointRadiusValue,
                    pointBorderWidth: 0,
                    pointHitRadius: 0,
                    pointHoverRadius: 3,
                    hoverBorderWidth: 0,
                    tension: 0,
                    spanGaps: false,
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
            },
        },
        plugins: [
            gradientPlugin.getPlugin(),
            customTooltip.getPlugin(),
            footerPlugin.getPlugin()
        ],

    })

}
