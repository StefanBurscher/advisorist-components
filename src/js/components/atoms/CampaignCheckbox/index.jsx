import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import { Row, Col, Accordion } from "react-bootstrap"

import Switch from "../Switch/Switch"
import styles from "./CampaignCheckbox.module.css"

const CampaignCheckbox = ({
  dashboard,
  onlyPremium,
  onlyOpenInmail,
  sendPreviouse,
  getPersonalInfo,
  handleOnlyPremium,
  handleInMailDiscover,
  handleSendPreviouse,
  handleGetPersonalInfo,
  className,
  onlyUniqueLeads,
  noPendingConnections,
  handleOnlyUniqueLeads,
  handleNoPendingConnections,
}) => {
  const campaignCheckboxClass = classNames("campaign-checkbox-wrapper", {
    [className]: className,
  })

  const RowsData = () => {
    const rows = []
    if (["1", "2"].includes(dashboard.toString())) {
      rows.push(
        <Col>
          <h3 className="subtitle black">Premium LinkedIn accounts only</h3>
          <br />
          <Switch isChecked={onlyPremium} onChange={handleOnlyPremium} />
          <span className={styles["account-health-subtext"]}>
            Choose if you want actions to be taken only over premium accounts
          </span>
        </Col>,
        <Col>
          <h3 className="subtitle black">Open InMail discover</h3>
          <br />
          <Switch isChecked={onlyOpenInmail} onChange={handleInMailDiscover} />
          <span className={styles["account-health-subtext"]}>
            This field will determine if only leads with open InMail status will be discovered.
          </span>
        </Col>,
      )
    }
    rows.push(
      <Col>
        <h3 className="subtitle black">Include people you already talked to</h3>
        <br />
        <Switch isChecked={sendPreviouse} onChange={handleSendPreviouse} />
        <span className={styles["account-health-subtext"]}>
          Include all people that you have previously talked to on LinkedIn.
        </span>
      </Col>,
      <Col>
        <h3 className="subtitle black">Collect contact info</h3>
        <br />
        <Switch isChecked={getPersonalInfo} onChange={handleGetPersonalInfo} />
        <span className={styles["account-health-subtext"]}>
          Collect available contact information of each prospect including: email, phone number,
          twitter, website.
        </span>
      </Col>,
    )
    return <Row>{rows}</Row>
  }

  return (
    <div className={campaignCheckboxClass}>
      <RowsData />
      {["1", "2", "post-engagement"].includes(dashboard.toString()) && (
        <Accordion className="my-3">
          <Accordion.Toggle
            variant="link"
            as="div"
            eventKey="0"
            className={styles["accordion-button"]}
          >
            Advanced <span class="caret ml-3"></span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Row className="mt-4">
              {["1", "2", "post-engagement"].includes(dashboard.toString()) && (
                <Col md="3">
                  <h3 className="subtitle black">Only unique leads</h3>
                  <br />
                  <Switch isChecked={onlyUniqueLeads} onChange={handleOnlyUniqueLeads} />
                  <span className={styles["account-health-subtext"]}>
                    Leads that exist in any other campaign will not be discovered
                  </span>
                </Col>
              )}

              {["1", "2"].includes(dashboard.toString()) && (
                <Col md="3">
                  <h3 className="subtitle black">No pending connections</h3>
                  <br />
                  <Switch isChecked={noPendingConnections} onChange={handleNoPendingConnections} />
                  <span className={styles["account-health-subtext"]}>
                    Leads with pending connection request will not be discovered
                  </span>
                </Col>
              )}
            </Row>
          </Accordion.Collapse>
        </Accordion>
      )}
    </div>
  )
}

CampaignCheckbox.propTypes = {}

CampaignCheckbox.defaultProps = {
  dashboard: "",
  className: "",
}

export default CampaignCheckbox
