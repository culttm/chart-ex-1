import {Chart, registerables, TooltipItem, TooltipModel} from "chart.js";
import {Data} from "./data";
import {GradientPlugin} from "./gradient.plugin";
import {LinePlugin} from "./line.plugin";
import {TooltipExternalTop, TooltipTpl} from "./tooltip";

Chart.register(...registerables);

const baseColor = '#00C853';
const baseColorRgb = '0, 200, 83';

export const Example1 = (app: HTMLDivElement) => {
    const canvas = app.querySelector('canvas') as HTMLCanvasElement;
    const data = Data();
    const generateLabels = () => Array.from({length: data.length}, () => '');
    const pointRadius = () => Array.from({length: data.length}, (_, i) => {
        if (i === 0 || i === data.length - 1) return 2
        return 0
    });
    const labels =  generateLabels();


    const gradientPlugin = new GradientPlugin(baseColorRgb);
    const linePlugin = new LinePlugin(baseColorRgb);

    new Chart(canvas, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    borderWidth: 1,
                    borderColor: baseColor,
                    fill: true,
                    data: data.map(({ value }) => value),
                    pointBackgroundColor: baseColor,
                    hoverBackgroundColor: baseColor,
                    pointBorderWidth: 0,
                    pointHitRadius: 0,
                    pointRadius: pointRadius(),
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
                padding: 0,
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    enabled: false,
                    intersect: false,
                    axis: 'x',
                    displayColors: false,
                    backgroundColor: baseColor,
                    bodyColor: '#333',
                    bodyAlign: 'right',
                    footerColor: '#303030',
                    padding: 10,
                    cornerRadius: 4,
                    footerFont: {
                        weight: 'normal',
                        size: 10,
                    },
                    callbacks: {
                        label: (tooltipItem: TooltipItem<any>) => TooltipTpl(tooltipItem, data)
                    },
                    external: (ctx: { chart: Chart; tooltip: TooltipModel<any> }) => TooltipExternalTop(ctx)
                },
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
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
            linePlugin.getPlugin(),
        ],

    })

}
