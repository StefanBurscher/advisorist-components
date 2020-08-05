import React from "react"

import styles from "./SvgIconRound.module.css"
import SvgIcon from "../SvgIcon/SvgIcon"

const SvgIconRound = ({ className = "", style = {}, icon, bgColor = "#fff" }) => {
  return (
    <span className={styles["round-icon"]} style={{ backgroundColor: bgColor, ...style }}>
      <SvgIcon icon={icon} className={`${styles["icon-size"]} ${className}`} />
    </span>
  )
}

export default SvgIconRound
