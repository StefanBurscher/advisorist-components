import React, { useState, useEffect } from "react"
import classNames from "classnames/bind"
import PropTypes from "prop-types"
import styles from "./TimePicker.module.css"

const cx = classNames.bind(styles)

const TimePicker = ({ value, onChange, gray }) => {
  const hours = []
  for (var i = 0; i <= 23; i++) {
    let value = i
    if (value < 10) {
      value = "0" + value
    }
    hours.push(value)
  }

  const minutes = []
  for (var i = 0; i <= 59; i++) {
    let value = i
    if (value < 10) {
      value = "0" + value
    }
    minutes.push(value)
  }
  const timePickerClass = cx("time-picker-container", {
    "time-picker-gray": gray,
  })

  const [pickerOpen, setPickerOpen] = useState(false)
  const [selectedHour, setSelectedHour] = useState()
  const [selectedMinute, setSelectedMinute] = useState()

  useEffect(() => {
    const splitedValue = value.split(":")
    setSelectedHour(splitedValue[0])
    setSelectedMinute(splitedValue[1])
  }, [value])

  const selectHour = (hour) => {
    setSelectedHour(hour)
    let newMinutes = selectedMinute
    if (!selectedMinute) {
      newMinutes = "00"
      setSelectedMinute("00")
    }

    onChange(`${hour}:${newMinutes}`)
  }

  const selectMinute = (minute) => {
    setSelectedMinute(minute)
    let newHours = selectedHour
    if (!selectedHour) {
      newHours = "00"
      setSelectedHour("00")
    }

    onChange(`${newHours}:${minute}`)
  }
  const togglePicker = () => {
    setPickerOpen(!pickerOpen)
  }

  return (
    <div className={timePickerClass} onClick={togglePicker}>
      <span className={styles["time-picker-text"]}>
        {(selectedHour || selectedMinute) && `${selectedHour} : ${selectedMinute}`}
      </span>
      {pickerOpen && (
        <div className={styles["time-picker-wrapper"]}>
          <div className={styles["time-picker-side"]}>
            {hours.map((hour) => (
              <div
                className={styles["time-picker-select"]}
                onClick={() => {
                  selectHour(hour)
                }}
              >
                {hour}
              </div>
            ))}
          </div>
          <div className={styles["time-picker-side"]}>
            {minutes.map((minute) => (
              <div
                className={styles["time-picker-select"]}
                onClick={() => {
                  selectMinute(minute)
                }}
              >
                {minute}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

TimePicker.propTypes = {}

TimePicker.defaultProps = {}

export default TimePicker
