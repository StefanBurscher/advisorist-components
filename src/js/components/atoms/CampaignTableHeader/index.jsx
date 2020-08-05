import "./CampaignTableHeader.scss"

import React from "react"
import SvgIcon from "../SvgIcon/SvgIcon"

const CampaignTableHeader = () => {
  return (
    <div
      className="subtitle-wrapper subtitle-campaigns--modifier d-flex align-items-center primary-bg"
      style={{ zIndex: 100 }}
    >
      <div className="name-row d-flex align-items-center modifier pl-3">
        <h3 className="subtitle f-size-16 w-20 d-flex justify-content-center">Active</h3>
        <h3 className="subtitle f-size-16">Campaign name</h3>
      </div>
      <div className="icons-rows">
        <ul className="d-flex">
          <li className="text-center">
            <SvgIcon icon="eye-solid" tooltip="Views" noCaret />
          </li>
          <li className="text-center w-50">
            <SvgIcon icon="user-friends-solid" tooltip="Connection requests" noCaret />
          </li>
          <li className="text-center w-50">
            <SvgIcon icon="open-envelope" tooltip="Sent InMails" noCaret />
          </li>
          <li className="text-center">
            <SvgIcon icon="comment-dots-solid" tooltip="Replied" noCaret />
          </li>
        </ul>
      </div>
      <div className="text-rows modifier">
        <ul className="d-flex align-items-center">
          <li>
            <h3 className="subtitle f-size-16 text-center">Requests accepted</h3>
          </li>
          <li>
            <h3 className="subtitle f-size-16 text-center">Acceptance rate</h3>
          </li>
          <li>
            <h3 className="subtitle f-size-16 text-center">Response rate</h3>
          </li>
          <li>
            <h3 className="subtitle f-size-16 text-center">Campaign status</h3>
          </li>
          <li />
        </ul>
      </div>
    </div>
  )
}

CampaignTableHeader.propTypes = {}

CampaignTableHeader.defaultProps = {}

export default CampaignTableHeader
