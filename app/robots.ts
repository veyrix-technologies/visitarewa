import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Example: if you had an admin section
    },
    sitemap: 'https://visitarewa.com/sitemap.xml',
  }
}