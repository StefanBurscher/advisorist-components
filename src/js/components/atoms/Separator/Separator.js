import React from "react"
import { Link } from "react-router-dom"

import SvgIcon from "../SvgIcon/SvgIcon"
import styles from "./Separator.module.css"

const Separator = (props) => {
  const {
    text,
    color,
    subText,
    icon,
    link = null,
    className = null,
    iconSize = 15,
    iconClassName = "",
  } = props
  return (
    <div>
      <div className="d-flex">
        {icon && (
          <span className="icon-circle">
            <SvgIcon
              icon={icon}
              className={`svg-icon info-icon ${iconClassName}`}
              style={{ width: iconSize, height: iconSize }}
            />
          </span>
        )}
        <div className={`w-100 align-self-center ${icon ? "ml-3" : ""}`}>
          <div className="d-flex">
            <span className={`${styles["separator-text"]} highlight-color`} style={{ color }}>
              {link ? (
                <Link to={link}>
                  <h2>{text}</h2>
                </Link>
              ) : (
                <h2>{text}</h2>
              )}
            </span>
          </div>
        </div>
      </div>
      {subText && (
        <span
          className={`highlight-color ${
            className
              ? `${styles["separator-subtext"]} ${className}`
              : `${styles["separator-subtext"]}`
          }`}
          style={{ color }}
        >
          {subText}
        </span>
      )}
    </div>
  )
}

export default Separator
