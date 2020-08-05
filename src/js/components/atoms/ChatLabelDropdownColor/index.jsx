import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import React from 'react'

import SvgIcon from '../SvgIcon/SvgIcon'
import styles from './ChatLabelDropdownColor.module.css'

const cx = classNames.bind(styles)

const ChatLabelDropdownColor = ({ selectColor, active, color, error }) => {
  const colorLabelClass = cx('chat-label-dropdown-color-select', {
    'chat-label-dropdown-color-select-error': error
  })
  return (
    <div
      className={colorLabelClass}
      style={{ backgroundColor: color }}
      onClick={() => {
        selectColor(color)
      }}
    >
      {active && (
        <SvgIcon
          icon='checked'
          className={
            styles['create-tag-icon-selected'] +
            ' info-icon p-0 create-tag-icon-selected'
          }
        />
      )}
    </div>
  )
}

ChatLabelDropdownColor.propTypes = {}

ChatLabelDropdownColor.defaultProps = {}

export default ChatLabelDropdownColor
