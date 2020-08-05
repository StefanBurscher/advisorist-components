import "./ImagePersonalization.css"

import React, { Component } from "react"
import TextareaAutosize from "react-autosize-textarea/lib"
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap"
import { TwitterPicker } from "react-color"
import Slider from "react-input-slider"
import { Group, Image, Layer, Stage, Text, Transformer } from "react-konva"

import dataUtils from "../../../utils/data-utils"
import SvgIcon from "../../atoms/SvgIcon/SvgIcon"

class URLImage extends React.Component {
  state = {
    image: null,
  }

  componentDidMount() {
    this.loadImage()
  }

  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage()
    }
    if (this.props.isSelected !== oldProps.isSelected && this.props.isSelected) {
      // we need to attach transformer manually
      this.trRef.setNode(this.groupNode)
      this.trRef.getLayer().batchDraw()
    }
  }

  componentWillUnmount() {
    this.image.removeEventListener("load", this.handleLoad)
  }

  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image()
    this.image.src = this.props.src
    this.image.addEventListener("load", this.handleLoad)
  }

  handleLoad = () => {
    const canvas = this.props.fitImage
    const { x, y } = this.props
    if (canvas && !(x || y)) {
      const imageObj = this.image
      const imageAspectRatio = imageObj.width / imageObj.height
      const canvasAspectRatio = canvas.width / canvas.height
      let renderableHeight
      let renderableWidth
      let xStart
      let yStart

      // If image's aspect ratio is less than canvas's we fit on height
      // and place the image centrally along width
      if (imageAspectRatio < canvasAspectRatio) {
        renderableHeight = canvas.height
        renderableWidth = imageObj.width * (renderableHeight / imageObj.height)
        xStart = (canvas.width - renderableWidth) / 2
        yStart = 0
      }

      // If image's aspect ratio is greater than canvas's we fit on width
      // and place the image centrally along height
      else if (imageAspectRatio > canvasAspectRatio) {
        renderableWidth = canvas.width
        renderableHeight = imageObj.height * (renderableWidth / imageObj.width)
        xStart = 0
        yStart = (canvas.height - renderableHeight) / 2
      }

      // Happy path - keep aspect ratio
      else {
        renderableHeight = canvas.height
        renderableWidth = canvas.width
        xStart = 0
        yStart = 0
      }
      const { index, changeDataByIndex } = this.props
      if (changeDataByIndex) {
        changeDataByIndex(index, {
          width: renderableWidth * canvas.ratio,
          height: renderableHeight * canvas.ratio,
          x: xStart + (renderableWidth - renderableWidth * canvas.ratio) / 2,
          y: yStart + (renderableHeight - renderableHeight * canvas.ratio) / 2,
        })
      }
    }
    this.setState({ image: this.image })
  }

  calcClipFunc(ctx, x, y, width, height, radius) {
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height - radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()
  }

  render() {
    const {
      x,
      y,
      width,
      height,
      draggable,
      index,
      changeDataByIndex,
      isSelected,
      onSelect,
      rotation,
      radius,
      background,
    } = this.props
    const { image } = this.state
    if (background) {
      return <Image width={width} height={height} image={image} />
    }
    return (
      <>
        <Group
          width={width}
          height={height}
          x={x}
          y={y}
          clipFunc={ctx => this.calcClipFunc(ctx, 0, 0, width, height, radius)}
          onClick={onSelect}
          draggable={draggable}
          rotation={rotation}
          ref={node => {
            this.groupNode = node
          }}
          onDragStart={() => {
            onSelect()
            changeDataByIndex(index, { isDragging: true })
          }}
          onDragEnd={e => {
            const newData = {
              isDragging: false,
              x: e.target.x(),
              y: e.target.y(),
            }
            changeDataByIndex(index, newData)
          }}
          onTransformEnd={() => {
            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
            const node = this.groupNode

            if (node.rotation() !== this.props.rotation) {
              changeDataByIndex(index, { rotation: node.rotation() })
            } else {
              const scaleX = node.scaleX()
              const scaleY = node.scaleY()

              const newWidth = Math.max(5, node.width() * scaleX)
              const newHeight = Math.max(node.height() * scaleY)
              const oldRadius = radius / (Math.max(width, height) / 200)

              // we will reset it back
              node.scaleX(1)
              node.scaleY(1)
              changeDataByIndex(index, {
                x: node.x(),
                y: node.y(),
                rotation: node.rotation(),
                // set minimal value
                width: newWidth,
                height: newHeight,
                radius: (Math.max(newWidth, newHeight) / 200) * oldRadius,
              })
            }
          }}
        >
          <Image width={width} height={height} image={image} />
        </Group>
        {isSelected && (
          <Transformer
            rotateEnabled={false}
            ref={node => {
              this.trRef = node
            }}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox
              }
              return newBox
            }}
          />
        )}
      </>
    )
  }
}

