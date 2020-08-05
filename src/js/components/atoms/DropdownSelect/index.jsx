import React, { useState } from "react"
import { FormControl } from "react-bootstrap"

import styles from "./DropdownSelect.module.css"

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy, small, noSearch }, ref) => {
    const [value, setValue] = useState("")
    const realStyle = { ...style, ...(small ? { minWidth: 0 } : {}) }

    const handleChange = (e) => {
      setValue(e.target.value.toLowerCase().trim())
    }

    return (
      <div style={realStyle} className={className} aria-labelledby={labeledBy} ref={ref}>
        {!noSearch && (
          <FormControl
            autoFocus
            className={`mx-3 my-2 ${styles["custom-dropdown-toogle"]}`}
            placeholder="Type to filter..."
            onChange={handleChange}
            value={value}
          />
        )}
        <ul className="list-unstyled" style={{ maxHeight: 250, overflow: "auto" }}>
          {React.Children.toArray(children).filter(
            (child) => !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    )
  },
)

export default CustomMenu
