import type { ReactNode } from 'react';

export const metadata = {
  title: 'TrackApp Portal',
  description: 'View and explore track sessions',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
