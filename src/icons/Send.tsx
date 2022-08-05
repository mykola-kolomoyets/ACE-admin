import { IconProps } from '.';

const SendIcon = (props: IconProps) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.1381 0.861766C14.3984 1.12212 14.3984 1.54423 14.1381 1.80458L6.80473 9.13791C6.54438 9.39826 6.12227 9.39826 5.86192 9.13791C5.60157 8.87756 5.60157 8.45545 5.86192 8.1951L13.1953 0.861766C13.4556 0.601417 13.8777 0.601417 14.1381 0.861766Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.1381 0.861785C14.3219 1.04566 14.3821 1.31966 14.2922 1.56366L9.62555 14.2303C9.53364 14.4798 9.3023 14.6508 9.03685 14.6655C8.7714 14.6802 8.52259 14.5358 8.4037 14.298L5.83641 9.16343L0.701842 6.59614C0.464054 6.47725 0.319636 6.22844 0.334338 5.96299C0.34904 5.69754 0.520051 5.4662 0.769515 5.37429L13.4362 0.707628C13.6802 0.617732 13.9542 0.677913 14.1381 0.861785ZM2.67639 6.0927L6.63146 8.07024C6.76048 8.13475 6.86509 8.23936 6.9296 8.36838L8.90714 12.3234L12.5417 2.4581L2.67639 6.0927Z"
        fill="white"
      />
    </svg>
  );
};

export default SendIcon;
