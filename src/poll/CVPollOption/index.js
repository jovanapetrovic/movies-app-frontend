import React from 'react';
import { Icon } from 'antd';
import './styles.css';

export default function CVPollOption({
  option,
  percentVote,
  isSelected,
  isWinner
}) {
  return (
    <div className="cv-poll-option">
      <span className="cv-poll-option-details">
        <span className="cv-option-percentage">
          {' '}
          {Math.round(percentVote * 100) / 100}%{' '}
        </span>
        <span className="cv-option-text"> {option.text} </span>
        {isSelected ? (
          <Icon className="selected-option-icon" type="check-circle-o" />
        ) : null}
      </span>
      <span
        className={
          isWinner
            ? 'cv-option-percent-chart winner'
            : 'cv-option-percent-chart'
        }
        style={{ width: percentVote + '%' }}
      />
    </div>
  );
}
