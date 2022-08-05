import { IconProps } from '.';

const SelectArrowIcon = (props: IconProps) => {
  return (
    <svg
      width="16"
      height="8"
      viewBox="0 0 16 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.86201 0.195262C1.12236 -0.0650874 1.54447 -0.0650874 1.80482 0.195262L8.00008 6.39052L14.1953 0.195262C14.4557 -0.0650874 14.8778 -0.0650874 15.1382 0.195262C15.3985 0.455612 15.3985 0.877722 15.1382 1.13807L8.47149 7.80474C8.21114 8.06509 7.78903 8.06509 7.52868 7.80474L0.86201 1.13807C0.601661 0.877722 0.601661 0.455612 0.86201 0.195262Z"
        fill="#808080"
      />
    </svg>
  );
};

export default SelectArrowIcon;
