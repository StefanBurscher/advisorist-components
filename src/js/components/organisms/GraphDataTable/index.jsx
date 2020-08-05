import PropTypes from "prop-types"
import React from "react"
import { getStatisticsObject } from "../../../constants/statistics-curves"
import { Row, Col } from "react-bootstrap"
import moment from "moment"
import dataUtils from "../../../utils/data-utils"

import styles from "./GraphDataTable.module.css"

const GraphDataTable = ({ statistics }) => {
  const TableData = () => {
    const values = Object.values(statistics)

    const renderDataRow = []

    if (values[0]) {
      for (let i = 0; i < values[0].length; i++) {
        const renderDataCol = [<Col>{moment(values[0][i].date).format("LL")}</Col>]
        for (let j = 0; j < values.length; j++) {
          if (dataUtils.getDecimalCount(values[j][i].value) > 0) {
            renderDataCol.push(<Col>{Number(values[j][i].value * 100).toFixed(0)}%</Col>)
          } else {
            renderDataCol.push(<Col>{values[j][i].value}</Col>)
          }
        }
        renderDataRow.push(
          <Row
            style={{
              background: i % 2 === 0 ? "#fff" : "rgba(226, 237, 255, 0.4)",
              margin: 0,
              padding: 10,
            }}
          >
            {renderDataCol}
          </Row>,
        )
      }
    }

    return <div>{renderDataRow}</div>
  }

  const keys = Object.keys(statistics)

  return keys.length > 0 ? (
    <div className={`${styles["graph-data-table-wrapper"]} mt-5`}>
      <Row className="subtitle-wrapper subtitle-campaigns--modifier primary-bg mx-0">
        <Col style={{ alignItems: "center", display: "flex" }}>
          <h3 className="subtitle f-size-16">Date</h3>
        </Col>
        {keys.map((statistic) => {
          const curveObject = getStatisticsObject(statistic)
          return (
            <Col style={{ alignItems: "center", display: "flex" }} key={statistic}>
              <h3 className="subtitle f-size-16">{curveObject.label}</h3>
            </Col>
          )
        })}
      </Row>
      <TableData />
    </div>
  ) : null
}

GraphDataTable.propTypes = {}

GraphDataTable.defaultProps = {}

export default GraphDataTable
