import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import SvgIcon from "../SvgIcon/SvgIcon"
import styles from "./StatisticsCurveType.module.css"

const StatisticsCurveType = ({ curve, toogleCurve, activeCurves }) => {
  const statisticsCurveTypeClass = classNames("statistics-curve-type-wrapper")
  const isActiveCurve = activeCurves.find((ac) => ac == curve.ID)

  return (
    <div className={statisticsCurveTypeClass}>
      <div
        className="d-flex mr-3 ml-2 my-2"
        style={{
          alignItems: "center",
          cursor: "pointer",
          color: `rgb(${curve.color})`,
        }}
        onClick={() => {
          toogleCurve(curve.ID)
        }}
      >
        <div
          className="mr-2"
          style={{
            backgroundColor: isActiveCurve ? `rgb(${curve.color})` : "rgb(240, 240, 247)",
            border: `1px solid rgb(${curve.color})`,
            width: 15,
            height: 15,
            borderRadius: 4,
            position: "relative",
          }}
        >
          {isActiveCurve && <SvgIcon icon="check-solid" className={styles["graph-check-icon"]} />}
        </div>
        {curve.label}
      </div>
    </div>
  )
}

StatisticsCurveType.propTypes = {}

StatisticsCurveType.defaultProps = {}

export default StatisticsCurveType
