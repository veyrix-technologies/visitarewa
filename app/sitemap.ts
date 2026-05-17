import { MetadataRoute } from 'next'
import { destinations, events, people, dishes, languages, crafts } from '@/lib/data' // Import your data

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
      url: `${baseUrl}/people`, // The main Excellence listing page
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
    {
      url: `${baseUrl}/crafts`, // The main crafts listing page
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/crafts/submit`, // The story submission page
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/map`, // The interactive map explorer page
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/destinations`, // The main destinations listing page
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
    url: `${baseUrl}/food/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))


  // 6. Generate URLs for Languages
  const languagesUrls = languages.map((item) => ({
    url: `${baseUrl}/languages/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))


  // 7. Generate URLs for Crafts
  const craftsUrls = crafts.map((item) => ({
    url: `${baseUrl}/crafts/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))


  // 8. Combine everything into one big list
  return [
    ...staticPages,
    ...destinationUrls,
    ...peopleUrls,
    ...dishesUrls,
    ...languagesUrls,
    ...eventUrls,
    ...craftsUrls,
  ]
}