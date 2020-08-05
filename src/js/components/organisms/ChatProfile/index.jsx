import "./ChatProfile.scss"

import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import chat from "../../../constants/chat"
import SvgIcon from "../../atoms/SvgIcon/SvgIcon"
import Button from "../../atoms/Button"
import InputGroup from "../InputGroup"
import { Spinner } from "react-bootstrap"

const ChatProfile = ({
  image,
  fullName,
  occupation,
  company,
  phone,
  email,
  website,
  selectedLeadID,
  formData,
  actions,
  primaryIdentifier,
  twitter,
  loadingChat,
}) => {
  const parsedWebsite = website && (!website.includes("//") ? `//${website}` : website)
  const chatProfileClass = classNames("chat-profile-wrapper chat-messages-area")
  const { note = "" } = formData

  const changeNotes = event => {
    actions.updateFormField("note", event.target.value)
  }

  return (
    <div className={chatProfileClass}>
      <img
        className="chat-profile-image"
        src={image}
        onError={e => {
          e.target.onerror = null
          e.target.src = chat.DEFAULT_PROFILE_IMAGE
        }}
      />
      <div className="chat-profile-data">
        <a
          href={`https://www.linkedin.com/in/${primaryIdentifier}/`}
          target="_blank"
          className="d-block chat-profile-data-fullname"
        >
          {fullName}
          <SvgIcon icon="linkedin-logo" className="chat-profile-icon-class chat-profile-icon-ln ml-2" />
        </a>
        <div className="mt-3">
          <span className="d-block chat-profile-data-occupation">{occupation}</span>
          <span className="d-block chat-profile-data-company">{company}</span>
        </div>
      </div>
      {loadingChat ? (
        <Spinner animation="border" role="status" className="ml-auto mr-auto d-block mt-4 inf" />
      ) : (
        <div>
          {(phone || email || website || twitter) && (
            <div className="chat-profile-data">
              {phone && (
                <div>
                  <SvgIcon icon="phone-icon" className="chat-profile-icon-class" />
                  {phone}
                </div>
              )}
              {email && (
                <div>
                  <SvgIcon icon="email-icon" className="chat-profile-icon-class" />
                  {email}
                </div>
              )}
              {website && (
                <div>
                  <a href={parsedWebsite} target="_blank">
                    <SvgIcon icon="website-icon" className="chat-profile-icon-class" />
                    {website}
                  </a>
                </div>
              )}

              {twitter && (
                <div>
                  <a href={`https://twitter.com/${twitter}`} target="_blank">
                    <SvgIcon icon="twitter-icon" className="chat-profile-icon-class" />
                    {twitter}
                  </a>
                </div>
              )}
            </div>
          )}
          {selectedLeadID && (
            <div className="chat-profile-notes">
              <span className="d-block mb-2">Notes</span>

              <InputGroup
                type="textarea"
                key={selectedLeadID}
                customValue={note}
                inputClassName="chat-notes-textarea"
                inputProps={{ rows: "2" }}
                bordered
                onChange={changeNotes}
                placeholder="Add a note"
                siblingComponent={
                  <Button
                    variant="transparent"
                    className="chat-notes-button"
                    small
                    margin="-10px auto 0 auto"
                    onClick={() => {
                      actions.saveLeadNote(selectedLeadID, note)
                    }}
                  >
                    SAVE
                  </Button>
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

ChatProfile.propTypes = {}

ChatProfile.defaultProps = {
  image: chat.DEFAULT_PROFILE_IMAGE,
}

export default ChatProfile
