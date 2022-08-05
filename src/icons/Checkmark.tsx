import { IconProps } from '.';

const CheckmarkIcon = (props: IconProps) => {
  return (
    <svg
      width="16"
      height="11"
      viewBox="0 0 16 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.1382 0.528758C15.3985 0.789108 15.3985 1.21122 15.1382 1.47157L6.47149 10.1382C6.21114 10.3986 5.78903 10.3986 5.52868 10.1382L0.86201 5.47157C0.601661 5.21122 0.601661 4.78911 0.86201 4.52876C1.12236 4.26841 1.54447 4.26841 1.80482 4.52876L6.00008 8.72402L14.1953 0.528758C14.4557 0.268409 14.8778 0.268409 15.1382 0.528758Z"
        fill="white"
      />
    </svg>
  );
};

export default CheckmarkIcon;
