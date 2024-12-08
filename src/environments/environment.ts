export const environment = {
  production: false,
  api: {
    host: 'https://api.athleticspodium.com',
    // host: 'http://localhost:3001',
    version: '1.0',
  },
  cdn: {
    host: 'https://api.athleticspodium.com',
    media: {
      athletes: 'media/athletes',
      champs: 'media/champs',
      articles: 'media/articles',
    },
  },
  analytics: {
    trackerId: 'G-7EDH9146FP',
  },
  socialMedia: {
    bluesky: 'https://bsky.app/profile/athleticspodium.bsky.social',
    facebook: 'https://www.facebook.com/athleticspodium',
    instagram: 'https://www.instagram.com/athleticspodium',
  },
};
