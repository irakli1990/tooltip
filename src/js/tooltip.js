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

var setToolTip = function ({ el, selector, content }) {
  /**
   * check if there is any selector or element
   */
  if (!el && !selector) {
    throw new Error("either el or selector option should be specified");
  }

  /**
   * select patent element from dom tree
   */
  if (el) {
    parent = el;
  } else {
    parent = document.querySelector(selector);
  }
  parent.style.position = "relative";

  parent = document.querySelector(selector);
  parent.style.position = "relative";

  /**
   * create tooltip and tooltipIconText
   */
  tooltip = document.createElement(elements.div);
  tooltipIcon = document.createElement(elements.span);

  /**
   * calculate parent total width
   * for initial tooltip
   */
  let parentWidth = parent.offsetWidth;
  let totalWidth = parentWidth + 225;

  /**
   * assign styles to tooltip
   */
  tooltip.classList.add("tps-tooltip");
  tooltip.style.cursor = "pointer";
  tooltip.style.left = `${parentWidth - 20}px`;

  /**
   * add content to tooltip
   */
  tooltipIcon.innerText = content;
  tooltipIcon.classList.add("tps-tooltip__text");

  /**
   * get parents left space
   */
  const { left } = parent.getBoundingClientRect().toJSON();

  /**
   * decide where to show tooltip
   */
  if (left > 225) {
    tooltipIcon.classList.add("tps-tooltip--left");
    tooltipIcon.style.left = `-${totalWidth}px`;
    tooltipIcon.style.top = `-5px`;
  } else {
    tooltipIcon.style.removeProperty("width");
    tooltipIcon.classList.add("tps-tooltip--top");
    tooltipIcon.style.width = `${320}px`;
  }

  /**
   * append created elements to it's parents
   */
  tooltip.appendChild(tooltipIcon);
  parent.appendChild(tooltip);

  /**
   * set on click event to icon
   */

  tooltip.addEventListener("click", (event) => {
    if (!event.target.classList.contains("tps-tooltip__active")) {
      event.target.classList.add("tps-tooltip__active");
    } else {
      event.target.classList.remove("tps-tooltip__active");
    }
  });

  return parent;
};

document.onclick = function (event) {
  event.preventDefault();
  let activeObjects = Array.from(
    document.getElementsByClassName("tps-tooltip__active")
  );

  console.log(activeObjects);
  let activeCount = activeObjects.length;

  if (event.target.classList.contains("tps-tooltip") && activeCount == 1) {
    return false;
  } else if (
    event.target.classList.contains("tps-tooltip") &&
    activeCount > 1
  ) {
    activeObjects.forEach((element) =>
      element.classList.remove("tps-tooltip__active")
    );
    event.target.classList.add("tps-tooltip__active");
  }

  activeObjects.forEach((element) =>
    element.classList.remove("tps-tooltip__active")
  );
};
