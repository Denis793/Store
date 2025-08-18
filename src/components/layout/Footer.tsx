export default function Footer() {
  return (
    <footer className="pt-16">
      <div className="bg-neutral-900 text-neutral-300">
        <div className="container pt-12 pb-8">
          <div className="grid gap-8 md:grid-cols-5">
            <div className="md:col-span-2">
              <h4 className="text-white font-semibold">STORE</h4>
              <p className="mt-3 text-sm text-neutral-400">
                A small river named Duden flows by their place and supplies it with the necessary regelialia.
              </p>
              <a href="#" className="mt-3 inline-block text-amber-400 text-sm">
                read more →
              </a>
            </div>

            <FooterCol title="Discover" links={['Buy & Sell', 'Merchant', 'Giving back', 'Help & Support']} />
            <FooterCol title="About" links={['Staff', 'Team', 'Careers', 'Blog']} />
            <FooterCol title="Resources" links={['Security', 'Global', 'Charts', 'Privacy']} />
            <FooterCol title="Social" links={['Facebook', 'Twitter', 'Instagram', 'YouTube']} />
          </div>

          <div className="mt-8 border-t border-white/10 pt-4 text-xs text-neutral-400">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-neutral-500">Our Partner:</span>
                {['COMPANY 01', 'COMPANY 02', 'COMPANY 03', 'COMPANY 04', 'COMPANY 05', 'COMPANY 06'].map((c) => (
                  <span key={c} className="before:content-['•'] before:mx-2 before:text-neutral-600">
                    {c}
                  </span>
                ))}
              </div>
              <a href="#" className="text-amber-400">
                See All →
              </a>
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
            <p className="text-neutral-400">
              Copyright ©{new Date().getFullYear()} All rights reserved | Made with ♥ by Store
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
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
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
