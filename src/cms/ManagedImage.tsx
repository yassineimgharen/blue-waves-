import React from 'react';
import { imageKey, useSite } from './store';
export function ManagedImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { data } = useSite();
  return <img {...props} src={typeof props.src === 'string' ? (data.images[imageKey(props.src)] || props.src) : props.src} />;
}
