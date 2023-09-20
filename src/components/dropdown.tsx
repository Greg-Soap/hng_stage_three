"use client";
import React, { useState } from "react";
function DropdownToggler({ children, lead }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="dropdown">
      <button className="dropdown toggler" onClick={toggleDropdown}>
        <a>{lead}</a>
      </button>
      {isOpen && <>{children}</>}
    </li>
  );
}

function DropdownOptions({ children }: any) {
  return <ul className="dropdown-menu show">{children}</ul>;
}

export { DropdownToggler, DropdownOptions };
