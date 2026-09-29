import * as migration_20260906_164050 from './20260906_164050';

export const migrations = [
  {
    up: migration_20260906_164050.up,
    down: migration_20260906_164050.down,
    name: '20260906_164050'
  },
];
