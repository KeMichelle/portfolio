type GitHubEvent = {
  type: string;
  repo?: {
    name?: string;
  };
  created_at?: string;
  payload?: {
    commits?: Array<{
      sha?: string;
      message?: string;
    }>;
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

export default defineCachedEventHandler(
  async () => {
    const username = 'KeMichelle';

    try {
      const events = await $fetch<GitHubEvent[]>(
        `https://api.github.com/users/${username}/events/public`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
            'User-Agent': 'michelle-portfolio',
          },
        },
      );

      const commits = events
        .filter((event) => event.type === 'PushEvent')
        .flatMap((event) => {
          const repoName = event.repo?.name;
          const createdAt = event.created_at;

          if (!repoName || !createdAt) {
            return [];
          }

          return (event.payload?.commits ?? []).map((commit) => {
            const sha = commit.sha?.slice(0, 7) ?? 'unknown';

            return {
              id: `${repoName}-${commit.sha ?? sha}`,
              repo: repoName,
              repoLabel: repoName.split('/').pop() ?? repoName,
              message: commit.message?.split('\n')[0] ?? 'Update commit',
              sha,
              createdAt,
              url: `https://github.com/${repoName}/commit/${commit.sha}`,
            } satisfies CommitFeedItem;
          });
        })
        .slice(0, 6);

      return {
        commits,
        profileUrl: `https://github.com/${username}`,
      };
    } catch {
      // GitHub public events are rate-limited and only expose a short recent window.
      return {
        commits: [] as CommitFeedItem[],
        profileUrl: `https://github.com/${username}`,
      };
    }
  },
  {
    maxAge: 60 * 5,
  },
);