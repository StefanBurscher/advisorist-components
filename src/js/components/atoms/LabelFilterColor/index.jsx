import PropTypes from "prop-types"
import React from "react"

import SvgIcon from "../SvgIcon/SvgIcon"
import styles from "./LabelFilterColor.module.css"

const LabelFilterColor = ({ color, tag, active, onClick, id }) => {
  return (
    <div
      className={styles["label-filter-color-wrapper"]}
      onClick={() => {
        onClick(id)
      }}
    >
      <div
        className={styles["label-color"]}
        style={{
          backgroundColor: color,
        }}
      >
        {active && (
          <SvgIcon
            icon="checked"
            className={`info-icon p-0 ${styles["create-tag-icon-selected"]}`}
          />
        )}
      </div>
      <span>{tag}</span>
    </div>
  )
}

LabelFilterColor.propTypes = {
  color: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  active: PropTypes.bool,
}

LabelFilterColor.defaultProps = {
  active: false,
}

export default LabelFilterColor
