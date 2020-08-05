import styles from "./Card.module.css"

import React from "react"

const Card = (props) => {
  const {
    children,
    color = "#fff",
    paddingLeft,
    marginTop,
    className = "",
    height,
    onClick = () => {},
    style = {},
  } = props
  return (
    <div
      onClick={onClick}
      className={`${styles["card-style"]} card-style ${className}`}
      style={{
        backgroundColor: color,
        paddingLeft,
        marginTop,
        height,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default Card
