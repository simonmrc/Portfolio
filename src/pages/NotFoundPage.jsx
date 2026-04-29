import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <p className="text-sm font-semibold text-cyan-400 mb-3">404</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Page introuvable</h1>
        <p className="text-gray-300 mb-10">
          L’URL demandée n’existe pas (ou a été déplacée).
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105"
        >
          Retour à l’accueil
        </Link>
      </div>
    </div>
  )
}

