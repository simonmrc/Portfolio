import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const skills = [
    { category: 'Systèmes', items: ['Linux (RedHat, Ubuntu, CentOS)', 'Windows Server', 'macOS', 'Docker', 'Kubernetes'] },
    { category: 'Réseaux', items: ['TCP/IP', 'DNS', 'DHCP', 'VPN', 'Firewalls', 'Load Balancing'] },
    { category: 'Cloud', items: ['AWS', 'Azure', 'GCP', 'Terraform', 'CloudFormation'] },
    { category: 'Outils', items: ['Ansible', 'Puppet', 'Git', 'Jenkins', 'Monitoring (Prometheus, ELK)'] },
  ];

  const experience = [
    { years: '2023 - Présent', role: 'Administrateur Systèmes/Réseaux', company: 'Imagine Soft' },
    { years: '2021 - Présent', role: 'Manager', company: 'Steak n Shake, Borély' },
    { years: '2017-2020', role: 'Baccalauréat ES', company: 'Honoré Daumier,13008' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mb-20 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">À propos de moi</h1>
          <p className="text-lg text-gray-300">
            Passionné par les technologies, avec plus de 3 ans d'expérience dans l'administration système et réseau.
          </p>
        </motion.section>

        {/* Bio */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          className="max-w-3xl mx-auto mb-20 grid md:grid-cols-2 gap-12"
        >
          <motion.div variants={item}>
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Qui je suis</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Expert en infrastructure IT avec une spécialisation en administration de systèmes Linux et Windows, 
              sécurité réseau et cloud computing.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Je suis passionné par les défis techniques et j'adore trouver des solutions innovantes 
              pour optimiser les performances et la sécurité des infrastructures.
            </p>
          </motion.div>

          <motion.div variants={item}>
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Ma vision</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Créer des infrastructures robustes, scalables et sécurisées qui soutiennent la croissance 
              des organisations modernes.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Je crois en l'importance de l'automatisation et des bonnes pratiques DevOps pour 
              améliorer l'efficacité opérationnelle.
            </p>
          </motion.div>
        </motion.section>

        {/* Experience */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          className="max-w-3xl mx-auto mb-20"
        >
          <motion.h2 variants={item} className="text-2xl font-bold mb-8 text-cyan-400">
            Expérience
          </motion.h2>
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="border-l-2 border-cyan-500 pl-6 pb-6"
              >
                <p className="text-cyan-400 text-sm font-semibold">{exp.years}</p>
                <h3 className="text-xl font-bold mt-1">{exp.role}</h3>
                <p className="text-gray-400">{exp.company}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          className="max-w-5xl mx-auto"
        >
          <motion.h2 variants={item} className="text-2xl font-bold mb-8 text-cyan-400">
            Compétences
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skillGroup, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="bg-cyan-500/5 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500/60 transition-all"
              >
                <h3 className="font-bold text-cyan-400 mb-4">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, sidx) => (
                    <li key={sidx} className="text-gray-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mt-20 pt-12 border-t border-cyan-500/20"
        >
          <h2 className="text-2xl font-bold mb-4">Prêt à collaborer?</h2>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105"
          >
            Let's Connect
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
