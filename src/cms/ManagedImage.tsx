import React from 'react';
import { siteImage, useSite } from './store';
export function ManagedImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  useSite();
  return <img {...props} src={props.src ? siteImage(props.src) : undefined} />;
}
