import PropTypes from "prop-types"
import React from "react"

import SvgIcon from "../SvgIcon/SvgIcon"
import styles from "./MasterLoginAddItem.module.css"

const MasterLoginAddItem = ({ onClick, text }) => {
  return (
    <div className={styles["master-login-add-item-wrapper"]} onClick={onClick}>
      <span className="icon-circle" style={{ backgroundColor: "#fff", height: 42 }}>
        <SvgIcon icon="plus-solid" className="svg-icon info-icon master-login-add" />
      </span>
      <span className="master-login-add-acc">{text}</span>
    </div>
  )
}

MasterLoginAddItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
}

MasterLoginAddItem.defaultProps = {}

export default MasterLoginAddItem
