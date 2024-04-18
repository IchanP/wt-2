/* eslint-disable jsdoc/require-jsdoc */
import { allowedHosts } from './config/allowedhosts.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: allowedHosts
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
  // Filter out API routes
    const pathMap = Object.keys(defaultPathMap)
      .filter(path => !path.includes('/api/'))
      .reduce((paths, path) => {
        paths[path] = defaultPathMap[path]
        return paths
      }, { })
    return pathMap
  }
}
export default nextConfig
