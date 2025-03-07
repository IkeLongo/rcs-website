declare module 'next-video' {
  import { FC } from 'react';

  interface VideoProps {
    src: string;
    className?: string;
    autoPlay?: boolean;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
    poster?: string;
    preload?: 'auto' | 'metadata' | 'none';
  }

  const Video: FC<VideoProps>;
  export default Video;
}