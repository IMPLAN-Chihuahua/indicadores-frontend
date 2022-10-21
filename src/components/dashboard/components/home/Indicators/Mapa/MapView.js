import { Button } from '@mui/material';
import React from 'react'
import { Fragment } from 'react';
import { createRef } from 'react';
import { useState } from 'react'
import { useScreenshot } from 'use-react-screenshot'
import ScreenCapture from '../../../../../../utils/ScreenCapture';

const MapView = () => {
  const [screenCapture, setScreenCapture] = useState(false)

  const handleScreenCapture = (screenCapture) => {
    setScreenCapture(screenCapture);
  }


  const [message, setMessage] = useState('https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik');

  const handleChange = event => {
    setMessage(event.target.value);
  };

  const ref = createRef(null)
  const [image, takeScreenshot] = useScreenshot()
  const getImage = () => takeScreenshot(ref.current)

  return (
    <ScreenCapture onEndCapture={handleScreenCapture}>
      {({ onStartCapture }) => (
        <Fragment>
          <input
            type="text"
            id="message"
            name="message"
            onChange={handleChange}
            value={message}
          />

          <div>
            <div>
              <button style={{ marginBottom: '10px' }} onClick={getImage}>
                Take screenshot
              </button>
            </div>
            <img width={"600"} src={image} alt={'Screenshot'} />
            {/* <div ref={ref}>
              <iframe
                id="inlineFrameExample"
                title="Inline Frame Example"
                width="1200"
                height="600"
                src={message}>
              </iframe>
            </div> */}
          </div>
          <button onClick={onStartCapture}>Capture</button>
          <br />
          <br />
          <img src={screenCapture} />
        </Fragment>
      )}
    </ScreenCapture>

  )
}

export default MapView