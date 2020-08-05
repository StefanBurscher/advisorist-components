import React from "react"

import styles from "./DropdownToggle.module.css"

const CustomToggle = React.forwardRef(({ children, onClick, style }, ref) => {
  const handleClick = (e) => {
    e.preventDefault()
    onClick(e)
  }

  return (
    <span
      className={`d-flex align-items-center dropdown-select-toggle ${styles["dropdown-select-toggle"]}`}
      onClick={handleClick}
      style={style}
      ref={ref}
    >
      {children}
    </span>
  )
})

export default CustomToggle
