-- Sample project + scene + speakers for local development.
-- Idempotent: re-running against an existing DB does nothing.
-- Requires voice_profiles.seed.sql to have run first (speakers reference voice_profiles).

BEGIN;

-- Demo user (no auth; for dev only).
INSERT INTO app_user (user_id, email, display_name, account_plan, created_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'demo@speech-score-engine.local',
  'Demo User',
  'free',
  NOW()
)
ON CONFLICT (user_id) DO NOTHING;

-- Demo project.
INSERT INTO project (project_id, owner_user_id, title, description, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000010',
  '00000000-0000-0000-0000-000000000001',
  'Demo Project',
  'A sample project for local development. Created by the seed runner.',
  NOW(),
  NOW()
)
ON CONFLICT (project_id) DO NOTHING;

-- Demo scene: a short alternating duet between A and B with one stage direction.
INSERT INTO scene (
  scene_id, project_id, title, raw_text_current, scene_status, created_at, updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000100',
  '00000000-0000-0000-0000-000000000010',
  'Alternating Duet',
  E'A: Are you sure about this?\nB: I am.\nA: We could still turn back.\nB: We could.\n[They keep walking.]\nA: I am not turning back.\nB: Good.',
  'draft',
  NOW(),
  NOW()
)
ON CONFLICT (scene_id) DO NOTHING;

-- Speakers for the demo scene, each bound to a mock voice profile.
INSERT INTO speaker (
  speaker_id, scene_id, display_label, sort_order, default_voice_profile_id, created_at
)
VALUES
  (
    '00000000-0000-0000-0000-000000001001',
    '00000000-0000-0000-0000-000000000100',
    'A',
    1,
    '11111111-1111-1111-1111-000000000001', -- mock-tenor
    NOW()
  ),
  (
    '00000000-0000-0000-0000-000000001002',
    '00000000-0000-0000-0000-000000000100',
    'B',
    2,
    '11111111-1111-1111-1111-000000000002', -- mock-alto
    NOW()
  )
ON CONFLICT (scene_id, display_label) DO NOTHING;

-- One render profile so future render demos have a default.
INSERT INTO render_profile (render_profile_id, scene_id, name, config, created_at)
VALUES (
  '00000000-0000-0000-0000-000000002001',
  '00000000-0000-0000-0000-000000000100',
  'rehearsal-mono',
  '{"output_format":"wav","sample_rate_hz":44100,"channels":1,"mix":"sequential"}'::jsonb,
  NOW()
)
ON CONFLICT (render_profile_id) DO NOTHING;

COMMIT;
