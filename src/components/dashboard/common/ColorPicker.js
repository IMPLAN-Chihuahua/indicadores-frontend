import React, { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';
import { HexColorPicker, HexColorInput } from "react-colorful";

const CloseOnClickOutside = (ref, handler) => {
  useEffect(() => {
    let startedInside = false;
    let startedWhenMounted = false;

    const listener = (event) => {
      if (startedInside || !startedWhenMounted) return;
      if (!ref.current && ref.current.contains(event.target)) return;
      handler(event);
    };

    const validateEventStart = (event) => {
      startedWhenMounted = ref.current;
      startedInside = ref.current && ref.current.contains(event.target);
    };

    document.addEventListener('mousedown', validateEventStart);
    document.addEventListener('touchstart', validateEventStart);
    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('mousedown', validateEventStart);
      document.removeEventListener('touchstart', validateEventStart);
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);
}

const ColorPicker = ({color, onChange}) => {
  const popOver = useRef();
  const [popState, setPopState] = useState(false);

  const close = useCallback(() => setPopState(false), []);

  CloseOnClickOutside(popOver, close);

  const styles = {
    picker : {
      position: 'relative',
    },
    selector: {
      width: '28px',
      height: '28px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
      cursor: 'pointer',
      backgroundColor: '#0000'
    },
    popover: {
      position: 'absolute',
      top: '100%',
      left: '0',
      zIndex: '10',
      background: '#fff',
      boxShadow: '0 0 4px 0 rgba(0,0,0,.14),0 4px 5px 0 rgba(0,0,0,.12),0 1px 10px 0 rgba(0,0,0,.2)',
      borderRadius: '2px',
      padding: '10px',
      boxSizing: 'border-box',
    },
  };

  return (
    <div style={styles.picker}>
      <div 
        style={{...styles.selector, backgroundColor: color}}
        onClick={() => setPopState(true)}
      />
      {popState && (
        <div style={styles.popover} ref={popOver}>
          <HexColorPicker color={color} onChange={onChange} />
          <HexColorInput color={color} onChange={onChange} />
        </div>   
      )}
    </div>
  )
};

export default ColorPicker;