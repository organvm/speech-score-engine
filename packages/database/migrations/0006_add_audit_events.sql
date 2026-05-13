BEGIN;

CREATE TABLE audit_event (
  audit_event_id UUID PRIMARY KEY,
  user_id UUID REFERENCES app_user(user_id),
  scene_id UUID REFERENCES scene(scene_id),
  version_id UUID REFERENCES scene_version(version_id),
  event_type TEXT NOT NULL,
  event_payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_event_event_type ON audit_event(event_type);
CREATE INDEX idx_audit_event_scene_id ON audit_event(scene_id);
CREATE INDEX idx_audit_event_version_id ON audit_event(version_id);

COMMIT;
