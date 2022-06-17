import React, { useState } from "react";

export default function ExpandCollapse({ containerId }: any) {
  const [buttonText, setbuttonText] = useState("Collapse All");

  function expandCollapseAccordions(event: any) {
    event.preventDefault();

    const myElement: any = document.querySelector(`#${containerId}`);

    const getCollapsedAccordionSections =
      myElement.querySelectorAll(".collapse");

    const getCollapsedAccordionButtons =
      myElement.querySelectorAll(".accordion-button");

    if (buttonText === "Collapse All") {
      for (const getCollapsedAccordionSection of getCollapsedAccordionSections) {
        getCollapsedAccordionSection.classList.remove("show");
      }
      setbuttonText("Expand All");
      for (const getCollapsedAccordionButton of getCollapsedAccordionButtons) {
        getCollapsedAccordionButton.classList.add("collapsed");
        getCollapsedAccordionButton.ariaExpanded = false;
      }
    } else {
      for (const getCollapsedAccordionSection of getCollapsedAccordionSections) {
        getCollapsedAccordionSection.classList.add("show");
      }
      setbuttonText("Collapse All");
      for (const getCollapsedAccordionButton of getCollapsedAccordionButtons) {
        getCollapsedAccordionButton.classList.remove("collapsed");
        getCollapsedAccordionButton.ariaExpanded = true;
      }
    }
  }

  return (
    <div>
      <div>
        <button
          className=" btn btn-sm btn-info float-right mt-2 mb-2 mr-3"
          onClick={(event) => expandCollapseAccordions(event)}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
