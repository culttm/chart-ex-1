import {Chart, registerables, TooltipItem, TooltipModel} from "chart.js";
import {Data} from "./data";

Chart.register(...registerables);

const baseColor = '#00C853';
const baseColorRgb = '0, 200, 83';

export const Example1 = (app: HTMLCanvasElement) => {
    const data = Data();
    const generateLabels = () => Array.from({length: data.length}, () => '');
    const pointRadius = () => Array.from({length: data.length}, (_, i) => {
        if (i === 0 || i === data.length - 1) return 2
        return 0
    });
    const labels =  generateLabels();

    new Chart(app, {
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
                        label(tooltipItem: TooltipItem<any>): string | string[] {
                            const currentElement = data.find(({ value }) => parseInt(tooltipItem.parsed.y) === value);
                            return `
                                <div class="custom-tooltip">
                                    <div class="price">
                                        $${currentElement?.value}
                                    </div>
                                    <div class="date">
                                        ${currentElement?.date.toISOString().slice(0, 10)}
                                    </div>
                                </div>
                            ` ?? ''
                        },
                    },
                    external(context: { chart: Chart; tooltip: TooltipModel<any> }) {
                        const tId = 'custom-tooltip';
                        let tooltipEl = document?.querySelector(`#${tId}`) as HTMLDivElement;
                        const position = context.chart.canvas.getBoundingClientRect();
                        const tooltipModel = context.tooltip;

                        const showTooltip = () => {
                            tooltipEl.style.opacity = '1';
                            tooltipEl.style.visibility = 'visible';
                        }

                        const hideTooltip = () => {
                            tooltipEl.style.opacity = '0';
                            tooltipEl.style.visibility = 'hidden';
                        }

                        if (!tooltipEl) {
                            tooltipEl = document.createElement('div');
                            tooltipEl.id = tId;
                            tooltipEl.innerHTML += '<div data-tooltop-root></div>';
                            document.body.appendChild(tooltipEl);
                        }

                        if (tooltipModel.opacity === 0) {
                            hideTooltip();
                            return;
                        }

                        if (tooltipModel.body) {
                            let innerHtml = '';
                            const titleLines = tooltipModel.title || [];
                            const bodyLines = tooltipModel.body.map((bodyItem) => bodyItem?.lines ?? '');
                            titleLines.forEach((title) => innerHtml += title);
                            bodyLines.forEach((body) => innerHtml += body);
                            let tooltipRoot = tooltipEl.querySelector('[data-tooltop-root]') as HTMLDivElement;
                            tooltipRoot.innerHTML = innerHtml;
                        }

                        showTooltip();

                        tooltipEl.querySelector('.price')?.addEventListener('click', alert)

                        tooltipEl.style.opacity = '1';
                        tooltipEl.style.position = 'absolute';
                        tooltipEl.style.left = position.left + window.scrollX + tooltipModel.caretX + 'px';
                        tooltipEl.style.top = position.top + window.scrollY + tooltipModel.caretY + 'px';
                        tooltipEl.style.pointerEvents = 'none';
                    }
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
            {
                id: "responsiveGradient",
                afterLayout: (chart: Chart) => {
                    const scales = chart.scales;
                    const color = chart.ctx.createLinearGradient(0, scales["y"].top,0, scales["y"].bottom);
                    color.addColorStop(0.6, "rgba(" + baseColorRgb + ", 0.1)");
                    color.addColorStop(1, "rgba(" + baseColorRgb + ", 0)");
                    chart.data.datasets[0].backgroundColor = color;
                },
            },
            {
                id: 'drawLineVertical',
                beforeDraw(chart: Chart) {

                    if (!chart.tooltip?.getActiveElements().length) {
                        return;
                    }
                    const x = chart.tooltip.getActiveElements()[0].element.x;

                    if (!x) {
                        return;
                    }

                    const yAxis = chart.scales.y;
                    const ctx = chart.ctx;

                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(x, yAxis.top);
                    ctx.lineTo(x, yAxis.bottom);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = 'rgba('+ baseColorRgb +',0.40)';
                    ctx.stroke();
                    ctx.restore();
                }
            }
        ],

    })

}
