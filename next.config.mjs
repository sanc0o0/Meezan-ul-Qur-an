/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
    turbopack: {
    root: process.cwd(),
  },
  
};

export default nextConfig;
