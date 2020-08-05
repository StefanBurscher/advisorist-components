import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import React from 'react'

import ChatLabel from '../ChatLabel'
import chat from '../../../constants/chat'
import styles from './ChatListItem.module.css'

const cx = classNames.bind(styles)

const ChatListItem = ({
  labels,
  image,
  name,
  message,
  active,
  onClick,
  notSeen
}) => {
  let chatListItemClass = cx('chat-list-item-wrapper', {
    'chat-list-item-no-seen': notSeen
  })
  if (active) {
    chatListItemClass += ' chat-list-item-wrapper-selected'
  }

  return (
    <div className={chatListItemClass} onClick={onClick}>
      <div className={styles['chat-list-item-labels'] + ' mb-2'}>
        {labels.map((label) => (
          <ChatLabel color={label.tagColor} tag={label.tag} />
        ))}
      </div>
      <div className='d-flex'>
        <img
          src={image}
          alt='user-avatar'
          className={styles['chat-list-item-profile-image']}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = chat.DEFAULT_PROFILE_IMAGE
          }}
        />
        <div className={styles['chat-list-item-text']}>
          <div className={styles['chat-list-item-name']}>{name}</div>
          <div className={styles['chat-list-item-message']}>{message}</div>
        </div>
      </div>
    </div>
  )
}

ChatListItem.propTypes = {
  image: PropTypes.string,
  labels: PropTypes.instanceOf(Array),
  name: PropTypes.string.isRequired,
  message: PropTypes.string,
  active: PropTypes.bool
}

ChatListItem.defaultProps = {
  image: chat.DEFAULT_PROFILE_IMAGE,
  labels: [],
  message: '',
  active: false
}

export default ChatListItem
