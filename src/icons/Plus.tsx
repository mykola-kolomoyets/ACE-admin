import { IconProps } from '.';

const PlusIcon = (props: IconProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 18V10M10 10V2M10 10H18M10 10H2"
        stroke={props.fill || '#808080'}
        strokeWidth="3"
      />
    </svg>
  );
};

export default PlusIcon;
