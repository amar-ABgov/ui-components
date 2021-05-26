import React from 'react';
import PropTypes from 'prop-types';
import './page-loader.scss';

type indicatorType = 'infinite' | 'progress';

export interface PageLoaderProps {
  /**
   * The type of page loader, deterministic and indeterministic.
   */
  type?: indicatorType;

  /**
   * The message to display while loading.
   */
  message?: string;

  /**
   * Sets the page loader visibility state.
   */
  visible?: boolean;

  /**
   * Sets the percentage value of the page loader while set to progress type, 0 - 100 percent.
   */
  value?: number;
}

export const GoAPageLoader = ({
  type = 'infinite',
  visible = false,
  message = 'Loading...',
  value = 0,
}: PageLoaderProps) => {
  /**
   * Set defaults
   */
  const progressMaxValue = 283;
  let strokeDashoffset = 0;

  /**
   * Sets the progress if in progress mode.
   * @param progress
   * @returns
   */
  function setProgress(progress: number) {
    if (type !== 'progress') {
      return;
    }

    if (progress === 0) {
      strokeDashoffset = progressMaxValue;
      return;
    }

    if (progress >= 100) {
      return;
    }

    const value =
      progressMaxValue - Math.round((progressMaxValue * progress) / 100);
    strokeDashoffset = value;
  }

  if (visible) {
    if (type === 'progress') {
      setProgress(value);
    }

    return (
      <div
        className="progress-container"
        onKeyDown={(event) => {
          event.preventDefault();
        }}
      >
        <svg
          fill="none"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className="base-circle" cx="50" cy="50" r="45" />
          <circle
            className={`${
              type === 'infinite'
                ? 'progress-circle--infinite'
                : 'progress-circle'
            }`}
            cx="50"
            cy="50"
            r="45"
            style={{ strokeDashoffset: strokeDashoffset }}
          />
        </svg>
        <span className="progress-message">{message}</span>
      </div>
    );
  } else {
    return null;
  }
};

GoAPageLoader.propTypes = {
  visible: PropTypes.bool,
  message: PropTypes.string,
  value: PropTypes.number,
};

export default GoAPageLoader;