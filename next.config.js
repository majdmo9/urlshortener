/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URL: "mysql://johndoe:randompassword@localhost:3306/mydb",
    NEXT_PUBLIC_API_URL: "http://localhost:3000",
  },
};

module.exports = nextConfig;
