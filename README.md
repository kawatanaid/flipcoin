# Coin Flip Simulator

This is a Next.js project that simulates coin flipping and includes various probability-based games.

## Deploying on Netlify

To deploy this project on Netlify, follow these steps:

1. Push your code to a GitHub repository.

2. Log in to your Netlify account and click "New site from Git".

3. Choose GitHub as your Git provider and select your repository.

4. In the deploy settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

5. Click "Deploy site".

6. In your site settings on Netlify, go to "Build & deploy" > "Environment":
   - Add the following environment variable:
     - Key: `NEXT_PUBLIC_SITE_URL`
     - Value: Your Netlify site's URL (e.g., https://your-site-name.netlify.app)

7. Trigger a new deploy for the changes to take effect.

## Troubleshooting Deployment Issues

If you encounter any issues during deployment, try the following:

1. Clear the Netlify cache and redeploy.
2. Ensure all dependencies in `package.json` are compatible.
3. Check the Netlify logs for any specific error messages.

## Local Development

To run this project locally:

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build

To build the project for production:

