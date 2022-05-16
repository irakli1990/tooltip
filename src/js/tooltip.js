/**
 * @author Irakli Kardava
 * @email iraklikardawa@gmail.com
 * https://github.com/irakli1990
 *
 */

let parent;
let tooltip;
let tooltipText;

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
  parent.classList.add("has-tooltip");

  let oldTooltips = parent.querySelectorAll(".tps-tooltip, .tps-tooltip-text");
  for (let oldTooltip of oldTooltips) {
    oldTooltip.remove();
  }

  const id = uuidv4();

  parent.setAttribute("id", id);

  /**
   * create tooltip and tooltipIconText
   */
  tooltip = document.createElement(elements.div);
  tooltipText = document.createElement(elements.span);

  /**
   * assign styles to tooltip
   */
  tooltip = document.createElement(elements.div);
  tooltip.classList.add("tps-tooltip");
  tooltip.setAttribute("id", `tooltip_${id}`);
  tooltip.style.cursor = "pointer";
  tooltipText = document.createElement(elements.div);

  /**
   * add content to tooltip
   */
  tooltipText.innerText = content;
  tooltipText.classList.add("tps-tooltip-text");
  tooltipText.setAttribute("id", `tooltip_text_${id}`);

  /**
   * append created elements to it's parents
   */
  parent.appendChild(tooltip);
  parent.appendChild(tooltipText);

  /**
   * set on click event to icon
   */

  const selectedToolTipText = document.getElementById(id).lastChild;

  tooltip.addEventListener("click", (event) => {
    let parentWidth = document.getElementById(id).offsetWidth;
    let childWidth = selectedToolTipText.offsetWidth;

    let activeObjects = Array.from(
      document.getElementsByClassName("tps-tooltip__active")
    );

    let activeObjectsTexts = Array.from(
      document.getElementsByClassName("tps-tooltip-text__active")
    );

    if (!window.matchMedia("(min-width: 1366px)").matches) {
      if (parentWidth < childWidth) {
        selectedToolTipText.classList.add("tps-tooltip-text__shrink");
      }
    } else {
      selectedToolTipText.classList.remove("tps-tooltip-text__shrink");
    }
    let activeCount = activeObjects.length;
    if (
      !event.target.classList.contains("tps-tooltip__active") &&
      activeCount == 0
    ) {
      event.target.classList.add("tps-tooltip__active");
      selectedToolTipText.classList.add("tps-tooltip-text__active");
      if (
        document
          .getElementById(id)
          .parentNode.parentNode.classList.contains("u-flex") &&
        window.matchMedia("(min-width: 1366px)").matches
      ) {
        if (
          document.getElementById(id).parentNode.parentNode.children.length > 1
        ) {
          let aW = document
            .getElementById(id)
            .parentNode.parentNode.getBoundingClientRect();
          let sR =
            document.getElementById(id).parentNode.parentNode.children[1];
          let sRt = sR.querySelector(".tps-tooltip-text");
          sRt.style = `right: ${aW.width + 20}px !important`;
        }
      }
    } else {
      activeObjects.forEach((element) =>
        element.classList.remove("tps-tooltip__active")
      );

      activeObjectsTexts.forEach((element) =>
        element.classList.remove("tps-tooltip-text__active")
      );

      event.target.classList.add("tps-tooltip__active");

      document
        .getElementById(`tooltip_text_${id}`)
        .classList.add("tps-tooltip-text__active");

      if (
        document
          .getElementById(id)
          .parentNode.parentNode.classList.contains("u-flex") &&
        window.matchMedia("(min-width: 1366px)").matches
      ) {
        if (
          document.getElementById(id).parentNode.parentNode.children.length > 1
        ) {
          let aW = document
            .getElementById(id)
            .parentNode.parentNode.getBoundingClientRect();
          let sR =
            document.getElementById(id).parentNode.parentNode.children[1];
          let sRt = sR.querySelector(".tps-tooltip-text");
          sRt.style = `right: ${aW.width + 20}px !important`;
        }
      }
    }
  });

  window.document.onclick = function (event) {
    let activeObjects = Array.from(
      document.getElementsByClassName("tps-tooltip__active")
    );

    let activeObjectsTexts = Array.from(
      document.getElementsByClassName("tps-tooltip-text__active")
    );

    if (event.target.classList.contains("tps-tooltip")) {
      return;
    } else {
      activeObjects.forEach((element) =>
        element.classList.remove("tps-tooltip__active")
      );

      activeObjectsTexts.forEach((element) =>
        element.classList.remove("tps-tooltip-text__active")
      );
    }
  };
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
