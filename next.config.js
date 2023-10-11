/** @type {import('next').NextConfig} */
const nextConfig = {}

//module.exports = nextConfig
module.exports = {

    async rewrites() { 
      return [ 
       //接口请求 前缀带上/api-text/
        { source: '/currency/:path*', destination: `https://api.mytokenapi.com/currency/:path*` }, 
        { source: '/v2.6/:path*', destination: `https://api.caiyunapp.com/v2.6/:path*` }
  
      ]
    },
    }
  
