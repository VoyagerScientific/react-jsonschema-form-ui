import React, { useState } from 'react'

const imgStyle = {
  transition: "transform .3s cubic-bezier(0.0,0.0,0.2,1),opacity linear .5s"
}
const selectedImgStyle = {
  transform: "translateZ(0px) scale3d(0.9, 0.9, 1)",
  transition: "transform .3s cubic-bezier(0.0,0.0,0.2,1),opacity linear .5s"
}

const PhotoItem = (props) => {
  const { photo, onRemove, index, top, left } = props
  const [isHovered, setIsHovered] = useState(false)

  const _onMouseEnter = () => setIsHovered(true)
  const _onMouseLeave = () => setIsHovered(false)
  const _onRemove = () => onRemove(index)

  const { width, height, src, name } = photo
  const sx = (100 - (10 / width) * 100) / 100
  const sy = (100 - (10 / height) * 100) / 100
  selectedImgStyle.transform = `translateZ(0px) scale3d(${sx}, ${sy}, 1)`

  return (
    <div
      className="img-wrap"
      style={{ height, width, top, left }}
      onMouseEnter={_onMouseEnter}
      onMouseLeave={_onMouseLeave}
    >
      <img
        alt={name}
        src={src}
        style={isHovered ? { ...imgStyle, ...selectedImgStyle } : imgStyle}
        width={isHovered ? width - 4 : width}
        height={isHovered ? height - 4 : height}
      />
      {isHovered && <span onClick={_onRemove} className="ic-close">&times;</span>}
    </div>
  )
}

export default PhotoItem
