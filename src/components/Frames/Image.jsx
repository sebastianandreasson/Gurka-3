import React from 'react'

const ImageSlideshow = ({ url, position }) => {
  return (
    <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
  )
}

export default ImageSlideshow
