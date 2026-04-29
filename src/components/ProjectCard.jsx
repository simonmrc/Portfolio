import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';

export default function ProjectCard({ project }) {
  const categoryColors = {
    web: 'from-blue-500 to-cyan-500',
    mobile: 'from-purple-500 to-pink-500',
    design: 'from-pink-500 to-rose-500',
    devops: 'from-amber-500 to-orange-500',
    cloud: 'from-green-500 to-emerald-500',
  };

  const categoryLabels = {
    web: 'Web',
    mobile: 'Mobile',
    design: 'Design',
    stage: 'Stage',
    devops: 'DevOps',
    cloud: 'Cloud',
  };

  const gradientClass = categoryColors[project.category] || 'from-cyan-500 to-blue-500';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group h-full"
    >
      <div className="h-full rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/20 hover:border-cyan-500/60 overflow-hidden transition-all hover:shadow-lg hover:shadow-cyan-500/20">
        
        {/* Category badge + stars */}
        <div className="flex items-start justify-between p-4 pb-2">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${gradientClass} text-white`}>
            {categoryLabels[project.category] || project.type}
          </span>
          {project.stars && (
            <div className="flex items-center gap-1 text-yellow-400 text-sm">
              <FiStar size={14} className="fill-current" />
              <span>{project.stars}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
            {project.title}
          </h3>
          
          <p className="text-sm text-gray-400 mt-2 line-clamp-3 min-h-[3.5rem]">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.techs && project.techs.slice(0, 3).map((tech, idx) => (
              <span 
                key={idx}
                className="text-xs bg-cyan-500/10 text-cyan-400 px-2.5 py-1 rounded-full border border-cyan-500/30"
              >
                {tech}
              </span>
            ))}
            {project.techs && project.techs.length > 3 && (
              <span className="text-xs text-gray-400 px-2.5 py-1">
                +{project.techs.length - 3}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-3 mt-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500 text-cyan-400 rounded-lg text-sm font-semibold transition-all"
              >
                {project.source === 'github' ? (
                  <>
                    <FiGithub size={16} />
                    GitHub
                  </>
                ) : (
                  <>
                    <FiExternalLink size={16} />
                    Voir
                  </>
                )}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-semibold transition-all"
              >
                <FiGithub size={16} />
              </a>
            )}
          </div>

          {/* Updated date for GitHub repos */}
          {project.updatedAt && (
            <p className="text-xs text-gray-500 mt-3 text-right">
              Mis à jour {formatDate(project.updatedAt)}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function formatDate(date) {
  const d = new Date(date);
  const now = new Date();
  const diff = Math.floor((now - d) / 1000); // en secondes

  if (diff < 3600) return 'il y a ' + Math.floor(diff / 60) + ' min';
  if (diff < 86400) return 'il y a ' + Math.floor(diff / 3600) + 'h';
  if (diff < 604800) return 'il y a ' + Math.floor(diff / 86400) + 'j';
  
  return d.toLocaleDateString('fr-FR');
}
