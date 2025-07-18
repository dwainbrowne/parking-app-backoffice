# Security Advisors Group - Parking Enforcement Admin

## Cloudflare Pages Deployment

This project is configured for deployment to Cloudflare Pages with the following setup:

### Build Configuration
- Framework: Nuxt.js 3
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: 18+

### Environment Variables
Set these in your Cloudflare Pages dashboard:

- `NODE_VERSION=18`
- `NPM_VERSION=9`

### Deployment Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Deploy to Cloudflare Pages:**
   - Go to [Cloudflare Pages dashboard](https://dash.cloudflare.com/pages)
   - Create a new project
   - Connect your Git repository
   - Set build settings:
     - Build command: `npm run build`
     - Build output directory: `dist`
   - Deploy

### Local Development
```bash
npm run dev
```

### Features
- Responsive design with Tailwind CSS
- Vue.js 3 with Composition API
- Server-side rendering (SSR) with Nuxt.js
- Optimized for Cloudflare Pages deployment
