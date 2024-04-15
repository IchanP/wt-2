/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   *
   * @param defaultPathMap
   * @param root0
   * @param root0.dev
   * @param root0.dir
   * @param root0.outDir
   * @param root0.distDir
   * @param root0.buildId
   */
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
      }, {})

    return pathMap
  }
}

export default nextConfig
