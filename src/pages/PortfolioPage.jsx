import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import projectsJson from '../data/projects.json'
import ProjectCard from '../components/ProjectCard.jsx'
import { useGitHubRepos } from '../hooks/useGitHubRepos.js'

const GITHUB_USERNAME = 'simonmrc'

export default function PortfolioPage() {
  const { repos, loading, error, retry } = useGitHubRepos(GITHUB_USERNAME)

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('recent')

  // 1) Normaliser JSON local
  const localProjects = useMemo(() => {
    return (projectsJson ?? []).map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      techs: p.techs ?? [],
      type: p.type ?? 'Projet',
      category: p.category ?? 'web',
      liveUrl: p.liveUrl ?? null,
      githubUrl: p.githubUrl ?? null,
      stars: p.stars ?? null,
      updatedAt: p.updatedAt ? new Date(p.updatedAt) : null,
      imageUrl: p.imageUrl ?? null,
      source: 'json',
    }))
  }, [])

  // 2) Fusion GitHub + JSON (anti-doublon : JSON prioritaire sur le même nom)
  const mergedProjects = useMemo(() => {
    const localByTitle = new Map(
      localProjects.map((p) => [p.title.toLowerCase(), p])
    )

    const filteredGitHub = repos.filter(
      (r) => !localByTitle.has(r.title.toLowerCase())
    )

    return [...localProjects, ...filteredGitHub]
  }, [localProjects, repos])

  const categories = useMemo(
    () => [
      { value: 'all', label: 'Tous' },
      { value: 'web', label: 'Web' },
      { value: 'mobile', label: 'Mobile' },
      { value: 'design', label: 'Design' },
      { value: 'stage', label: 'Stage' },
      { value: 'devops', label: 'DevOps' },
      { value: 'cloud', label: 'Cloud' },
      { value: 'backend', label: 'Backend' },
    ],
    []
  )

  const visibleProjects = useMemo(() => {
    const q = query.trim().toLowerCase()

    let list = mergedProjects

    if (category !== 'all') {
      if (category === 'stage') {
        list = list.filter((p) => (p.type ?? '').toLowerCase() === 'stage')
      } else {
        list = list.filter((p) => (p.category ?? '').toLowerCase() === category)
      }
    }

    if (q) {
      list = list.filter((p) => {
        const inTitle = (p.title ?? '').toLowerCase().includes(q)
        const inTechs = (p.techs ?? []).some((t) => t.toLowerCase().includes(q))
        return inTitle || inTechs
      })
    }

    if (sort === 'alpha') {
      list = [...list].sort((a, b) =>
        (a.title ?? '').localeCompare(b.title ?? '', 'fr')
      )
    } else {
      // recent
      list = [...list].sort((a, b) => {
        const da = a.updatedAt ? new Date(a.updatedAt).getTime() : 0
        const db = b.updatedAt ? new Date(b.updatedAt).getTime() : 0
        return db - da
      })
    }

    return list
  }, [category, mergedProjects, query, sort])

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Projets</h1>
          <p className="text-lg text-gray-300">
            Galerie hybride (GitHub + projets manuels), filtrable en temps réel.
          </p>
        </motion.section>

        {/* Controls */}
        <div className="max-w-6xl mx-auto mb-10 grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="block text-sm text-gray-300 mb-2">Recherche</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nom ou techno (ex: React, AWS...)"
              className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 text-white rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </label>

          <label className="block">
            <span className="block text-sm text-gray-300 mb-2">Catégorie</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 text-white rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="block text-sm text-gray-300 mb-2">Tri</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 text-white rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
            >
              <option value="recent">Plus récents</option>
              <option value="alpha">Alphabétique</option>
            </select>
          </label>
        </div>

        {/* Loading / Error / Empty states */}
        {loading && (
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-[220px] rounded-lg bg-cyan-500/5 border border-cyan-500/20 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="max-w-2xl mx-auto p-6 rounded-lg bg-red-500/10 border border-red-500/30 text-red-200 text-center">
            <p className="font-semibold mb-2">Erreur de chargement GitHub</p>
            <p className="text-sm mb-4">{error}</p>
            <button
              onClick={retry}
              className="px-6 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 transition-colors"
            >
              Réessayer
            </button>
          </div>
        )}

        {!loading && !error && visibleProjects.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            Aucun projet ne correspond à ta recherche.
          </div>
        )}

        {!loading && !error && visibleProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-8 max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
