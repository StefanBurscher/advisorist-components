import "./StatisticsCurves.scss"

import React from "react"
import StatisticsCurveType from "../StatisticsCurveType"

const StatisticsCurves = ({ curves, toogleCurve, activeCurves }) => {
  return (
    <div className="d-flex flex-wrap" style={{ margin: "0 50px" }}>
      {curves.map((curve) => (
        <StatisticsCurveType curve={curve} toogleCurve={toogleCurve} activeCurves={activeCurves} />
      ))}
    </div>
  )
}

StatisticsCurves.propTypes = {}

StatisticsCurves.defaultProps = {}

export default StatisticsCurves