class TextItem extends React.Component {
  componentDidUpdate(oldProps) {
    if (this.props.isSelected !== oldProps.isSelected && this.props.isSelected) {
      // we need to attach transformer manually
      this.trRef.setNode(this.textNode)
      this.trRef.getLayer().batchDraw()
    }
  }

  componentDidMount() {
    const { changeDataByIndex, index } = this.props
    changeDataByIndex(index, { width: this.textNode.textWidth, height: this.textNode.textHeight })
  }

  render() {
    const {
      text,
      x,
      y,
      width,
      height,
      draggable,
      index,
      changeDataByIndex,
      isSelected,
      onSelect,
      fontSize,
      rotation,
      fill,
    } = this.props
    return (
      <>
        <Text
          fontSize
          text={text}
          width={width}
          height={height}
          x={x}
          y={y}
          onClick={onSelect}
          fontSize={fontSize}
          fill={fill}
          ref={node => {
            this.textNode = node
          }}
          rotation={rotation}
          draggable={draggable}
          onDragStart={() => {
            onSelect()
            changeDataByIndex(index, { isDragging: true })
          }}
          onDragEnd={e => {
            const newData = {
              isDragging: false,
              x: e.target.x(),
              y: e.target.y(),
            }
            changeDataByIndex(index, newData)
          }}
          onTransformEnd={() => {
            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
            const node = this.textNode
            const scaleX = node.scaleX()
            const scaleY = node.scaleY()

            // we will reset it back
            node.scaleX(1)
            node.scaleY(1)
            const width = Math.max(5, node.width() * scaleX)

            changeDataByIndex(
              index,
              {
                x: node.x(),
                y: node.y(),
                rotation: node.rotation(),
                // set minimal value
                width: Math.max(5, node.width() * scaleX),
                height: Math.max(node.height() * scaleY),
              },
              (fontSize * width) / this.textNode.width(),
            )
          }}
        />
        {isSelected && (
          <Transformer
            rotateEnabled={false}
            enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right"]}
            ref={node => {
              this.trRef = node
            }}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox
              }
              return newBox
            }}
          />
        )}
      </>
    )
  }
}

