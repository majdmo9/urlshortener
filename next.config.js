/** @type {import('next').NextConfig} */


It looks like you want to create variables in a JavaScript or Node.js environment based on the names provided. If you're using Node.js, you can use the following code to create variables based on the given pattern:

javascript
Copy code
const variables = [
  "POSTGRES_URL",
  "POSTGRES_PRISMA_URL",
  "POSTGRES_URL_NON_POOLING",
  "POSTGRES_USER",
  "POSTGRES_HOST",
  "POSTGRES_PASSWORD",
  "POSTGRES_DATABASE"
];

const envVariables = {};

variables.forEach(variable => {
  envVariables[variable] = process.env[variable];
});

const nextConfig = {
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    ...envVariables
  },
};

module.exports = nextConfig;
