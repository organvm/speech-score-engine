BEGIN;

CREATE TABLE render_profile (
  render_profile_id UUID PRIMARY KEY,
  scene_id UUID NOT NULL REFERENCES scene(scene_id),
  name TEXT NOT NULL,
  config JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE playback_render (
  render_id UUID PRIMARY KEY,
  scene_id UUID NOT NULL REFERENCES scene(scene_id),
  version_id UUID NOT NULL REFERENCES scene_version(version_id),
  render_profile_id UUID REFERENCES render_profile(render_profile_id),
  render_scope TEXT NOT NULL,
  scope_start_line_index INTEGER,
  scope_end_line_index INTEGER,
  audio_uri TEXT,
  waveform_uri TEXT,
  duration_ms INTEGER,
  render_status TEXT NOT NULL,
  provider_job_key TEXT,
  error_message TEXT,
  requested_by_user_id UUID NOT NULL REFERENCES app_user(user_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_playback_render_version_id ON playback_render(version_id);
CREATE INDEX idx_playback_render_status ON playback_render(render_status);

COMMIT;
