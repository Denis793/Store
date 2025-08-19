import { useState } from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const [expanded, setExpanded] = useState(false);
  const partners = ['COMPANY 01', 'COMPANY 02', 'COMPANY 03', 'COMPANY 04', 'COMPANY 05', 'COMPANY 06'];
  const [showAllPartners, setShowAllPartners] = useState(false);
  const visiblePartners = showAllPartners ? partners : partners.slice(0, 3);

  return (
    <footer className="pt-16">
      <div className="bg-neutral-900 text-neutral-300">
        <div className="container pt-12 pb-8">
          <div className="grid gap-10">
            <div className="md:max-w-2xl md:mx-auto text-center">
              <h4 className="text-white font-semibold">STORE</h4>
              <p className="mt-3 text-sm text-neutral-400">
                A small river named Duden flows by their place and supplies it with the necessary regelialia.
                {expanded && (
                  <>
                    {' '}
                    It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the
                    all-powerful Pointing has no control about the blind texts.
                  </>
                )}
              </p>
              <button
                onClick={() => setExpanded((v) => !v)}
                className="mt-3 inline-block text-amber-400 text-sm hover:text-amber-300 transition"
              >
                {expanded ? 'read less ←' : 'read more →'}
              </button>
            </div>

            <div className="grid gap-8 md:grid-cols-2 text-center sm:text-left">
              <div className="grid sm:grid-cols-2 gap-8">
                <FooterCol title="Discover" links={['Buy & Sell', 'Merchant', 'Giving back', 'Help & Support']} />
                <FooterCol title="Resources" links={['Security', 'Global', 'Charts', 'Privacy']} />
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <FooterCol title="About" links={['Staff', 'Team', 'Careers', 'Blog']} />
                <div className="flex flex-col items-center sm:items-start">
                  <h5 className="text-white font-medium">Social</h5>
                  <div className="mt-3 flex flex-col sm:flex-col md:flex-row gap-3 text-xl items-center sm:items-start">
                    <a
                      href="https://www.linkedin.com/in/shevchenkodenys3/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white"
                    >
                      <FaLinkedin />
                    </a>
                    <a href="https://github.com/Denis793" target="_blank" rel="noreferrer" className="hover:text-white">
                      <FaGithub />
                    </a>
                    <a href="mailto:denys.shevchenko.pro@gmail.com" className="hover:text-white" aria-label="Email">
                      <EnvelopeIcon className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.instagram.com/denys__shevchenko__/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white"
                    >
                      <FaInstagram />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 text-xs text-neutral-400">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <span className="text-neutral-500">Our Partner:</span>
                  {visiblePartners.map((c) => (
                    <span key={c} className="before:content-['•'] before:mx-2 before:text-neutral-600">
                      {c}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllPartners((v) => !v)}
                  className="text-amber-400 hover:text-amber-300"
                  aria-expanded={showAllPartners}
                  aria-controls="partners-list"
                >
                  {showAllPartners ? 'See less ←' : 'See All →'}
                </button>
              </div>
            </div>

            {/* Bottom (centered) */}
            <div className="border-t border-white/10 pt-4 flex flex-col items-center gap-3 text-xs text-center">
              <p className="text-neutral-400">
                Copyright ©{new Date().getFullYear()} All rights reserved | Made with Denys by Store
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-white">
                  Terms
                </a>
                <a href="#" className="hover:text-white">
                  Privacy
                </a>
                <a href="#" className="hover:text-white">
                  Compliances
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="flex flex-col items-center sm:items-start">
      <h5 className="text-white font-medium">{title}</h5>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-neutral-400 hover:text-white">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
