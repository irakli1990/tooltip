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

  /**
   * create tooltip and tooltipIconText
   */
  tooltip = document.createElement(elements.div);
  tooltipIcon = document.createElement(elements.span);

  /**
   * assign styles to tooltip
   */
  tooltip = document.createElement(elements.div);
  tooltip.classList.add("tps-tooltip");
  // tooltip.style.left = "95%";
  tooltip.style.cursor = "pointer";
  tooltipIcon = document.createElement(elements.div);

  /**
   * add content to tooltip
   */
  tooltipIcon.innerText = content;
  tooltipIcon.classList.add("tps-tooltip__text");

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
