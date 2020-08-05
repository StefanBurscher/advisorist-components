import classNames from "classnames/bind"
import PropTypes from "prop-types"
import React from "react"

import styles from "./AccountStatusLabel.module.css"
import { LABEL_COLORS, LABEL_DESCRIPTION } from "../../../constants/account-statuses"

const cx = classNames.bind(styles)

const AccountStatusLabel = ({ status, accountStatuses, onClick }) => {
  const realStatus = accountStatuses.find(({ statusId }) => statusId === status).statusName

  const accountStatusLabelClass = cx("status-label", {
    "status-red": LABEL_COLORS.RED.includes(realStatus),
    "status-yellow": LABEL_COLORS.YELLOW.includes(realStatus),
    "status-blue": LABEL_COLORS.BLUE.includes(realStatus),
    "status-green": LABEL_COLORS.GREEN.includes(realStatus),
    "status-gray": LABEL_COLORS.GRAY.includes(realStatus),
  })

  return (
    <span onClick={onClick} className={styles["master-login-status-label"]}>
      <label className={accountStatusLabelClass + " status-label"}>
        {LABEL_DESCRIPTION[realStatus]}
      </label>
    </span>
  )
}

AccountStatusLabel.propTypes = {
  status: PropTypes.string.isRequired,
  accountStatuses: PropTypes.instanceOf(Array).isRequired,
  onClick: PropTypes.func.isRequired,
}

AccountStatusLabel.defaultProps = {}

export default AccountStatusLabel
