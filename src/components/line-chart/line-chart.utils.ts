/* eslint-disable no-unused-vars */
import { createSeparatorsNumber } from '../../utils/fn';

/**
 * Creating the tooltip DOM element
 */
export const getOrCreateTooltip = (chart: {
  canvas: {
    parentNode: {
      querySelector: (arg0: string) => HTMLElement;
      appendChild: (arg0: HTMLElement) => void;
    };
  };
}) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
    tooltipEl.style.borderRadius = '3px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = '1';
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';

    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

/**
 * logic handler to display created tooltip label on chart
 * on the cursor point hovered
 */
export const externalTooltipHandler = (context: {
  chart: any;
  tooltip: any;
}) => {
  const { chart, tooltip } = context;

  const tooltipEl = getOrCreateTooltip(chart);

  /**
   * on blur opacity set to 0
   */
  if (+tooltip.opacity === 0) {
    tooltipEl.style.opacity = '0';
    return;
  }

  const tableRoot = tooltipEl.querySelector('table');

  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map((b: { lines: any }) => b.lines);
    const tooltipHead = document.createElement('thead');

    /**
     * Setting the title text
     */
    titleLines.forEach((title: string) => {
      const titleLine = document.createElement('tr');

      const text = document.createElement('td');
      text.textContent = title;

      titleLine.className = 'tooltip__title';

      titleLine.appendChild(text);
      tooltipHead.appendChild(titleLine);
    });

    /**
     * Setting the body rows
     */
    const tooltipBody = document.createElement('tbody');
    tooltipBody.className = 'tooltip__body';

    tooltip.beforeBody.forEach((_: string, i: number) => {
      const bodyLine = document.createElement('tr');
      const label = document.createElement('td');
      const value = document.createElement('td');

      const valueLabel = bodyLines[0] || 0;

      label.append(`${tooltip.beforeBody[i]}: `);

      value.append(`${createSeparatorsNumber(valueLabel[i])}`);

      bodyLine.style.color = '#000000';

      bodyLine.appendChild(label);
      bodyLine.appendChild(value);
      tooltipBody.appendChild(bodyLine);
    });

    while (tableRoot?.firstChild) {
      tableRoot.firstChild.remove();
    }

    tableRoot?.appendChild(tooltipHead);
    tableRoot?.appendChild(tooltipBody);
  }

  /**
   * Setting the coordinates
   * to display the tooltip at
   */
  const { offsetLeft: positionX } = chart.canvas;

  tooltipEl.className = 'tooltip';
  tooltipEl.style.opacity = '1';
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = tooltip.caretY + 325 + 'px';
};
