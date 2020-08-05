import "./ChatMessage.scss"

import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import ReactLinkify from "react-linkify"
import chat from "../../../constants/chat"
import moment from "moment"
import SvgIcon from "../SvgIcon/SvgIcon"

const ChatMessage = ({
  image,
  message,
  createdAt,
  receiver,
  attachments,
  messageStatus,
  primaryIdentifier,
}) => {
  const getMessageStatus = (status, createdAt) => {
    switch (status) {
      case "SENDING":
        return "Sending..."

      case "SENT/RECEIVED":
        return `Sent ${moment(createdAt).fromNow()}`

      default:
        return "Error"
    }
  }

  const chatMessageClass = classNames("chat-message-wrapper", {
    "chat-message-wrapper-receiver": receiver,
  })
  const chatMessageTextClass = classNames("chat-message-text", {
    "chat-start-bg highlight-color": !receiver,
    "message-end primary-bg": receiver,
  })
  const chatMessageStatusClass = classNames("chat-message-status", {
    "chat-message-status-receiver": receiver,
  })

  return (
    <div className="chat-message-wrapper-all">
      <div className={chatMessageClass}>
        <a
          href={`https://www.linkedin.com/in/${primaryIdentifier}/`}
          target="_blank"
          className="chat-message-image"
        >
          <img
            alt="user-avatar"
            src={image}
            onError={e => {
              e.target.onerror = null
              e.target.src = chat.DEFAULT_PROFILE_IMAGE
            }}
          />
        </a>

        <p className={chatMessageTextClass}>
          {attachments &&
            JSON.parse(attachments).map(attachment => (
              <div
                onClick={async () => {
                  window.open(attachment.reference)
                }}
                className="attachment-message"
              >
                <>
                  {attachment.type && attachment.type.includes("image/") ? (
                    <img
                      src={attachment.reference}
                      width="50"
                      height="50"
                      alt="attachment"
                      className="attachment-image"
                    />
                  ) : (
                    <SvgIcon
                      icon="attachment-icon-solid"
                      className="info-icon attachment-message-icon"
                      spanClassName="attachment-message-icon-chat"
                    />
                  )}
                  {attachment.name ? attachment.name : "Attachment"}
                </>
              </div>
            ))}
          <ReactLinkify>{message}</ReactLinkify>
        </p>
      </div>
      {createdAt && (
        <span className={chatMessageStatusClass}>{getMessageStatus(messageStatus, createdAt)}</span>
      )}
    </div>
  )
}

ChatMessage.propTypes = {}

ChatMessage.defaultProps = {
  image: chat.DEFAULT_PROFILE_IMAGE,
}

export default ChatMessage
