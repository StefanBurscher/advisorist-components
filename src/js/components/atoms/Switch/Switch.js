import "./Switch.css"

import React, { Component } from "react"

export default class Switch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isChecked: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isChecked !== this.state.isChecked) {
      this.setState({ isChecked: nextProps.isChecked })
    }
  }

  componentWillMount() {
    this.setState({ isChecked: this.props.isChecked })
  }

  handleChange = e => {
    e.stopPropagation()
    const { onChange, auto } = this.props
    if (auto) {
      this.setState({ isChecked: !this.state.isChecked }, () => {
        if (onChange) onChange(this.state.isChecked)
      })
    } else if (onChange) onChange(!this.state.isChecked)
  }

  render() {
    return (
      <div className="switch-container" onClick={e => e.stopPropagation()}>
        <label>
          <input
            disabled={this.props.disabled}
            ref="switch"
            checked={this.state.isChecked}
            onChange={this.handleChange}
            className="switch"
            type="checkbox"
          />
          <div>
            <div />
          </div>
        </label>
      </div>
    )
  }
}