export default class ImagePersonalization extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      selectedImageIndex: null,
      currentMessage: "",
      allTags: [],
    }
    this.messageInput = React.createRef()
  }

  changeDataByIndex = (index, newData, fontSize) => {
    const { items } = this.state
    const newItems = [...items]
    newItems[index] = {
      ...newItems[index],
      data: {
        ...newItems[index].data,
        ...newData,
      },
    }
    if (fontSize) newItems[index].fontSize = fontSize
    this.setState({ items: newItems })
  }

  array_move(arr, old_index, new_index) {
    if (new_index >= 0 && new_index < arr.length) {
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
    }
    return arr
  }

  moveLayerUp = async () => {
    const { items, selectedImageIndex } = this.state
    const newItems = this.array_move(items, selectedImageIndex, selectedImageIndex + 1)
    await this.setState({ items: newItems })
    this.setState({ selectedImageIndex: selectedImageIndex + 1 })
  }

  moveLayerFront = async () => {
    const { items, selectedImageIndex } = this.state
    const newItems = this.array_move(items, selectedImageIndex, items.length - 1)
    await this.setState({ items: newItems })
    this.setState({ selectedImageIndex: items.length - 1 })
  }

  moveLayerDown = async () => {
    const { items, selectedImageIndex } = this.state
    const newItems = this.array_move(items, selectedImageIndex, selectedImageIndex - 1)
    await this.setState({ items: newItems })
    this.setState({ selectedImageIndex: selectedImageIndex - 1 })
  }

  moveLayerBack = async () => {
    const { items, selectedImageIndex } = this.state
    const newItems = this.array_move(items, selectedImageIndex, 0)
    await this.setState({ items: newItems })
    this.setState({ selectedImageIndex: 0 })
  }

  deleteLayer = async () => {
    const { items, selectedImageIndex } = this.state
    items.splice(selectedImageIndex, 1)
    this.setState({ items, selectedImageIndex: null })
  }

  saveImage = async () => {
    const { actions, background } = this.props
    const { items } = this.state
    const imageData = await actions.createPersonalizedImage(background.public_id, items, background)
    this.props.saveImage(imageData)
  }

  handleConnectTags = async event => {
    const { allTags } = this.state
    const newAllConnectTags = allTags
    let isChanged = false

    newAllConnectTags.forEach((connectTag, index) => {
      if (connectTag.tag === event.target.id) {
        newAllConnectTags[index] = {
          tag: event.target.id,
          replaceWith: event.target.value,
        }
        isChanged = true
      }
      return connectTag.tag === event.target.id
    })

    if (!isChanged) {
      newAllConnectTags.push({
        tag: event.target.id,
        replaceWith: event.target.value,
      })
    }
    await this.setState({ allTags: newAllConnectTags })
  }

  handleColorChange = color => {
    this.changeDataByIndex(this.state.selectedImageIndex, { color: color.hex })
  }

  areTagsValid = connectMessage => {
    const tagsInMessage = connectMessage.match(
      new RegExp("(?:" + "{{" + ")(.*?)(?:" + "}}" + ")", "ig"),
    )

    for (const index in tagsInMessage) {
      tagsInMessage[index] = tagsInMessage[index].slice(2, -2)

      const { allSupportedTags } = this.props
      if (!allSupportedTags.find(suppTag => suppTag.tag === tagsInMessage[index].toString())) {
        this.props.actions.showInfoModal(
          "warning",
          "Warning",
          `You entered tag {{${tagsInMessage[
            index
          ].toString()}}} that doesn’t exist. Please check for typing erorrs and correct the text.`,
        )
        return false
      }
    }

    return true
  }

  validateData = () => {
    const { allSupportedTags } = this.props
    const { currentMessage, allTags } = this.state
    let error = false
    allSupportedTags.forEach(({ tag }) => {
      if (currentMessage.includes(`{{${tag}}}`)) {
        if (dataUtils.showTagReplacement(tag)) {
          const currentTagData = allTags.find(currentTagData => currentTagData.tag === tag)
          if (!currentTagData || (currentTagData && currentTagData.replaceWith.length === 0)) {
            this.props.changeModelType("ADD_TEXT_ERROR")
            this.props.actions.showInfoModal(
              "warning",
              "Warning",
              `Please enter the ${tag} replacement`,
              undefined,
              undefined,
              () => {
                this.props.changeModelType("ADD_TEXT")
              },
            )
            error = true
          }
        } else {
          this.handleConnectTags({ target: { id: tag, value: "" } })
        }
      }
    })
    if (!this.areTagsValid(currentMessage)) {
      return false
    }
    if (error) return false
    return true
  }

  addText = () => {
    const { items } = this.state
    const isValid = this.validateData()
    if (isValid) {
      this.props.changeModelType("CREATE_TEMPLATE")
      const newItems = [...items]
      newItems.push({
        type: "TEXT",
        fontSize: 18,
        data: {
          draggable: true,
          text: this.state.currentMessage,
          tags: this.state.allTags,
          x: 0,
          y: 0,
          color: "black",
        },
      })
      this.setState({ items: newItems, currentMessage: "", allTags: [] })
    }
  }

  render() {
    const { items, selectedImageIndex, currentMessage, allTags } = this.state
    const { background, userImage, type, allSupportedTags } = this.props
    const canLayerUp = selectedImageIndex < items.length - 1
    const canLayerDown = selectedImageIndex > 0
    const itemData = this.state.items[selectedImageIndex]
      ? this.state.items[selectedImageIndex].data
      : {}
    if (type === "ADD_TEXT") {
      return (
        <>
          <span
            className="mt-3 mb-5 d-block"
            style={{ marginLeft: 32, cursor: "pointer" }}
            onClick={() => {
              this.props.changeModelType("CREATE_TEMPLATE")
            }}
          >
            <SvgIcon icon="back-arrow-solid" style={{ width: 20, height: 20 }} />{" "}
            <span>Take me back</span>
          </span>
          <div className="form d-flex flex-column padding" style={{ maxWidth: 500 }}>
            <label className="mb-2">Message</label>
            <div className="wrp-tooltip w-100">
              <Form.Group controlId="message">
                <TextareaAutosize
                  key="message"
                  ref={this.messageInput}
                  value={currentMessage}
                  className="stepcard-message"
                  onChange={event => {
                    this.setState({ currentMessage: event.target.value })
                  }}
                  placeholder="Enter your message here"
                />
              </Form.Group>
              <div className="tooltip">
                Click buttons below to insert variable:
                {`{{firstName}}, {{lastName}}, {{companyName}}`}
              </div>
            </div>
            <div>
              <Row>
                {allSupportedTags.map(({ tag, description }) => {
                  const inputValue = allTags && allTags.find(connectTag => connectTag.tag === tag)
                  return (
                    <Col className="d-flex justify-content-center">
                      <div className="campaign-tags wrp-tooltip mb-2 d-inline-block">
                        <button
                          style={{ padding: "5px 10px", fontSize: 14 }}
                          className="btn highlight-bg mr-2"
                          onClick={() => {
                            const { currentMessage } = this.state
                            const newTag = `{{${tag}}}`
                            const insertPosition = this.messageInput.current.selectionStart

                            const newMessage = [
                              currentMessage.slice(0, insertPosition),
                              newTag,
                              currentMessage.slice(insertPosition),
                            ].join("")

                            this.setState({ currentMessage: newMessage }, () => {
                              const newFocusPosition = insertPosition + newTag.length
                              this.messageInput.current.focus()
                              this.messageInput.current.selectionStart = this.messageInput.current.selectionEnd = newFocusPosition
                            })
                          }}
                        >
                          {tag}
                        </button>
                        <div className="tooltip">{description}</div>
                        {currentMessage.includes(`{{${tag}}}`) &&
                          dataUtils.showTagReplacement(tag) && (
                            <Form.Group
                              as={Col}
                              controlId={`${tag}`}
                              // className="p-0 input-wrapper"
                              className="pl-0"
                            >
                              <Form.Control
                                type="text"
                                value={inputValue ? inputValue.replaceWith : ""}
                                className="input-text py-4"
                                aria-describedby="inputGroupPrepend"
                                onChange={this.handleConnectTags}
                                // placeholder="Enter {tag} replacement"
                                placeholder="Replacement"
                                required
                              />
                              <Form.Label>{tag} replacement</Form.Label>
                            </Form.Group>
                          )}
                      </div>
                    </Col>
                  )
                })}
              </Row>
            </div>
          </div>
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: "2rem", marginBottom: "2rem" }}
          >
            <Button
              variant="secondary"
              className="border-0 d-block m-auto pl-5 pr-5"
              onClick={this.props.closeModal}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              className="master-primary-bg border-0 d-block m-auto pl-5 pr-5"
              onClick={this.addText}
            >
              Add text
            </Button>
          </div>
        </>
      )
    }
    return (
      <>
        <span
          className="ml-5 mt-3 mb-3 d-block"
          style={{ cursor: "pointer" }}
          onClick={() => {
            this.props.changeModelType("UPLOAD_IMAGE")
          }}
        >
          <SvgIcon icon="back-arrow-solid" style={{ width: 20, height: 20 }} />{" "}
          <span>Take me back</span>
        </span>
        <div className="my-2" style={{ height: 30 }}>
          {selectedImageIndex !== null && (
            <Row className="align-items-center text-center" style={{ height: 30 }}>
              {this.state.items[selectedImageIndex].type === "TEXT" ? (
                <Col>
                  <Dropdown className="image-manipulation-position image-manipulation-action">
                    <Dropdown.Toggle
                      className="d-flex align-items-center campaign-item p-0 m-auto"
                      style={{
                        width: 42,
                      }}
                    >
                      Colors
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="p-0">
                      <TwitterPicker
                        triangle="hide"
                        onChange={this.handleColorChange}
                        color={itemData.color}
                        colors={[
                          "#fff",
                          "#000",
                          "#FF6900",
                          "#ffeb3b",
                          "#7BDCB5",
                          "#00D084",
                          "#8ED1FC",
                          "#0693E3",
                          "#EB144C",
                          "#9900EF",
                        ]}
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              ) : (
                <Col>
                  <Dropdown className="image-manipulation-action">
                    <Dropdown.Toggle
                      className="d-flex align-items-center campaign-item p-0 m-auto"
                      style={{
                        width: 42,
                      }}
                    >
                      Radius
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="p-3">
                      <Slider
                        x={itemData.radius / (Math.max(itemData.width, itemData.height) / 200)}
                        onChange={data => {
                          const radius = (Math.max(itemData.width, itemData.height) / 200) * data.x
                          this.changeDataByIndex(selectedImageIndex, { radius })
                        }}
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              )}
              <Col>
                <Dropdown className="image-manipulation-position image-manipulation-action">
                  <Dropdown.Toggle
                    className="d-flex align-items-center campaign-item p-0 m-auto"
                    style={{
                      width: 42,
                    }}
                  >
                    Position
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="py-3">
                    <Row className="px-3 pb-3">
                      <Col>
                        <div
                          style={{ opacity: canLayerUp ? 1 : 0.3 }}
                          onClick={() => {
                            if (canLayerUp) this.moveLayerUp()
                          }}
                        >
                          <SvgIcon icon="arrow-up" className="arrow-icons" /> Forward
                        </div>
                      </Col>
                      <Col>
                        <div
                          style={{ opacity: canLayerDown ? 1 : 0.3 }}
                          onClick={() => {
                            if (canLayerDown) this.moveLayerDown()
                          }}
                        >
                          <SvgIcon icon="arrow-down" className="arrow-icons" /> Backward
                        </div>
                      </Col>
                    </Row>
                    <Row className="px-3">
                      <Col>
                        <div
                          style={{ opacity: canLayerUp ? 1 : 0.3 }}
                          onClick={() => {
                            if (canLayerUp) this.moveLayerFront()
                          }}
                        >
                          <SvgIcon icon="arrow-up" className="arrow-icons" /> To front
                        </div>
                      </Col>
                      <Col>
                        <div
                          style={{ opacity: canLayerDown ? 1 : 0.3 }}
                          onClick={() => {
                            if (canLayerDown) this.moveLayerBack()
                          }}
                        >
                          <SvgIcon icon="arrow-down" className="arrow-icons" /> To back
                        </div>
                      </Col>
                    </Row>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>

              <Col className="image-manipulation-action">
                <button className="image-manipulation-delete" onClick={this.deleteLayer}>
                  <SvgIcon icon="bin-delete" className="arrow-icons" /> Delete
                </button>
              </Col>
            </Row>
          )}
        </div>
        <Stage
          width={background.width}
          height={background.height}
          onMouseDown={e => {
            // deselect when clicked on empty area
            // const clickedOnEmpty = e.target === e.target.getStage();
            const clickedOnbackgroundImage = e.currentTarget._id + 1 === e.target._id
            if (clickedOnbackgroundImage) {
              this.setState({ selectedImageIndex: null })
            }
          }}
        >
          <Layer>
            <URLImage src={background.secure_url} background />
          </Layer>
          {items.map(({ type, data, fontSize }, index) => {
            const {
              text,
              url,
              draggable,
              isDragging,
              x,
              y,
              width,
              height,
              rotation,
              radius,
              color,
            } = data
            switch (type) {
              case "LEAD_PROFILE_IMAGE":
              case "CUSTOMER_PROFILE_IMAGE":
                return (
                  <Layer>
                    <URLImage
                      onSelect={() => {
                        this.setState({ selectedImageIndex: index })
                      }}
                      key={`${index}-${url}`}
                      isSelected={selectedImageIndex === index}
                      index={index}
                      fitImage={{ width: background.width, height: background.height, ratio: 0.25 }}
                      src={url}
                      rotation={rotation}
                      width={width}
                      radius={radius}
                      height={height}
                      x={x}
                      y={y}
                      draggable={draggable}
                      changeDataByIndex={this.changeDataByIndex}
                    />
                  </Layer>
                )
              case "TEXT":
                return (
                  <Layer>
                    <TextItem
                      text={text}
                      width={width}
                      height={height}
                      x={x}
                      y={y}
                      fitText={{ width: background.width, height: background.height, ratio: 0.25 }}
                      fontSize={fontSize}
                      draggable={draggable}
                      fill={isDragging ? "#74b9ff" : color}
                      onSelect={() => {
                        this.setState({ selectedImageIndex: index })
                      }}
                      key={`${index}-${url}`}
                      isSelected={selectedImageIndex === index}
                      index={index}
                      changeDataByIndex={this.changeDataByIndex}
                    />
                  </Layer>
                )
              default:
            }
          })}
          {/* </Layer> */}
        </Stage>

        <div className="mt-3 d-flex" style={{ justifyContent: "space-evenly" }}>
          <Button
            className="image-personalization-buttons"
            onClick={async () => {
              const newItems = [...items]
              newItems.push({
                type: "CUSTOMER_PROFILE_IMAGE",
                data: {
                  draggable: true,
                  url: userImage,
                  x: 0,
                  y: 0,
                  radius: 0,
                  rotation: 0,
                },
              })
              await this.setState({ items: newItems })
              this.setState({ selectedImageIndex: newItems.length - 1 })
            }}
          >
            Add me
          </Button>

          <Button
            className="image-personalization-buttons"
            onClick={async () => {
              const newItems = [...items]
              newItems.push({
                type: "LEAD_PROFILE_IMAGE",
                data: {
                  draggable: true,
                  url: "https://cdn4.iconfinder.com/data/icons/political-elections/50/48-512.png",
                  x: 0,
                  y: 0,
                  radius: 0,
                  rotation: 0,
                },
              })
              await this.setState({ items: newItems })
              this.setState({ selectedImageIndex: newItems.length - 1 })
            }}
          >
            Add lead
          </Button>

          <Button
            className="image-personalization-buttons"
            onClick={() => {
              this.props.changeModelType("ADD_TEXT")
            }}
          >
            Add text
          </Button>
        </div>
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          <Button
            variant="secondary"
            className="border-0 d-block m-auto pl-5 pr-5"
            onClick={this.props.closeModal}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            className="master-primary-bg border-0 d-block m-auto pl-5 pr-5"
            onClick={this.saveImage}
          >
            Save image
          </Button>
        </div>
      </>
    )
  }
}
