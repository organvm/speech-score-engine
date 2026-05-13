BEGIN;

CREATE TABLE app_user (
  user_id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  account_plan TEXT NOT NULL DEFAULT 'free',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_active_at TIMESTAMPTZ
);

CREATE TABLE project (
  project_id UUID PRIMARY KEY,
  owner_user_id UUID NOT NULL REFERENCES app_user(user_id),
  title TEXT NOT NULL,
  description TEXT,
  archived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE scene (
  scene_id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES project(project_id),
  title TEXT NOT NULL,
  raw_text_current TEXT NOT NULL DEFAULT '',
  parsed_state_current JSONB,
  working_settings_current JSONB,
  estimated_duration_ms_current INTEGER,
  scene_status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_project_owner_user_id ON project(owner_user_id);
CREATE INDEX idx_scene_project_id ON scene(project_id);

COMMIT;
