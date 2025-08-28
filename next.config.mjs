// import withVideos from 'next-videos';

// /** @type {import('next').NextConfig} */

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'aknmachine.com',
//         port: '',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'nutsroastermachine.com',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },
//   experimental: {
//     scrollRestoration: true,
//   },
// };

// export default withVideos(nextConfig);

// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build sırasında ESLint hatalarını görmezden gel
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TypeScript hatalarını görmezden gel
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aknmachine.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nutsroastermachine.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    scrollRestoration: true,
    // optimizeCss: true,
  },
};

export default nextConfig;