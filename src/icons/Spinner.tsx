import { IconProps } from '.';

import './../styles/spinner.scss';

const SpinnerIcon = (props: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className="spinner"
    >
      <path
        opacity="0.2"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 1C11 0.447715 11.4477 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12C24 12.5523 23.5523 13 23 13C22.4477 13 22 12.5523 22 12C22 9.34783 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2C11.4477 2 11 1.55228 11 1Z"
        fill="black"
      />
    </svg>
  );
};

export default SpinnerIcon;
