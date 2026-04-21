type GitHubEvent = {
  full_name: string;
  private?: boolean;
  owner?: {
    login?: string;
  };
};

type GitHubCommit = {
  sha?: string;
  html_url?: string;
  commit?: {
    message?: string;
    author?: {
      date?: string;
    };
  };
};

type CommitFeedItem = {
  id: string;
  repo: string;
  repoLabel: string;
  message: string;
  sha: string;
  createdAt: string;
  url: string;
};

type CommitFeedResponse = {
  commits: CommitFeedItem[];
  profileUrl: string;
  status: 'ok' | 'unavailable';
};

export default defineCachedEventHandler(
  async () => {
    const username = 'KeMichelle';
    const repoLimit = 6;
    const commitsPerRepo = 3;
    const { githubToken } = useRuntimeConfig();
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'michelle-portfolio',
    };

    if (githubToken) {
      headers.Authorization = `Bearer ${githubToken}`;
    }

    try {
      const repos = await $fetch<GitHubEvent[]>(
        `https://api.github.com/users/${username}/repos`,
        {
          query: {
            sort: 'pushed',
            per_page: repoLimit,
          },
          headers,
        },
      );

      const commitGroups = await Promise.all(
        repos
          .filter((repo) => !repo.private && repo.full_name)
          .map(async (repo) => {
            const commits = await $fetch<GitHubCommit[]>(
              `https://api.github.com/repos/${repo.full_name}/commits`,
              {
                query: {
                  author: username,
                  per_page: commitsPerRepo,
                },
                headers,
              },
            );

            return commits.map((commit) => {
              const sha = commit.sha?.slice(0, 7) ?? 'unknown';
              const createdAt = commit.commit?.author?.date ?? '';

              return {
                id: `${repo.full_name}-${commit.sha ?? sha}`,
                repo: repo.full_name,
                repoLabel: repo.full_name.split('/').pop() ?? repo.full_name,
                message:
                  commit.commit?.message?.split('\n')[0] ?? 'Update commit',
                sha,
                createdAt,
                url:
                  commit.html_url ??
                  `https://github.com/${repo.full_name}/commit/${commit.sha}`,
              } satisfies CommitFeedItem;
            });
          }),
      );

      const commits = commitGroups
        .flat()
        .filter((commit) => commit.createdAt)
        .sort(
          (left, right) =>
            new Date(right.createdAt).getTime() -
            new Date(left.createdAt).getTime(),
        )
        .slice(0, 3);

      return {
        commits,
        profileUrl: `https://github.com/${username}`,
        status: 'ok',
      } satisfies CommitFeedResponse;
    } catch {
      // Public GitHub API requests can still be rate-limited, so fail soft.
      return {
        commits: [] as CommitFeedItem[],
        profileUrl: `https://github.com/${username}`,
        status: 'unavailable',
      } satisfies CommitFeedResponse;
    }
  },
  {
    maxAge: 60 * 5,
  },
);
