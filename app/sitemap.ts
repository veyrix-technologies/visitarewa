import { MetadataRoute } from 'next'
import { destinations, events, people, dishes, languages } from '@/lib/data' // Import your data
import { url } from 'inspector'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://visitarewa.com'

  // 1. Define Static Pages (Main pages)
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/people`, // The main talent listing page
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`, // The main event listing page
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/languages`, // The main languages listing page
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/food`, // The main dishes listing page
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },

  ]

  // 2. Generate URLs for Destinations
  const destinationUrls = destinations.map((item) => ({
    url: `${baseUrl}/destinations/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // 3. Generate URLs for Events
  const eventUrls = events.map((item) => ({
    url: `${baseUrl}/events/${item.slug}`,
    lastModified: new Date(), // Or use specific event date if you want
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // 4. Generate URLs for People
  const peopleUrls = people.map((item) => ({
    url: `${baseUrl}/people/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))


  // 5. Generate URLs for Dishes
  const dishesUrls = dishes.map((item) => ({
    url: `${baseUrl}/people/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))


  // 6. Generate URLs for People
  const languagesUrls = languages.map((item) => ({
    url: `${baseUrl}/people/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))


  // 7. Combine everything into one big list
  return [
    ...staticPages,
    ...destinationUrls,
    ...peopleUrls,
    ...dishesUrls,
    ...languagesUrls,
    ...eventUrls,
  ]
}