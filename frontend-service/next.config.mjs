/* eslint-disable jsdoc/require-jsdoc */
import { allowedHosts } from './config/allowedhosts.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: allowedHosts
  }
}
export default nextConfig
