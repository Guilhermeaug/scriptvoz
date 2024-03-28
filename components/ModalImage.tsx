"use client";

import ModalImageLib from 'react-modal-image';

export default function ModalImage({
  large,
  small,
  medium,
  alt,
  className,
  ...props
}: {
  large: string;
  small: string;
  medium: string;
  alt: string;
  className?: string;
  [key: string]: any;
}) {
  return (
    <ModalImageLib
      large={large}
      small={small}
      medium={medium}
      alt={alt}
      className={className}
      {...props}
    />
  );
}
