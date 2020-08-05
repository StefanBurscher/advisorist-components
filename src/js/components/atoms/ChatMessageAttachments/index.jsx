import "./ChatMessageAttachments.scss"

import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import SvgIcon from "../SvgIcon/SvgIcon"

const ChatMessageAttachments = ({ attachments, previewImage, actions }) => {
  const deleteFile = index => {
    const newFiles = attachments
    newFiles.splice(index, 1)
    actions.updateFormField("chat-files", newFiles)
  }

  return (
    <span style={{ position: "absolute", bottom: 50, zIndex: 1, width: "100%" }}>
      {attachments.map((currentFile, index) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            backgroundColor: "#eaeef2",
            paddingTop: 10,
            paddingBottom: 10,
            marginBottom: 10,
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "inline-flex",
                width: 50,
                height: 50,
                backgroundColor: "#000",
                color: "#fff",
                marginLeft: 38,
                justifyContent: "center",
                alignItems: "center",
                textTransform: "uppercase",
              }}
            >
              {currentFile.type.includes("image/") ? (
                <img src={previewImage[index]} width="50" height="50" alt="" />
              ) : currentFile.type ? (
                currentFile.type.split("/")[1]
              ) : (
                "?"
              )}
            </div>
            <div
              style={{
                display: "inline-flex",
                flexDirection: "column",
                marginLeft: 20,
              }}
            >
              <div>
                {currentFile.name}
              </div>
              <div>Attached</div>
            </div>
          </div>
          <div
            className="mr-2"
            style={{ cursor: "pointer" }}
            onClick={() => {
              deleteFile(index)
            }}
          >
            <SvgIcon
              icon="close-icon-solid"
              className="info-icon pl-5"
              style={{ fill: "#757575" }}
            />
          </div>
        </div>
      ))}
    </span>
  )
}

ChatMessageAttachments.propTypes = {
  attachments: PropTypes.instanceOf(Array),
  previewImage: PropTypes.instanceOf(Array),
}

ChatMessageAttachments.defaultProps = {
  attachments: [],
  previewImage: [],
}

export default ChatMessageAttachments
