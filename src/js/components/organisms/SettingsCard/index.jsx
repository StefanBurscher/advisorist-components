import "react-input-range/lib/css/index.css"
import "./SettingsCard.scss"

import Card from "../../atoms/Card/Card"
import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import Separator from "../../atoms/Separator/Separator"
import InputRange from "react-input-range"

const SettingsCard = ({
  title,
  description,
  maxValue,
  minValue,
  state,
  field,
  setState,
  icon,
  criticalPoint,
  showInfoModal,
  showCriticalLimitMessage,
  hideCriticalLimitMessage,
}) => {
  const settingsCardClass = classNames("settings-card-wrapper")

  const isCritical = !!criticalPoint && state[field].max >= criticalPoint
  const inputRangeClass = classNames("mt-5", {
    "input-range-critical": isCritical,
  })
  return (
    <div className={settingsCardClass}>
      <Card className="settings-card pr-5 pl-5">
        <Separator
          text={title}
          subText={description}
          icon={icon}
          color="#000"
          iconClassName="settings-card-icons"
        />
        <div className={inputRangeClass}>
          <InputRange
            onChangeComplete={() => {
              if (isCritical && showCriticalLimitMessage) {
                showInfoModal(
                  "warning",
                  "Warning",
                  "Due to recent Linkedin changes, sending more than 100 connection request per day may increase your risk of people reporting you as spam and may result in resquesting you to enter an email for each new contact before connecting (Linkedin Jail).",
                )
                hideCriticalLimitMessage()
              }
            }}
            maxValue={maxValue}
            minValue={minValue}
            value={state[field]}
            onChange={value => setState(field, value)}
          />
        </div>
      </Card>
    </div>
  )
}

SettingsCard.propTypes = {}

SettingsCard.defaultProps = {}

export default SettingsCard
