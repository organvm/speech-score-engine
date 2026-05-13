BEGIN;

CREATE TABLE scene_version (
  version_id UUID PRIMARY KEY,
  scene_id UUID NOT NULL REFERENCES scene(scene_id),
  version_label TEXT,
  raw_text_snapshot TEXT NOT NULL,
  parsed_state_snapshot JSONB NOT NULL,
  settings_snapshot JSONB NOT NULL,
  estimated_duration_ms INTEGER,
  created_by_user_id UUID NOT NULL REFERENCES app_user(user_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE version_line (
  version_line_id UUID PRIMARY KEY,
  version_id UUID NOT NULL REFERENCES scene_version(version_id),
  speaker_id UUID REFERENCES speaker(speaker_id),
  line_index INTEGER NOT NULL,
  text_content TEXT NOT NULL,
  is_stage_direction BOOLEAN NOT NULL DEFAULT FALSE,
  pause_after_ms INTEGER,
  emphasis_hint TEXT,
  estimated_duration_ms INTEGER,
  structural_tags JSONB,
  UNIQUE(version_id, line_index)
);

CREATE INDEX idx_scene_version_scene_id ON scene_version(scene_id);
CREATE INDEX idx_version_line_version_id ON version_line(version_id);

COMMIT;
