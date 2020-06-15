import React, { useState } from 'react'
import Gallery from 'react-photo-gallery'

import ReactDropZone from '../widgets/ReactDropZoneWidget'
import PhotoItem from '../widgets/PhotoItemWidget'

function readFile(file, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', (event) => {
    const { result } = event.target
    const img = new Image()
    img.src = result
    img.onload = function () {
      callback({ isLocal: true, src: result, file, width: img.width, height: img.height })
    }
  })
  reader.readAsDataURL(file)
}

function ReactPhotoGalleryField(props) {
  const { formData, onChange } = props
  const [isReading, setIsReading] = useState(false)

  const onAcceptedFiles = files => {
    setIsReading(true)
    const newFiles = []
    files.map(f => readFile(f, (p) => {
      newFiles.push(p)
      if (files.length === newFiles.length) {
        setIsReading(false)
        const newFormData = { ...formData }
        newFormData.attachments = [...newFormData.attachments || [], ...newFiles]
        onChange(newFormData)
      }
    }))
  }

  const onRemoveFile = index => {
    const newFormData = { ...formData }
    newFormData.attachments = newFormData.attachments.filter((item, i) => i !== index)
    onChange(newFormData)
  }

  const _renderPhoto = item => (
    <PhotoItem
      {...item}
      key={item.index}
      onRemove={onRemoveFile}
    />
  )

  const attachments = formData.attachments || []

  return (
    <div className="react-gallery">
      <ReactDropZone
        isReading={isReading}
        onAcceptedFiles={onAcceptedFiles}
      />
       <Gallery photos={attachments} columns={2} renderImage={_renderPhoto} />
    </div>
  )
}

export default ReactPhotoGalleryField
