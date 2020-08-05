import classNames from "classnames/bind"
import React from "react"

import SvgIcon from "../SvgIcon/SvgIcon"
import styles from "./CampaignStatus.module.css"

const cx = classNames.bind(styles)

const CampaignStatus = ({
  everyConnectionsSent,
  generalStatus,
  onlyDiscoverLeads,
  dashboardName,
}) => {
  let leadDiscoverActiveClassnames = cx("all-connections")
  leadDiscoverActiveClassnames += "  radius-50 d-inline-flex hover-tooltip no-tooltip-caret"

  if (generalStatus === "LEAD_DISCOVERY_ACTIVE") {
    return (
      <li className="text-center">
        <span
          className={leadDiscoverActiveClassnames}
          style={{ backgroundColor: "rgb(235, 238, 243)" }}
        >
          <div style={{ position: "relative" }}>
            <SvgIcon icon="magnifying-glass" style={{ width: 30, height: 20, color: "#000" }} />
            <span className="tooltip w-auto campaign-discover-tooltip">
              {dashboardName} is still discovering people in this campaign. Keep in mind that{" "}
              {dashboardName} is executing your campaign simultaneously while discovering leads.
            </span>
          </div>
        </span>
      </li>
    )
  }

  let connectionSentClassnames = cx("all-connections", {
    "are-sent": everyConnectionsSent,
  })
  connectionSentClassnames += " d-inline-flex"
  if (everyConnectionsSent) {
    connectionSentClassnames += " hover-tooltip no-tooltip-caret"
  }

  if (
    generalStatus === "LEAD_DISCOVERY_FINISHED" &&
    everyConnectionsSent &&
    onlyDiscoverLeads === 0
  ) {
    return (
      <li className="text-center">
        <span className={connectionSentClassnames}>
          <div style={{ position: "relative" }}>
            <SvgIcon
              spanClassName="checked-icon-span"
              icon="checked"
              style={{ width: 15, height: 15, color: "#74B9FF" }}
            />
            <span className="tooltip w-auto campaign-discover-tooltip">
              This campaign has sent out all connection requests. Keep it active to continue
              executing other steps.
            </span>
          </div>
        </span>
      </li>
    )
  }

  const leadDiscoverFinishedClassnames = `${styles["all-connections"]} ${styles["are-discovered"]} d-inline-flex hover-tooltip no-tooltip-caret`

  if (generalStatus === "LEAD_DISCOVERY_FINISHED") {
    return (
      <li className="text-center">
        <span className={leadDiscoverFinishedClassnames}>
          <div style={{ position: "relative" }}>
            <SvgIcon
              spanClassName="checked-icon-span"
              icon="checked"
              style={{ width: 15, height: 15, color: "rgb(82, 196, 98)" }}
            />
            <span className="tooltip w-auto campaign-discover-tooltip">
              This campaign has finished discovering all leads. Campaign is currently executing
              steps, please keep it active.
            </span>
          </div>
        </span>
      </li>
    )
  }

  return null
}

CampaignStatus.propTypes = {}

CampaignStatus.defaultProps = {}

export default CampaignStatus
