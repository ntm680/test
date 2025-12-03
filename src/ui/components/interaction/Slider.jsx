import React, { useState, useRef, useCallback } from 'react';

const Slider = ({ id, label, value, min = 0, max = 100, warning = false, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const sliderValue = ((value - min) / (max - min)) * 100;

  const sliderStyle = {
    background: `linear-gradient(to right, #00d4ff 0%, #00a8cc ${sliderValue}%, #1a1a25 ${sliderValue}%, #1a1a25 100%)`,
  };

  const handleChange = (e) => {
    e.stopPropagation();
    onChange(parseInt(e.target.value));
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const startDragging = useCallback(() => setIsDragging(true), []);
  const stopDragging = useCallback(() => setIsDragging(false), []);

  const handleMouseDown = useCallback(
    (e) => {
      e.stopPropagation();
      startDragging();
    },
    [startDragging]
  );

  const handleTouchStart = useCallback(
    (e) => {
      e.stopPropagation();
      startDragging();
    },
    [startDragging]
  );

  const handleMouseUp = useCallback(
    (e) => {
      if (e) {
        e.stopPropagation();
      }
      stopDragging();
    },
    [stopDragging]
  );

  const handleTouchEnd = useCallback(
    (e) => {
      if (e) {
        e.stopPropagation();
      }
      stopDragging();
    },
    [stopDragging]
  );

  return (
    <div className="checkbox-item slider-container" onClick={handleClick}>
      <label
        htmlFor={id}
        style={{
          color: '#8888aa',
          fontSize: '0.75rem',
          cursor: 'default',
          pointerEvents: 'none',
          flex: 1,
        }}
      >
        {label}
      </label>
      <span
        style={{
          color: '#00d4ff',
          fontSize: '0.7rem',
          fontWeight: '600',
          minWidth: '2rem',
          textAlign: 'right',
          marginRight: '0.5rem',
        }}
      >
        {value}
      </span>
      <input
        ref={sliderRef}
        type="range"
        className={`slider ${isDragging ? 'slider-dragging' : ''}`}
        id={id}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        onInput={handleChange}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        style={sliderStyle}
      />
      {warning && (
        <span className="risky-label" style={{ marginLeft: '0.5rem' }}>
          RISKY
        </span>
      )}
    </div>
  );
};

export const WarningSlider = (props) => {
  const currentValue = props.value;
  return (
    <Slider
      {...props}
      value={currentValue}
      warning={props.shouldWarning?.(currentValue) ?? false}
    />
  );
};

export default Slider;
