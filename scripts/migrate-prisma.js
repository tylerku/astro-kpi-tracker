require('dotenv').config();
const { execSync } = require('child_process');

const migrateUrl = process.env.MIGRATE_DATABASE_URL;
if (!migrateUrl) {
  console.error("MIGRATE_DATABASE_URL is not defined in .env");
  process.exit(1);
}

execSync(`npx prisma migrate dev`, {
  stdio: 'inherit',
  env: { ...process.env, DATABASE_URL: migrateUrl },
});