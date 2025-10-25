import React from 'react';

const TailwindIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-3.5 7c-2.484 0-4.5 2.016-4.5 4.5s2.016 4.5 4.5 4.5c1.23 0 2.34-.492 3.162-1.299.822.807 1.933 1.299 3.162 1.299 2.484 0 4.5-2.016 4.5-4.5s-2.016-4.5-4.5-4.5c-1.23 0-2.34.492-3.162 1.299C10.84 9.493 9.73 9 8.5 9z"/>
  </svg>
);

export default TailwindIcon;