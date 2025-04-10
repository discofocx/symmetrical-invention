import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';

// Load Google font with swap display
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

// Load local fonts with block display to prevent FOIT
export const boska = localFont({
  src: [
    {
      path: '../../fonts/boska/Boska-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/boska/Boska-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-boska',
  display: 'block',
});

export const switzer = localFont({
  src: [
    {
      path: '../../fonts/switzer/Switzer-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/switzer/Switzer-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../fonts/switzer/Switzer-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-switzer',
  display: 'block',
});
