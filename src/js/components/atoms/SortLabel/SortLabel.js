import React, { Component } from "react"

import styles from "./SortLabel.module.css"

export default class SortLabel extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { text, sort, onClick, className = "w-40 text-left" } = this.props
    return (
      <h3 onClick={onClick} className={`subtitle f-size-16 ${className}`}>
        {text}
        <span style={{ display: "inline-block" }} className="ml-2">
          {sort === "ASC" && <span className={styles.caret} />}
          {sort === "DESC" && <span className={styles.caret + " " + styles.caretDown} />}
          {!sort && (
            <span style={{ opacity: 0.3 }}>
              <span className={styles.caret} />
              <span className={styles.caret + " " + styles.caretDown} />
            </span>
          )}
        </span>
      </h3>
    )
  }
}
