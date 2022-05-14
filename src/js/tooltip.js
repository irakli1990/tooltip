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

  const id = uuidv4();

  parent.setAttribute("id", id);

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
  tooltipIcon.classList.add("tps-tooltip-text");

  /**
   * append created elements to it's parents
   */
  parent.appendChild(tooltip);
  parent.appendChild(tooltipIcon);

  /**
   * set on click event to icon
   */

  tooltip.addEventListener("click", (event) => {
    let parentWidth = document.getElementById(id).offsetWidth;
    let childWidth = document.getElementById(id).lastChild.offsetWidth;

    if (!window.matchMedia("(min-width: 1366px)").matches) {
      if (parentWidth < childWidth) {
        document
          .getElementById(id)
          .lastChild.classList.add("tps-tooltip-text__shrink");
      }
    } else {
      document
        .getElementById(id)
        .lastChild.classList.remove("tps-tooltip-text__shrink");
    }

    if (!event.target.classList.contains("tps-tooltip__active")) {
      event.target.classList.add("tps-tooltip__active");
      document
        .getElementById(id)
        .lastChild.classList.add("tps-tooltip-text__active");
    } else {
      event.target.classList.remove("tps-tooltip__active");
      document
        .getElementById(id)
        .lastChild.classList.remove("tps-tooltip-text__active");
    }
  });

  window.document.onclick = function (event) {
    let activeObjects = Array.from(
      document.getElementsByClassName("tps-tooltip__active")
    );

    let activeObjectsTexts = Array.from(
      document.getElementsByClassName("tps-tooltip-text__active")
    );
    let activeCount = activeObjects.length;

    if (event.target.classList.contains("onoffswitch")) return;

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

    activeObjectsTexts.forEach((element) =>
      element.classList.remove("tps-tooltip-text__active")
    );
  };

  // return parent;
};

/**
 *
 * @returns uuid for parent element id assignment
 */
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
