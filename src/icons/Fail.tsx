import { IconProps } from '.';

const FailIcon = (props: IconProps) => {
  return (
    <svg
      width={props.width || '100%'}
      height={props.height || '100%'}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="96" height="96" rx="48" fill="#CC3300" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M63.4142 32.5858C64.1953 33.3668 64.1953 34.6332 63.4142 35.4142L35.4142 63.4142C34.6332 64.1953 33.3668 64.1953 32.5858 63.4142C31.8047 62.6332 31.8047 61.3668 32.5858 60.5858L60.5858 32.5858C61.3668 31.8047 62.6332 31.8047 63.4142 32.5858Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.5858 32.5858C33.3668 31.8047 34.6332 31.8047 35.4142 32.5858L63.4142 60.5858C64.1953 61.3668 64.1953 62.6332 63.4142 63.4142C62.6332 64.1953 61.3668 64.1953 60.5858 63.4142L32.5858 35.4142C31.8047 34.6332 31.8047 33.3668 32.5858 32.5858Z"
        fill="white"
      />
    </svg>
  );
};

export default FailIcon;
