import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const candidates = [
  path.resolve('prisma/schema.prisma'),
  path.resolve(__dirname, '../prisma/schema.prisma'),
  path.resolve('backend/prisma/schema.prisma'),
];

const schemaPath = candidates.find((p) => fs.existsSync(p));

if (schemaPath) {
  let schema = fs.readFileSync(schemaPath, 'utf8');
  const dbUrl = process.env.DATABASE_URL || '';

  if (dbUrl.startsWith('postgres://') || dbUrl.startsWith('postgresql://')) {
    console.log(`🔄 Detected PostgreSQL DATABASE_URL. Configuring ${schemaPath} provider to "postgresql"...`);
    schema = schema.replace(/provider\s*=\s*"sqlite"/, 'provider = "postgresql"');
    fs.writeFileSync(schemaPath, schema);
    console.log('✔ Prisma schema successfully configured for PostgreSQL.');
  } else {
    console.log('ℹ SQLite / local database detected. Provider remains "sqlite".');
  }
} else {
  console.warn('⚠️ Could not locate prisma/schema.prisma');
}
