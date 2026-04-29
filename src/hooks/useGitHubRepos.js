import { useCallback, useEffect, useState } from 'react';

export function useGitHubRepos(username) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const retry = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    const fetchRepos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=30&sort=updated`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
            },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Utilisateur GitHub non trouvé');
          }
          throw new Error(`Erreur API GitHub (${response.status})`);
        }

        const data = await response.json();
        
        // Transformer les repos GitHub en format unifié
        const transformedRepos = data.map(repo => ({
          id: `github-${repo.id}`,
          title: repo.name,
          description: repo.description || 'Pas de description',
          techs: repo.language ? [repo.language] : [],
          type: 'GitHub',
          category: categorizeRepo(repo.name),
          liveUrl: repo.html_url,
          githubUrl: repo.html_url,
          stars: repo.stargazers_count,
          updatedAt: new Date(repo.updated_at),
          imageUrl: null,
          source: 'github',
        }));

        setRepos(transformedRepos);
      } catch (err) {
        setError(err.message);
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username, refreshKey]);

  return { repos, loading, error, retry };
}

// Fonction pour catégoriser les repos
function categorizeRepo(repoName) {
  const name = repoName.toLowerCase();
  
  if (name.includes('backend') || name.includes('api') || name.includes('server')) {
    return 'backend';
  }
  if (name.includes('frontend') || name.includes('react') || name.includes('vue')) {
    return 'web';
  }
  if (name.includes('mobile') || name.includes('react-native')) {
    return 'mobile';
  }
  if (name.includes('terraform') || name.includes('ansible') || name.includes('docker')) {
    return 'devops';
  }
  if (name.includes('aws') || name.includes('cloud')) {
    return 'cloud';
  }
  
  return 'web';
}
