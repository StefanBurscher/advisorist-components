import "react-dates/initialize"
import "react-dates/lib/css/_datepicker.css"
import "./GraphCard.scss"

import classNames from "classnames"
import React, { useState } from "react"
import Card from "../../atoms/Card/Card"
import { DateRangePicker } from "react-dates"
import StatisticsCurves from "../../atoms/StatisticsCurves"
import Plot from "react-plotly.js"
import Button from "../../atoms/Button"
import Plotly from "plotly.js"
import { getStatisticsObject } from "../../../constants/statistics-curves"
import { PDFDownloadLink, Text, StyleSheet } from "@react-pdf/renderer"
import { Page, View, Document, Image } from "@react-pdf/renderer"
import moment from "moment"
import { Dropdown } from "react-bootstrap"
import CustomToggle from "../../atoms/DropdownToggle"
import CustomMenu from "../../atoms/DropdownSelect"
import dataUtils from "../../../utils/data-utils"
import { START_DATE, END_DATE } from "react-dates/constants"

const graphLayout = {
  showlegend: false,
  autosize: true,
  dragmode: "pan",
  margin: { b: "60", t: "40" },
  yaxis: {
    fixedrange: true,
  },
}
const graphStyle = { width: "100%", height: "100%" }

const GraphCard = ({
  timeState,
  onDatesChange,
  setFocusedInput,
  statistics,
  curves,
  toogleCurve,
  activeCurves,
  fullName,
  allCampaigns,
  selectedCampaign,
  setSelectedCampaign,
  query,
  accountID,
  activeUserID,
}) => {
  const prepareGraphData = (data) => {
    return Object.keys(data).map((statistic) => {
      const curveObject = getStatisticsObject(statistic)
      const x = []
      const y = []
      data[statistic].forEach(({ date, value }) => {
        let formatedValue = value
        if (dataUtils.getDecimalCount(value) > 0) {
          formatedValue = Number(value * 100).toFixed(0)
        }
        x.push(date)
        y.push(formatedValue)
      })

      return {
        x,
        y,
        type: "scatter",
        mode: "lines",
        name: curveObject.label,
        line: {
          shape: "spline",
          color: `rgba(${curveObject.color}, 1)`,
          width: 2,
        },
        fill: "tozeroy",
        fillcolor: `rgba(${curveObject.color}, 0.3)`,
      }
    })
  }

  const graphData = prepareGraphData(statistics)

  const [image, setImage] = useState(null)

  const allCampaignsOptions = [{ value: 0, name: "All campaigns" }]
  allCampaigns.forEach(({ id, name }) => {
    allCampaignsOptions.push({ value: id, name })
  })

  let isOutsideRange = (day) => day >= moment()
  if (timeState.startDate) {
    isOutsideRange = (day) =>
      day >= moment() ||
      (timeState.focusedInput === START_DATE &&
        day.isBefore(timeState.endDate.clone().subtract(365, "days"))) ||
      (timeState.focusedInput === END_DATE &&
        day.isAfter(timeState.startDate.clone().add(365, "days")))
  }

  return (
    <Card>
      <div className="d-flex" style={{ justifyContent: "space-between" }}>
        <div
          style={{
            marginLeft: 50,
            color: "rgba(77, 79, 92, 1)",
            fontSize: 19,
            display: "flex",
            alignItems: "center",
          }}
        >
          Reports
        </div>
        <div className="d-flex" style={{ alignItems: "center", justifyContent: "flex-end" }}>
          <DateRangePicker
            startDate={timeState.startDate}
            endDate={timeState.endDate}
            onDatesChange={onDatesChange}
            focusedInput={timeState.focusedInput}
            onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
            isOutsideRange={isOutsideRange}
            showDefaultInputIcon
            inputIconPosition="after"
          />
          <Dropdown className="title-dropdown-graph ml-3">
            <Dropdown.Toggle
              as={CustomToggle}
              style={{
                borderRadius: 12,
                background: "#fff",
                width: 90,
                height: 36,
              }}
            >
              <span
                className="py-1 mx-3 d-inline-block"
                style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
              >
                {selectedCampaign.name}
              </span>
              <div
                className="py-1 pr-3 d-inline-block"
                style={{
                  borderRadius: "0 10px 10px 0",
                  float: "right",
                  color: "#74b9ff",
                }}
              >
                <span className="caret" />
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu} className="title-dropdown-menu" noSearch small>
              {allCampaignsOptions.map((campItems) => (
                <Dropdown.Item
                  key={campItems.value}
                  eventKey="1"
                  onClick={() => {
                    setSelectedCampaign(campItems)
                  }}
                >
                  {campItems.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Button className="add-leads-button mx-3">
            <PDFDownloadLink
              document={
                <PdfDocument
                  startDate={timeState.startDate}
                  endDate={timeState.endDate}
                  image={image}
                  statistics={statistics}
                  curves={Object.values(curves).filter((curve) => activeCurves.includes(curve.ID))}
                  campaignName={selectedCampaign.name}
                  accountName={fullName}
                />
              }
              fileName={`${fullName}-${moment().format("YYYY-MM-DD")}.pdf`}
              className="pdf-button"
              style={{
                textDecoration: "none",
                padding: "10px",
                color: "#4a4a4a",
                backgroundColor: "#f2f2f2",
                border: "1px solid #4a4a4a",
              }}
            >
              {({ loading }) => (loading ? "Loading document..." : "Export PDF")}
            </PDFDownloadLink>
          </Button>
          <Button
            className="add-leads-button mr-3"
            onClick={() => {
              window.open(
                `${process.env.REACT_APP_BACKEND_URL}/users/${activeUserID}/accounts/${accountID}/statistics/export_csv${query}`,
              )
            }}
          >
            Export CSV
          </Button>
        </div>
      </div>
      <Plot
        data={graphData}
        layout={graphLayout}
        style={graphStyle}
        useResizeHandler
        divId="graph-div"
        onUpdate={async () => {
          const data = await Plotly.toImage(document.getElementById("graph-div"))
          setImage(data)
        }}
      />

      <StatisticsCurves curves={curves} toogleCurve={toogleCurve} activeCurves={activeCurves} />
    </Card>
  )
}

const styles = StyleSheet.create({
  graphPage: {
    display: "flex",
    justifyContent: "center",
  },
  textCenter: {
    textAlign: "center",
  },
  legendView: {
    display: "table",
    margin: "0 50px",
  },
  table: {
    display: "table",
    width: "auto",
    margin: 20,
    borderRadius: 15,
    border: "1px solid #e2e2e2",
  },
  tableHeader: {
    backgroundColor: "#74b9ff",
    padding: "10px 0",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottom: "1px solid #e2e2e2",
    color: "#fff",
  },
  tableHeaderRow: { margin: "auto", flexDirection: "row" },
  tableHeaderCol: {
    width: "100%",
    padding: "0 15px",
  },
  tableHeaderCell: { margin: "auto", marginTop: 5, fontSize: 10 },
  tableRow: { margin: "auto", flexDirection: "row", padding: "10px 0" },
  tableRowSecond: { backgroundColor: "#e2e2e2" },
  tableLastRow: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  tableCol: {
    width: "100%",
    padding: "0 15px",
  },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
  curveLegend: { display: "table", flexDirection: "row", marginRight: 10 },
  legendColoredView: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  legendWrapper: {
    display: "table",
    flexDirection: "row",
    marginBottom: 10,
  },
  legendText: { fontSize: 10 },
})

const TableWrapper = ({ data, statistics }) => (
  <Page size="A4" orientation="landscape">
    <View style={styles.table}>
      {/* TableHeader */}
      <View style={styles.tableHeader}>
        <View style={styles.tableHeaderRow}>
          <View style={styles.tableHeaderCol}>
            <Text style={styles.tableHeaderCell}>Date</Text>
          </View>
          {statistics.map((statistic) => {
            const curveObject = getStatisticsObject(statistic)
            return (
              <View style={styles.tableHeaderCol} key={statistic}>
                <Text style={styles.tableHeaderCell}>{curveObject.label}</Text>
              </View>
            )
          })}
        </View>
      </View>
      {/* TableContent */}
      {data}
    </View>
  </Page>
)

const TableColCel = ({ children }) => (
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>{children}</Text>
  </View>
)

const TableContent = ({ statistics }) => {
  const values = Object.values(statistics)
  const keys = Object.keys(statistics)

  const tableList = []
  let renderDataRow = []

  if (values[0]) {
    for (let i = 0; i < values[0].length; i++) {
      const renderDataCol = [<TableColCel>{moment(values[0][i].date).format("LL")}</TableColCel>]
      for (let j = 0; j < values.length; j++) {
        if (dataUtils.getDecimalCount(values[j][i].value) > 0) {
          renderDataCol.push(
            <TableColCel>{Number(values[j][i].value * 100).toFixed(0)}%</TableColCel>,
          )
        } else {
          renderDataCol.push(<TableColCel>{values[j][i].value}</TableColCel>)
        }
      }

      const tableRowStyle = [styles.tableRow]
      if (i % 2 !== 0) {
        tableRowStyle.push(styles.tableRowSecond)
      }
      if (i === values[0].length - 1) {
        tableRowStyle.push(styles.tableLastRow)
      }
      renderDataRow.push(<View style={tableRowStyle}>{renderDataCol}</View>)

      if (i !== 0 && i % 10 === 0) {
        tableList.push(<TableWrapper data={renderDataRow} statistics={keys} />)
        renderDataRow = []
      }
    }
    if (renderDataRow.length > 0) {
      tableList.push(<TableWrapper data={renderDataRow} statistics={keys} />)
    }
  }

  return tableList
}

const CurveLegend = ({ curves }) => {
  let allLegend = []
  let legend = []
  for (let i = 0; i < curves.length; i++) {
    const { color, label } = curves[i]
    legend.push(
      <View style={styles.curveLegend}>
        <View style={[styles.legendColoredView, { backgroundColor: `rgb(${color})` }]} />
        <View style={{ color: `rgb(${color})` }}>
          <Text style={styles.legendText}>{label}</Text>
        </View>
      </View>,
    )
    if (i !== 0 && i % 4 === 0) {
      allLegend.push(<View style={styles.legendWrapper}>{legend}</View>)
      legend = []
    }
  }

  allLegend.push(<View style={styles.legendWrapper}>{legend}</View>)

  return allLegend
}

const PdfDocument = ({
  image,
  statistics,
  curves,
  startDate,
  endDate,
  accountName,
  campaignName,
}) => {
  return (
    <Document
      title={`${accountName} - ${campaignName}`}
      author="LinkedIn statistics"
      subject="LinkedIn statistics"
      keywords={["LinkedIn", "Statistics"]}
    >
      <Page size="A4" style={styles.graphPage}>
        <View>
          <View style={styles.textCenter}>
            <Text>{accountName}</Text>
            {startDate && endDate && (
              <Text>
                {startDate.format("LL")} - {endDate.format("LL")}
              </Text>
            )}
            <Text>{campaignName}</Text>
          </View>
          <Image source={{ uri: image, format: "png" }} />
          <View style={styles.legendView}>
            <CurveLegend curves={curves} />
          </View>
        </View>
      </Page>
      <TableContent statistics={statistics} />
    </Document>
  )
}

GraphCard.propTypes = {}

GraphCard.defaultProps = {}

export default GraphCard
