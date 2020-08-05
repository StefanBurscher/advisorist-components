import "./SvgIcon.css"

import React from "react"

const SvgIcon = ({
  className = "",
  style = {},
  icon,
  tooltip = "",
  noCaret = false,
  spanClassName = "",
}) => {
  const url = "/images/icons/svgSprite/svgstore.sprite.svg"
  let classNameTooltip = tooltip && tooltip.length > 0 ? "hover-tooltip " : " "
  if (noCaret) {
    classNameTooltip += " no-tooltip-caret"
  }
  return (
    <span className={classNameTooltip + spanClassName}>
      <svg className={className} style={style}>
        <use xlinkHref={`${url}#${icon}`} />
      </svg>
      {tooltip ? <span className="tooltip">{tooltip}</span> : null}
    </span>
  )
}

export default SvgIcon
