BEGIN;

CREATE TABLE voice_profile (
  voice_profile_id UUID PRIMARY KEY,
  provider_key TEXT NOT NULL,
  provider_voice_key TEXT NOT NULL,
  display_name TEXT NOT NULL,
  timbre_class TEXT,
  gender_presentation TEXT,
  locale_code TEXT,
  default_speech_rate NUMERIC(5,2),
  default_pitch_offset NUMERIC(5,2),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE speaker (
  speaker_id UUID PRIMARY KEY,
  scene_id UUID NOT NULL REFERENCES scene(scene_id),
  display_label TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  default_voice_profile_id UUID REFERENCES voice_profile(voice_profile_id),
  default_pacing_profile JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(scene_id, display_label)
);

CREATE INDEX idx_speaker_scene_id ON speaker(scene_id);

COMMIT;
