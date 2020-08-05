import styles from './ChatLabel.module.css'

import PropTypes from 'prop-types'
import React from 'react'

const ChatLabel = ({ color, tag }) => {
  return (
    <span
      className={styles['chat-list-item-label']}
      style={{ backgroundColor: color }}
    >
      {tag}
    </span>
  )
}

ChatLabel.propTypes = {
  color: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired
}

ChatLabel.defaultProps = {}

export default ChatLabel
