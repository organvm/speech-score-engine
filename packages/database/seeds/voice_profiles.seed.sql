-- Voice profile catalog for local development.
-- Idempotent: re-running against an existing DB does nothing.
-- Stable UUIDs so demo URLs and tests can bookmark specific voices.

BEGIN;

INSERT INTO voice_profile (
  voice_profile_id, provider_key, provider_voice_key, display_name,
  timbre_class, gender_presentation, locale_code,
  default_speech_rate, default_pitch_offset, is_active
) VALUES
  ('11111111-1111-1111-1111-000000000001', 'mock',       'mock-tenor',         'Mock — Tenor',                'warm',     'masc-presenting', 'en-US', 1.00, 0.00, TRUE),
  ('11111111-1111-1111-1111-000000000002', 'mock',       'mock-alto',          'Mock — Alto',                 'warm',     'fem-presenting',  'en-US', 1.00, 0.00, TRUE),
  ('11111111-1111-1111-1111-000000000003', 'mock',       'mock-baritone',      'Mock — Baritone',             'resonant', 'masc-presenting', 'en-US', 0.96, -1.50, TRUE),
  ('11111111-1111-1111-1111-000000000004', 'mock',       'mock-soprano',       'Mock — Soprano',              'bright',   'fem-presenting',  'en-US', 1.02, 2.00, TRUE),
  ('11111111-1111-1111-1111-000000000005', 'mock',       'mock-narrator',      'Mock — Narrator',             'neutral',  'neutral',         'en-US', 0.94, 0.00, TRUE),
  ('22222222-2222-2222-2222-000000000001', 'elevenlabs', 'placeholder-voice-1', 'ElevenLabs — Placeholder 1', 'warm',     'fem-presenting',  'en-US', 1.00, 0.00, FALSE),
  ('22222222-2222-2222-2222-000000000002', 'elevenlabs', 'placeholder-voice-2', 'ElevenLabs — Placeholder 2', 'resonant', 'masc-presenting', 'en-US', 1.00, 0.00, FALSE)
ON CONFLICT (voice_profile_id) DO NOTHING;

COMMIT;
