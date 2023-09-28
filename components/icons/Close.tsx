import React from 'react';

export type IconProps = {
  className?: string;
  size?: number;
  color?: string;
}

const CloseIconComponent = ({className="w-24 h-24", size=30, color="#000"}: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={color} viewBox="0 0 24 24" width={`${size}px`} height={`${size}px`} className={className}>
    <g fill="none" fillRule="evenodd">
      <g fill={color} fillRule="nonzero">
        <path d="M12 10.586l4.293-4.293 1.414 1.414L13.414 12l4.293 4.293-1.414 1.414L12 13.414l-4.293 4.293-1.414-1.414L10.586 12 6.293 7.707l1.414-1.414L12 10.586z"/>
      </g>
    </g>
  </svg>
);

export default CloseIconComponent;
