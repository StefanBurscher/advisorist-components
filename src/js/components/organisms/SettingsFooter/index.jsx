import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import { Row, Col } from "react-bootstrap"

import Separator from "../../atoms/Separator/Separator"
import Switch from "../../atoms/Switch/Switch"
import styles from "./SettingsFooter.module.css"

const SettingsFooter = ({
  pendingConnections,
  runOnWeekend,
  handlependingConnections,
  handleRunOnWeekend,
}) => {
  return (
    <div className="mt-5 pt-5 pb-5 account-health-section">
      <div className="d-flex mb-4">
        <div className="w-100 align-self-center">
          <Separator
            text="Account health"
            color="#000"
            icon="comment-medical-solid"
            iconClassName="settings-card-icons"
          />
        </div>
      </div>
      <div style={{ marginLeft: 60 }}>
        <Row className="mb-3">
          <Col>
            <span className={styles["account-health-text"]}>
              Automatically delete oldest <br />
              pending invitations to keep <br />
              count less than 1200
            </span>
          </Col>
          <Col>
            <span className={styles["account-health-text"]}>
              Run on <br />
              weekends
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Switch isChecked={pendingConnections} onChange={handlependingConnections} />
            <span className={styles["account-health-subtext"]}>
              If you have too many pending invitations, you may not be able to invite more people to
              connect.
            </span>
          </Col>
          <Col>
            <Switch isChecked={runOnWeekend} onChange={handleRunOnWeekend} />
            <span className={styles["account-health-subtext"]}>
              Choose if you want actions to be taken over the weekend
            </span>
          </Col>
        </Row>
      </div>
    </div>
  )
}

SettingsFooter.propTypes = {}

SettingsFooter.defaultProps = {}

export default SettingsFooter
