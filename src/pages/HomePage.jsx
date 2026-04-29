import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Simon MARC';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="min-h-screen pt-20 pb-20 relative overflow-hidden flex items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl mx-auto text-center"
        >
          {/* Main Heading */}
          <motion.div variants={item} className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                {displayedText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="text-lg md:text-xl text-gray-300 mb-4"
          >
            Alternant en administration système et réseau, passionné par l'infrastructure IT, l'automatisation et la cybersécurité.
          </motion.p>

          {/* Description */}
          <motion.p
            variants={item}
            className="text-base md:text-lg text-gray-400 mb-12 leading-relaxed"
          >
            Actuellement en alternance chez Imagine Soft, où je contribue à la gestion et à l'optimisation de l'infrastructure IT, tout en développant mes compétences en administration système et réseau.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/projects"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105"
            >
              Voir Mon Portfolio
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-cyan-500 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 transition-all"
            >
              Me Contacter
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="grid grid-cols-3 gap-4 md:gap-8 mt-16 pt-12 border-t border-cyan-500/20"
          >
            {[
              { number: '3+', label: 'Années d\'expérience' },
              { number: '20+', label: 'Projets réalisés' },
              { number: '5', label: 'Certifications' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-2xl md:text-4xl font-bold text-cyan-400">
                  {stat.number}
                </p>
                <p className="text-sm md:text-base text-gray-400 mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
