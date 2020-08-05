import "react-dropzone-uploader/dist/styles.css"
import "./Dropzone.css"

import React from "react"
import Dropzone from "react-dropzone-uploader"

export default class DropzoneWithPreview extends React.Component {
  constructor() {
    super()
    this.state = {
      files: [],
    }
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview))
  }

  onDrop = async files => {
    this.props.uploadCloudinary(files[0].file)
  }

  // handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

  render() {
    const { files } = this.state

    const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} />
        </div>
      </div>
    ))

    return (
      <div>
        <Dropzone
          onSubmit={this.onDrop}
          accept="image/*"
          // onChangeStatus={this.handleChangeStatus}
          multiple={false}
          maxFiles={1}
          inputContent="Drag photos here or Browse"
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drop files here</p>
            </div>
          )}
        </Dropzone>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </div>
    )
  }
}
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
}

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
}

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
}

const img = {
  display: "block",
  width: "auto",
  height: "100%",
}
