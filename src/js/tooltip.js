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
   * create
   */
  tooltip = document.createElement(elements.div);
  tooltip.classList.add("tps-tooltip");
  tooltip.style.left = "95%";
  tooltip.style.cursor = "pointer";
  tooltipIcon = document.createElement(elements.span);

  tooltipIcon.innerText = content;
  tooltipIcon.classList.add("tps-tooltip__text");

  tooltip.appendChild(tooltipIcon);
  parent.appendChild(tooltip);

  /**
   * set on click event to icon
   */
  tooltip.onclick = function () {
    const { right, left } = parent.getBoundingClientRect().toJSON();

    if (this.classList.contains("active")) {
      this.classList.remove("active");
    } else {
      this.classList.add("active");
    }

    const max = Object.keys({ left, right }).reduce(function (a, b) {
      return { left, right }[a] > { left, right }[b] ? a : b;
    });

    switch (max) {
      case "right":
        tooltipIcon.classList.add("tps-tooltip--right");
        break;
      case "left":
        tooltipIcon.classList.add("tps-tooltip--left");
        break;
    }
  };

  return parent;
};
