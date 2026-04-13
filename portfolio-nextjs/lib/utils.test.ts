import { describe, it, expect } from 'vitest';
import { extractMediaLinks, filterRepos, getTopRepos } from './utils';
import { GitHubRepo } from './types';
import { EXCLUDED_REPOS, TOP_REPOS } from './constants';

describe('extractMediaLinks', () => {
  const owner = 'testuser';
  const repo = 'testrepo';

  it('extracts markdown image links', () => {
    const content = '![screenshot](images/demo.png)';
    const result = extractMediaLinks(owner, repo, content);
    expect(result).toEqual([
      {
        url: `https://raw.githubusercontent.com/${owner}/${repo}/main/images/demo.png`,
        type: 'image',
      },
    ]);
  });

  it('preserves absolute URLs', () => {
    const content = '![demo](https://example.com/image.png)';
    const result = extractMediaLinks(owner, repo, content);
    expect(result).toEqual([
      { url: 'https://example.com/image.png', type: 'image' },
    ]);
  });

  it('detects video files (.mp4)', () => {
    const content = '![video](demo.mp4)';
    const result = extractMediaLinks(owner, repo, content);
    expect(result).toEqual([
      {
        url: `https://raw.githubusercontent.com/${owner}/${repo}/main/demo.mp4`,
        type: 'video',
      },
    ]);
  });

  it('detects .gif as video type', () => {
    const content = '![gif](animation.gif)';
    const result = extractMediaLinks(owner, repo, content);
    expect(result[0].type).toBe('video');
  });

  it('parses <img src="url"> tags', () => {
    const content = '<img src="screenshots/app.png" alt="app">';
    const result = extractMediaLinks(owner, repo, content);
    expect(result).toHaveLength(1);
    expect(result[0].url).toContain('screenshots/app.png');
    expect(result[0].type).toBe('image');
  });

  it('returns empty array for content with no media', () => {
    const content = '# Hello World\nThis is a readme with no images.';
    const result = extractMediaLinks(owner, repo, content);
    expect(result).toEqual([]);
  });

  it('deduplicates identical URLs', () => {
    const content = '![a](demo.png)\n![b](demo.png)';
    const result = extractMediaLinks(owner, repo, content);
    expect(result).toHaveLength(1);
  });

  it('handles relative paths with ./ prefix', () => {
    const content = '![img](./assets/photo.jpg)';
    const result = extractMediaLinks(owner, repo, content);
    expect(result[0].url).toBe(
      `https://raw.githubusercontent.com/${owner}/${repo}/main/assets/photo.jpg`
    );
  });
});

describe('filterRepos', () => {
  function makeRepo(name: string): GitHubRepo {
    return { name, description: null, html_url: `https://github.com/user/${name}`, owner: { login: 'user' } };
  }

  it('removes repos in EXCLUDED_REPOS', () => {
    const repos = [makeRepo('my-project'), makeRepo(EXCLUDED_REPOS[0]), makeRepo('another')];
    const result = filterRepos(repos);
    expect(result.map((r) => r.name)).toEqual(['my-project', 'another']);
  });

  it('returns all repos when none are excluded', () => {
    const repos = [makeRepo('project-a'), makeRepo('project-b')];
    const result = filterRepos(repos);
    expect(result).toHaveLength(2);
  });

  it('returns empty array for empty input', () => {
    expect(filterRepos([])).toEqual([]);
  });
});

describe('getTopRepos', () => {
  function makeRepo(name: string): GitHubRepo {
    return { name, description: null, html_url: `https://github.com/user/${name}`, owner: { login: 'user' } };
  }

  it('returns only TOP_REPOS in order', () => {
    const repos = [
      makeRepo('random'),
      makeRepo(TOP_REPOS[2]),
      makeRepo(TOP_REPOS[0]),
      makeRepo(TOP_REPOS[1]),
    ];
    const result = getTopRepos(repos);
    expect(result.map((r) => r.name)).toEqual(TOP_REPOS);
  });

  it('skips TOP_REPOS entries not found in input', () => {
    const repos = [makeRepo(TOP_REPOS[0])];
    const result = getTopRepos(repos);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe(TOP_REPOS[0]);
  });

  it('returns empty array when no top repos match', () => {
    const repos = [makeRepo('unrelated')];
    const result = getTopRepos(repos);
    expect(result).toEqual([]);
  });
});
