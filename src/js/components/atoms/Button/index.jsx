import PropTypes from "prop-types"
import classNames from "classnames/bind"
import React from "react"
import { Spinner } from "react-bootstrap"

import SvgIconRound from "../SvgIconRound/SvgIconRound"
import styles from "./Button.module.css"

const cx = classNames.bind(styles)

const Button = (props) => {
  const {
    type,
    children,
    onClick,
    active = true,
    margin,
    padding,
    variant,
    loading,
    disabled,
    small,
    big,
    border,
    className,
    center,
    icon,
    borderRadius,
    color,
    fontSize,
  } = props

  const onButtonClick = (e) => {
    if (!loading) {
      onClick(e)
    }
  }

  const buttonClassnames = cx("btn", {
    "btn-danger": variant === "danger",
    "dark-btn": variant === "dark",
    "transparent-btn": variant === "transparent", //
    "image-personalization-btn": variant === "personalization",
    "small-btn": small,
    "big-btn": big,
    "border-btn": border,
  })

  const buttonStyle = { margin, borderRadius }
  if (padding) {
    buttonStyle.padding = padding
  }

  const buttonTextStyle = {}
  if (color) {
    buttonTextStyle.color = color
  }
  if (fontSize) {
    buttonTextStyle.fontSize = fontSize
  }

  let additionalClasses = ` ${className} btn `
  if (variant === "primary") {
    additionalClasses += "primary-bg "
  }

  if (variant === "secondary") {
    if (active) {
      additionalClasses += "highlight-bg "
    } else {
      additionalClasses += "buttons-tab "
    }
  }

  if (variant === "personalization") {
    additionalClasses += "image-personalization-btn "
  }

  if (variant === "transparent") {
    additionalClasses += "transparent-btn "
  }

  if (center) {
    additionalClasses += "m-auto d-block"
  }

  return (
    <button
      onClick={onButtonClick}
      className={buttonClassnames + additionalClasses}
      disabled={disabled || loading}
      style={buttonStyle}
      type={type}
    >
      {icon && (
        <SvgIconRound
          style={{ marginRight: 12, border: "2px solid #fff" }}
          icon={icon}
          className="create-campaign-icon"
          bgColor="transparent"
        />
      )}
      <span className={styles["button-text"] + " button-text"} style={buttonTextStyle}>
        {loading ? (
          <Spinner animation="border" role="status" className="m-auto d-block" />
        ) : (
          children
        )}
      </span>
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  center: PropTypes.bool,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "dark",
    "danger",
    "transparent",
    "personalization",
  ]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  big: PropTypes.bool,
  border: PropTypes.bool,
  icon: PropTypes.string,
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  fontSize: PropTypes.number,
  type: PropTypes.string,
}

Button.defaultProps = {
  className: "",
  onClick: () => {},
  center: false,
  active: true,
  margin: "0 0 0 0",
  padding: undefined,
  variant: "primary",
  loading: false,
  disabled: false,
  small: false,
  big: false,
  border: false,
  icon: "",
  borderRadius: 50,
  color: undefined,
  fontSize: undefined,
  type: "submit",
}

export default Button
