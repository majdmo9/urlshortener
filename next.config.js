/** @type {import('next').NextConfig} */

const variables = [
  "POSTGRES_URL",
  "POSTGRES_PRISMA_URL",
  "POSTGRES_URL_NON_POOLING",
  "POSTGRES_USER",
  "POSTGRES_HOST",
  "POSTGRES_PASSWORD",
  "POSTGRES_DATABASE",
];

const envVariables = {};

variables.forEach(variable => {
  envVariables[variable] = process.env[variable];
});

const nextConfig = {
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    ...envVariables,
  },
};

module.exports = nextConfig;
