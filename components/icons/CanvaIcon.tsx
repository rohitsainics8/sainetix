import React from 'react';

const CanvaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm-.09 12.38a2.53 2.53 0 0 1-2.61-2.45V10a2.53 2.53 0 0 1 5.06 0v1.93a2.53 2.53 0 0 1-2.45 2.45z"/>
    <circle cx="11.91" cy="11.81" r="1.14"/>
  </svg>
);

export default CanvaIcon;