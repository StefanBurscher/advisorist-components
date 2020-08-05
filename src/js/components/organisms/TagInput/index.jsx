import classNames from "classnames/bind"
import PropTypes from "prop-types"
import React from "react"
import { useState } from "react"
import TextareaAutosize from "react-autosize-textarea/lib"

import Button from "../../atoms/Button"
import styles from "./TagInput.module.css"

const cx = classNames.bind(styles)

const TagInput = ({ removeOnBackspace, onTagChange, tags, updateBlacklist, tagsFilter }) => {
  const tagInputClass = cx("tag-input-wrapper input-group-wrapper input-bordered")
  const [inputValue, changeValue] = useState("")

  const onInputKeyDown = (e) => {
    const realInputValue = inputValue.trim()
    if ([13, 188].includes(e.keyCode)) {
      e.preventDefault()
      if (realInputValue === "") {
        return
      }
      addTag(realInputValue)
    } else if (removeOnBackspace && (e.keyCode === 8 || e.keyCode === 46)) {
      if (realInputValue !== "") {
        return
      }
      removeTag(tags.length - 1)
    }
  }

  const addTag = (value) => {
    var newTags = tags.slice()
    newTags.push(value)
    onTagChange(newTags)
    changeValue("")
  }

  const removeTag = (i) => {
    var newTags = tags.slice()
    newTags.splice(i, 1)
    onTagChange(newTags)
  }

  const onInputPaste = (e) => {
    e.preventDefault()
    var clipboardData = e.clipboardData || e.originalEvent.clipboardData || window.clipboardData
    var pastedData = clipboardData.getData("text")
    const pastedNewLineTag = pastedData.split("\n")
    let allNewTags = []
    pastedNewLineTag.forEach((tag) => {
      allNewTags = [...allNewTags, ...tag.split(",")]
    })

    var newTags = [...tags, ...allNewTags].filter((tag) => !!tag.trim())
    const allNewTrimmedTags = newTags.map((tag) => tag.trim())
    onTagChange(allNewTrimmedTags)
  }

  const allFilteredTags = tagsFilter
    ? tags.filter((tag) => tag.toLowerCase().includes((tagsFilter || "").toLowerCase()))
    : tags

  const allTagsClassName = cx("tag-input-wrapper-all-tags", {
    "no-tags": allFilteredTags.length === 0,
  })

  return (
    <div className={tagInputClass}>
      <div className={`${styles["input-group"]} input-group`}>
        <div className={allTagsClassName}>
          {allFilteredTags.map((tag, index) => (
            <div
              className={`${styles["tag-input-wrapper-tag"]} tag-input-wrapper-tag`}
              onClick={() => {
                removeTag(index)
              }}
            >
              <div className={styles["tag-input-wrapper-tag-content"]}>{tag}</div>
              <div className={styles["tag-input-wrapper-tag-remove"]} />
            </div>
          ))}
        </div>
        <TextareaAutosize
          className={styles["tag-input-wrapper-input"]}
          onKeyDown={onInputKeyDown}
          onChange={(e) => {
            changeValue(e.target.value)
          }}
          placeholder="Add a tag..."
          onPaste={onInputPaste}
          value={inputValue}
        />
        <Button
          variant="transparent"
          className="chat-notes-button"
          small
          onClick={() => {
            updateBlacklist(tags)
          }}
        >
          Save blacklist
        </Button>
      </div>
    </div>
  )
}

TagInput.propTypes = {}

TagInput.defaultProps = {
  removeOnBackspace: true,
  tags: [],
  tagsFilter: "",
}

export default TagInput
