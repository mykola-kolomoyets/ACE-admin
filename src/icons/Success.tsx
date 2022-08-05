import { IconProps } from '.';

const SuccessIcon = (props: IconProps) => {
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="96" height="96" rx="48" fill="#28A745" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M69.4142 34.5858C70.1953 35.3668 70.1953 36.6332 69.4142 37.4142L43.4142 63.4142C42.6332 64.1953 41.3668 64.1953 40.5858 63.4142L26.5858 49.4142C25.8047 48.6332 25.8047 47.3668 26.5858 46.5858C27.3668 45.8047 28.6332 45.8047 29.4142 46.5858L42 59.1716L66.5858 34.5858C67.3668 33.8047 68.6332 33.8047 69.4142 34.5858Z"
        fill="white"
      />
    </svg>
  );
};

export default SuccessIcon;
