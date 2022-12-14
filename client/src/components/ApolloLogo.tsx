import { CSSProperties } from 'react';

interface ApolloLogoProps {
  className?: string;
  color?: CSSProperties['color'];
  size?: CSSProperties['width'];
}

const ApolloLogo = ({
  className,
  color = 'currentColor',
  size = '100%',
}: ApolloLogoProps) => {
  return (
    <svg
      aria-label="apollo logo"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 816 240"
      fill={color}
      width={size}
    >
      <path d="M166.22 158.36h-22l-25.27-71.7-14.19 39.22h21.84l6 17.07H99.43l-5.74 15.43h-22l35.1-91.1h24.31zm392.25 0v-17.07h-38.52v-74h-19.53v91.1zm112.57 0v-17.07h-38.5v-74h-19.56v91.1zM392.25 83.59a29.29 29.29 0 1 0 29.29 29.29 29.32 29.32 0 0 0-29.29-29.29m0-17.83a47.12 47.12 0 1 1-47.11 47.12 47.12 47.12 0 0 1 47.12-47.12zm368.57 17.83a29.29 29.29 0 1 0 29.29 29.29 29.32 29.32 0 0 0-29.29-29.29m0-17.83a47.12 47.12 0 1 1-47.12 47.12 47.12 47.12 0 0 1 47.12-47.12zm-466 31.38c0 16.19-13.12 29.87-29.32 29.87h-23.06v31.35h-19.4v-91.1h42.5c16.17 0 29.29 13.68 29.29 29.87zm-17.83 0c0-6.33-5.15-12-11.49-12h-23.06v24.04h23.1c6.31 0 11.47-5.71 11.47-12.05zm-70.71 88.87a5 5 0 0 0-4.09 2.12s-4.37 5-6.73 7.35a108.71 108.71 0 1 1-8.49-161.28 12.25 12.25 0 1 0 6.87-7.32 118.67 118.67 0 1 0 16 167.71 5 5 0 0 0-3.55-8.56z"></path>
    </svg>
  );
};

export default ApolloLogo;
