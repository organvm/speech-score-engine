BEGIN;

CREATE TABLE diagnostic_report (
  report_id UUID PRIMARY KEY,
  scene_id UUID NOT NULL REFERENCES scene(scene_id),
  version_id UUID NOT NULL REFERENCES scene_version(version_id),
  summary TEXT,
  metrics JSONB NOT NULL,
  flags JSONB NOT NULL,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE share_link (
  share_id UUID PRIMARY KEY,
  scene_id UUID NOT NULL REFERENCES scene(scene_id),
  version_id UUID NOT NULL REFERENCES scene_version(version_id),
  access_mode TEXT NOT NULL DEFAULT 'read_only',
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  created_by_user_id UUID NOT NULL REFERENCES app_user(user_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_diagnostic_report_version_id ON diagnostic_report(version_id);
CREATE INDEX idx_share_link_version_id ON share_link(version_id);

COMMIT;
