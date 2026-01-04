import Providers from './providers';
import React, {Suspense} from 'react';
// import '../styles/globals.css';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#ff5183] border-t-transparent"></div>
        </div>}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}

