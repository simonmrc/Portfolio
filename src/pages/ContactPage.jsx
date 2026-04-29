import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

export default function ContactPage() {
  const formspreeUrl = import.meta.env.VITE_FORMSPREE_URL
  const vcardUrl = `${window.location.origin}/contact.vcf`

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'Opportunité',
    message: '',
  })

  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const errors = useMemo(() => validate(formData), [formData])
  const canSubmit = Object.keys(errors).length === 0 && status !== 'loading'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  async function submit() {
    if (!formspreeUrl) {
      throw new Error(
        "Formspree n'est pas configuré. Renseigne VITE_FORMSPREE_URL dans .env."
      )
    }

    const res = await fetch(formspreeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }),
    })

    if (!res.ok) {
      let details = ''
      try {
        const data = await res.json()
        details = data?.error || ''
      } catch {
        // ignore
      }
      throw new Error(details || `Erreur réseau (${res.status})`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      subject: true,
      message: true,
    })

    const nextErrors = validate(formData)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('loading')
    setErrorMessage('')
    try {
      await submit()
      setStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: 'Opportunité',
        message: '',
      })
      setTouched({})
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Erreur inconnue')
    }
  }

  const contacts = [
    { icon: '📧', label: 'Email', value: 'simonmarcpro@protonmail.com', href: 'mailto:admin@example.com' },
    { icon: '💼', label: 'LinkedIn', value: 'Simon MARC', href: 'https://www.linkedin.com/in/simon-m-23910026a' },
    { icon: '🐙', label: 'GitHub', value: 'simonmrc', href: 'https://github.com/simonmrc' },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-moi</h1>
          <p className="text-lg text-gray-300">
            Vous avez un projet d'infrastructure IT ou vous souhaitez discuter d'une collaboration?
          </p>
        </motion.section>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.section
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.h2 variants={item} className="text-2xl font-bold mb-8 text-cyan-400">
              Informations de contact
            </motion.h2>

            <div className="space-y-6">
              {contacts.map((contact, idx) => (
                <motion.a
                  key={idx}
                  variants={item}
                  href={contact.href}
                  className="flex items-start gap-4 p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20 hover:border-cyan-500/60 transition-all group"
                >
                  <div className="text-3xl mt-1">{contact.icon}</div>
                  <div>
                    <p className="font-semibold text-cyan-400 mb-1">{contact.label}</p>
                    <p className="text-gray-300 group-hover:text-cyan-400 transition-colors">
                      {contact.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div variants={item} className="mt-12 p-6 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
              <h3 className="font-bold mb-3 text-cyan-400">Disponibilité</h3>
              <p className="text-gray-300 text-sm">
                Je suis disponible pour de nouveaux projets et consultations. Réponse garantie sous 24h.
              </p>
            </motion.div>
          </motion.section>

          {/* Contact Form */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-cyan-400">Envoyez-moi un message</h2>

            <div className="mb-8 rounded-lg bg-cyan-500/5 border border-cyan-500/20 p-5">
              <p className="text-sm text-gray-300 mb-3">
                Scannez pour enregistrer mon contact
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="rounded-xl bg-white p-3">
                  <QRCodeCanvas
                    value={vcardUrl}
                    size={160}
                    fgColor="#1E3A5F"
                    level="H"
                    includeMargin
                  />
                </div>
                <div className="text-sm text-gray-300">
                  <p className="mb-2">
                    Alternative desktop :
                  </p>
                  <a
                    href="/contact.vcf"
                    download
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 transition-colors"
                  >
                    Télécharger la vCard
                  </a>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First / Last name */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 text-white rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Votre prénom"
                    autoComplete="given-name"
                  />
                  {touched.firstName && errors.firstName && (
                    <p className="mt-2 text-sm text-red-300">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 text-white rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Votre nom"
                    autoComplete="family-name"
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="mt-2 text-sm text-red-300">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 text-white rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="votre@email.com"
                  autoComplete="email"
                />
                {touched.email && errors.email && (
                  <p className="mt-2 text-sm text-red-300">{errors.email}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Sujet
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 text-white rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="Opportunité">Opportunité</option>
                  <option value="Question">Question</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Autre">Autre</option>
                </select>
                {touched.subject && errors.subject && (
                  <p className="mt-2 text-sm text-red-300">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="5"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 text-white rounded-lg focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  placeholder="Votre message (min. 20 caractères)..."
                />
                {touched.message && errors.message && (
                  <p className="mt-2 text-sm text-red-300">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Envoi…' : 'Envoyer le message'}
              </button>

              {/* Success Message */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg"
                >
                  ✓ Message envoyé avec succès!
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/30 text-red-200 rounded-lg flex items-start justify-between gap-4"
                >
                  <div>
                    <p className="font-semibold">Échec de l’envoi</p>
                    <p className="text-sm mt-1">{errorMessage}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle')
                      setErrorMessage('')
                    }}
                    className="shrink-0 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 transition-colors"
                  >
                    Réessayer
                  </button>
                </motion.div>
              )}
            </form>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

function validate(values) {
  const e = {}

  if (!values.firstName.trim()) e.firstName = 'Prénom requis.'
  if (!values.lastName.trim()) e.lastName = 'Nom requis.'

  const email = values.email.trim()
  if (!email) e.email = 'Email requis.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Email invalide.'

  if (!values.subject) e.subject = 'Sujet requis.'

  const msg = values.message.trim()
  if (!msg) e.message = 'Message requis.'
  else if (msg.length < 20) e.message = 'Minimum 20 caractères.'

  return e
}
