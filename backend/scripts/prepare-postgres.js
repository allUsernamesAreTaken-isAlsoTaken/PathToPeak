import fs from 'node:fs';
import path from 'node:path';

const schemaPath = path.resolve('prisma/schema.prisma');

if (fs.existsSync(schemaPath)) {
  let schema = fs.readFileSync(schemaPath, 'utf8');
  const dbUrl = process.env.DATABASE_URL || '';

  if (dbUrl.startsWith('postgres://') || dbUrl.startsWith('postgresql://')) {
    console.log('🔄 Detected PostgreSQL DATABASE_URL. Configuring Prisma schema provider to "postgresql"...');
    schema = schema.replace(/provider\s*=\s*"sqlite"/, 'provider = "postgresql"');
    fs.writeFileSync(schemaPath, schema);
    console.log('✔ Prisma schema successfully configured for PostgreSQL.');
  } else {
    console.log('ℹ SQLite / local database detected. Provider set to "sqlite".');
  }
}
