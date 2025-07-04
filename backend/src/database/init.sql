-- Database initialization for production
-- This will be run automatically when synchronize is disabled

-- Enable UUID extension (if not exists)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tables will be automatically created by TypeORM entities
-- when the application starts (due to autoLoadEntities: true)
