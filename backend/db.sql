CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- UUID table
CREATE TABLE uuid_entity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Timestamp table
CREATE TABLE timestamp_entity (
  id BIGINT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_uuid_entity_created_at ON uuid_entity(created_at);
CREATE INDEX idx_timestamp_entity_created_at ON timestamp_entity(created_at);