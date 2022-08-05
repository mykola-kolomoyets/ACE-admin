import { IconProps } from '.';

const BreadCrumbArrowIcon = (props: IconProps) => {
  return (
    <svg
      width="8"
      height="16"
      viewBox="0 0 8 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.195262 0.861766C0.455612 0.601417 0.877722 0.601417 1.13807 0.861766L7.80474 7.52843C8.06509 7.78878 8.06509 8.21089 7.80474 8.47124L1.13807 15.1379C0.877722 15.3983 0.455612 15.3983 0.195262 15.1379C-0.0650874 14.8776 -0.0650874 14.4554 0.195262 14.1951L6.39052 7.99984L0.195262 1.80458C-0.0650874 1.54423 -0.0650874 1.12212 0.195262 0.861766Z"
        fill="#808080"
      />
    </svg>
  );
};

export default BreadCrumbArrowIcon;
