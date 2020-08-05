import classNames from "classnames/bind"
import PropTypes from "prop-types"
import React from "react"
import { Row, Col } from "react-bootstrap"

import AccountStatusLabel from "../../atoms/AccountStatusLabel"
import SvgIcon from "../../atoms/SvgIcon/SvgIcon"
import styles from "./AccountStatusItem.module.css"

const cx = classNames.bind(styles)

const AccountStatusItem = ({
  person,
  onClick,
  accountStatuses,
  active,
  onLabelClick,
  onSettingsClick,
}) => {
  const accountStatusItemClass = cx("account-status-item-wrapper", {
    "account-status-item-active": active,
  })

  return (
    <div className={`account-status-item-wrapper ${accountStatusItemClass}`} onClick={onClick}>
      <Row>
        <Col className="align-self-center text-left">{person.fullName || "No name defined"}</Col>
        <Col className="d-flex align-items-center justify-content-end">
          <AccountStatusLabel
            onClick={onLabelClick}
            status={person.accountGlobalStatusId}
            accountStatuses={accountStatuses}
          />
          <span onClick={onSettingsClick}>
            <SvgIcon icon="cog-solid" className={styles["master-login-icon"]} />
          </span>
        </Col>
      </Row>
    </div>
  )
}

AccountStatusItem.propTypes = {}

AccountStatusItem.defaultProps = {}

export default AccountStatusItem
