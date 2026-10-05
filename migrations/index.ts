import * as migration_20260906_164050 from './20260906_164050';
import * as migration_20261003_tool_content_article from './20261003_tool_content_article';

export const migrations = [
  {
    up: migration_20260906_164050.up,
    down: migration_20260906_164050.down,
    name: '20260906_164050'
  },
  {
    up: migration_20261003_tool_content_article.up,
    down: migration_20261003_tool_content_article.down,
    name: '20261003_tool_content_article'
  },
];
