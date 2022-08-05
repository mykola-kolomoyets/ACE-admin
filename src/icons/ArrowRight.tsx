import { IconProps } from '.';

const ArrowRightIcon = (props: IconProps) => {
  return (
    <svg
      width="22"
      height="16"
      viewBox="0 0 22 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 8C0 7.44772 0.447715 7 1 7H21C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9H1C0.447715 9 0 8.55228 0 8Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.2929 0.292893C13.6834 -0.0976311 14.3166 -0.0976311 14.7071 0.292893L21.7071 7.29289C22.0976 7.68342 22.0976 8.31658 21.7071 8.70711L14.7071 15.7071C14.3166 16.0976 13.6834 16.0976 13.2929 15.7071C12.9024 15.3166 12.9024 14.6834 13.2929 14.2929L19.5858 8L13.2929 1.70711C12.9024 1.31658 12.9024 0.683417 13.2929 0.292893Z"
        fill="black"
      />
    </svg>
  );
};

export default ArrowRightIcon;
