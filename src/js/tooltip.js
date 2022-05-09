let parent;
let tooltip;
let tooltipIcon;

/**
 * positions for element
 */
const positions = {
  relative: "relative",
  absolute: "absolute",
  fixed: "fixed",
};

/**
 * elements object
 */
const elements = {
  div: "div",
  span: "span",
};

var setToolTip = function ({ selector, content }) {
  /**
   * select patent element from dom tree
   */
  parent = document.querySelector(selector);
  parent.style.position = "relative";

  /**
   * create tooltip and position it
   */
  tooltip = document.createElement(elements.div);
  tooltip.classList.add("tps-tooltip");
  tooltip.style.left = "95%";
  tooltip.style.cursor = "pointer";
  tooltipIcon = document.createElement(elements.div);

  tooltipIcon.innerText = content;
  tooltipIcon.classList.add("tps-tooltip__text");

  tooltip.appendChild(tooltipIcon);
  parent.appendChild(tooltip);

  /**
   * set on click event to icon
   */
  tooltip.onclick = function () {
    const { left } = parent.getBoundingClientRect().toJSON();

    /**
     * check it tooltip is active (contains a active class)
     * if not add it
     * else remove it
     */

    if (!this.classList.contains("active")) {
      this.classList.add("active");
    }

    let tooltipTextWidth = tooltipIcon.offsetWidth;
    let widthWithPadding = tooltipTextWidth + 16;
    let parentWidth = parent.offsetWidth;

    let leftSpace = left;

    if (leftSpace > widthWithPadding) {
      tooltipIcon.classList.add("tps-tooltip--left");
      tooltipIcon.style.left = `-${parentWidth + tooltipTextWidth}px`;
      tooltipIcon.style.top = `-5px`;
    } else {
      tooltipIcon.classList.add("tps-tooltip--top");
      tooltipIcon.style.width = `${320}px`;
    }
  };

  return parent;
};

document.onclick = function (event) {
  let tooltip = document.querySelector(".tps-tooltip");

  if (event.target.classList.contains("tps-tooltip")) {
    return false;
  }

  if (tooltip.classList.contains("active")) {
    tooltip.classList.remove("active");
  }
};
