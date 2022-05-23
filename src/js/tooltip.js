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

var setToolTip = function ({ el, selector, content, forceTop = false }) {
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

  /**
   * set ids
   */
  const id = uuidv4();
  const TOOLTIP_ID = `tps-tooltip_${id}`;
  const TOOLTIP_TEXT_ID = `tps-tooltip-text_${id}`;

  /**
   * set positions
   */
  const activeTextPosition = forceTop
    ? "tps-tooltip-text-top__active"
    : "tps-tooltip-text__active";

  const textPosition = forceTop ? "tps-tooltip-text-top" : "tps-tooltip-text";

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
  tooltip.setAttribute("id", TOOLTIP_ID);
  tooltip.style.cursor = "pointer";
  tooltipText = document.createElement(elements.div);

  /**
   * add content to tooltip
   */
  tooltipText.innerText = content;
  tooltipText.classList.add(textPosition);
  tooltipText.setAttribute("id", TOOLTIP_TEXT_ID);

  /**
   * append created elements to it's parents
   */
  parent.appendChild(tooltip);
  parent.appendChild(tooltipText);

  /**
   * set on click event to icon
   */

  tooltip.addEventListener("click", (event) => {
    let element, elementText;
    if (!event.target.classList.contains("tps-tooltip__active")) {
      removeActive(forceTop);
      element = document.getElementById(TOOLTIP_ID);
      elementText = document.getElementById(TOOLTIP_TEXT_ID);
      element.classList.add("tps-tooltip__active");
      elementText.classList.add(activeTextPosition);
    } else {
      removeActive(forceTop);
    }

    if (!forceTop) {
      if (
        document
          .getElementById(id)
          .parentNode.parentNode.classList.contains("u-flex") &&
        window.matchMedia("(min-width: 1366px)").matches
      ) {
        if (
          document.getElementById(id).parentNode.parentNode.children.length > 1
        ) {
          let pw = document
            .getElementById(id)
            .parentNode.parentNode.getBoundingClientRect();
          let sp =
            document.getElementById(id).parentNode.parentNode.children[1];
          let st = sp.querySelector(".tps-tooltip-text");
          st.style = `right: ${pw.width + 20}px !important`;
        }
      }
    }
  });

  window.document.onclick = function (event) {
    if (
      !event.target.classList.contains("tps-tooltip__active") &&
      !event.target.classList.contains("tps-tooltip")
    ) {
      removeActive(forceTop);
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

function getObjects(className) {
  return Array.from(document.getElementsByClassName(className));
}
/**
 *
 * @param {to forceTop remove top position} forceTop
 */
function removeActive(forceTop) {
  getObjects("tps-tooltip__active").forEach((e) =>
    e.classList.remove("tps-tooltip__active")
  );
  getObjects(
    forceTop ? "tps-tooltip-text-top__active" : "tps-tooltip-text__active"
  ).forEach((e) =>
    e.classList.remove(
      forceTop ? "tps-tooltip-text-top__active" : "tps-tooltip-text__active"
    )
  );
}
