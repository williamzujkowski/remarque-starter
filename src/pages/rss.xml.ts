import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export function GET(context: APIContext) {
  return rss({
    title: 'Your Site — Writing',
    description: 'Long-form essays.',
    site: context.site ?? 'https://example.com',
    items: [
      {
        title: 'Hello, World',
        pubDate: new Date('2026-07-20'),
        description: 'A placeholder essay demonstrating the Essay archetype.',
        link: '/writing/hello-world/',
      },
    ],
  });
}
