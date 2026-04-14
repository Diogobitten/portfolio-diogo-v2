import { GitHubRepo, RepoMedia } from './types';
import { EXCLUDED_REPOS, TOP_REPOS } from './constants';

/**
 * Extracts media URLs (images and videos) from Markdown README content.
 * Parses ![alt](url) and <img src="url"> patterns.
 * Converts relative paths to absolute raw.githubusercontent.com URLs.
 * Preserves absolute URLs unchanged.
 */
export function extractMediaLinks(
  owner: string,
  repo: string,
  readmeContent: string
): RepoMedia[] {
  const media: RepoMedia[] = [];
  const seenUrls = new Set<string>();

  const videoExtensions = ['.mp4', '.webm'];

  function resolveUrl(rawUrl: string): string {
    const trimmed = rawUrl.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }
    // Remove leading ./ if present
    const cleanPath = trimmed.replace(/^\.\//, '');
    return `https://raw.githubusercontent.com/${owner}/${repo}/main/${cleanPath}`;
  }

  function getMediaType(url: string): 'image' | 'video' {
    const lower = url.toLowerCase().split('?')[0].split('#')[0];
    if (videoExtensions.some((ext) => lower.endsWith(ext))) {
      return 'video';
    }
    return 'image';
  }

  function addMedia(url: string) {
    const resolved = resolveUrl(url);
    if (!seenUrls.has(resolved)) {
      seenUrls.add(resolved);
      media.push({ url: resolved, type: getMediaType(resolved) });
    }
  }

  // Parse ![alt](url) patterns
  const markdownImageRegex = /!\[.*?\]\((.*?)\)/g;
  let match: RegExpExecArray | null;
  while ((match = markdownImageRegex.exec(readmeContent)) !== null) {
    if (match[1]) {
      addMedia(match[1]);
    }
  }

  // Parse <img src="url"> patterns (single or double quotes)
  const imgTagRegex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
  while ((match = imgTagRegex.exec(readmeContent)) !== null) {
    if (match[1]) {
      addMedia(match[1]);
    }
  }

  // Parse standalone video URLs (.mp4, .webm, .gif) that aren't already captured
  const urlRegex = /(https?:\/\/[^\s)"'<>]+\.(?:mp4|webm|gif))(?:\s|$|[)"'<>])/gi;
  while ((match = urlRegex.exec(readmeContent)) !== null) {
    if (match[1]) {
      addMedia(match[1]);
    }
  }

  return media;
}


/**
 * Filters out repos whose name is in EXCLUDED_REPOS.
 */
export function filterRepos(repos: GitHubRepo[]): GitHubRepo[] {
  return repos.filter((repo) => !EXCLUDED_REPOS.includes(repo.name));
}

/**
 * Returns only repos whose name is in TOP_REPOS, maintaining TOP_REPOS order.
 */
export function getTopRepos(repos: GitHubRepo[]): GitHubRepo[] {
  return TOP_REPOS.map((name) => repos.find((repo) => repo.name === name)).filter(
    (repo): repo is GitHubRepo => repo !== undefined
  );
}
