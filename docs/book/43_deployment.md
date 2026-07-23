# Chapter 43: Deployment Architecture & PWA Manifest

## 43.1 Progressive Web Application Manifest (`public/manifest.json`)

```json
{
  "short_name": "HeartSync",
  "name": "HeartSync - Catatan & Monitoring Tensi",
  "icons": [
    {
      "src": "favicon.svg",
      "type": "image/svg+xml",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "background_color": "#ffffff",
  "theme_color": "#0f766e",
  "display": "standalone",
  "orientation": "portrait"
}
```

## 43.2 Static Host Compatibility
Because HeartSync builds into pure static assets (`dist/index.html`, JavaScript, and CSS bundles), it can be deployed instantly to any static hosting provider (Vercel, Netlify, GitHub Pages, Cloudflare Pages, AWS S3 / CloudFront) with zero server-side rendering or database backend setup required.
