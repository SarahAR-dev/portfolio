import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDown, ArrowRight, ArrowUpRight, ExternalLink, Github, Linkedin, Menu, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

type Project = {
  id: string;
  number: string;
  title: string;
  date: string;
  category: 'AI & Data' | 'Web & Mobile';
  description: string;
  details: string;
  tags: string[];
  screenshots?: string[];
  report?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    id: 'crop-classification',
    number: '01',
    title: 'Deep Learning crop classification',
    date: 'Academic project · 2025–2026',
    category: 'AI & Data',
    description: 'Multi-source satellite data, Sentinel-2 time-series preprocessing, MCTNet CNN–Transformer contribution, evaluation and confusion matrices.',
    details: 'Projet de recherche en Deep Learning pour classifier des cultures à partir de séries temporelles Sentinel-2. Le travail explore le prétraitement des données, les architectures CNN–Transformer, l’intégration des covariables environnementales et l’évaluation par matrices de confusion.',
    tags: ['Python', 'NumPy', 'Rasterio', 'Deep Learning', 'Computer Vision'],
    screenshots: ['/projects/crop-report.png'],
    report: '/projects/crop-classification-report.pdf',
  },
  {
    id: 'neurotech',
    number: '02',
    title: 'NeuroTech',
    date: 'Digital agency site · July 2026',
    category: 'Web & Mobile',
    description: 'A digital agency website shaped around a clear visual system, responsive interfaces and a focused delivery experience.',
    details: 'Site vitrine responsive conçu pour présenter des services Web, Mobile, IA et Data avec une identité digitale claire et une expérience de navigation orientée conversion.',
    tags: ['React', 'TypeScript', 'Vite', 'CSS', 'Vercel'],
    demo: 'https://neurotech-niqbwgtk3-sas-projects-c43e9223.vercel.app/',
  },
  {
    id: 'mechanicsmart',
    number: '03',
    title: 'MechanicSmart',
    date: 'Startup project · August 2026',
    category: 'Web & Mobile',
    description: 'A startup project incubated by USTHB_TechInnov for appointments, filtered mechanic search, dashboards, authentication, messaging, ratings and comments.',
    details: 'Prototype d’application mobile en cours de développement. Le parcours client permet de trouver un garage proche, réserver un créneau et communiquer avec le garagiste. Un parcours séparé accompagne les garages dans leur inscription et leur gestion.',
    tags: ['Flutter', 'Dart', 'Node.js', 'Express.js', 'PostgreSQL'],
    screenshots: ['/projects/mechanic-home.png', '/projects/mechanic-location.png', '/projects/mechanic-booking.png', '/projects/mechanic-signup.png', '/projects/mechanic-garage.png'],
  },
  {
    id: 'restaurant',
    number: '04',
    title: 'Restaurant Management',
    date: 'October–November 2025',
    category: 'Web & Mobile',
    description: 'A restaurant workflow covering orders, menus, reservations and voice ordering through a web application.',
    details: 'Application de gestion destinée aux restaurants : menus, prix, commandes, réservations et suivi des tables, avec une assistance vocale pour faciliter la prise de commande.',
    tags: ['Node.js', 'Next.js', 'Firebase', 'VAPI'],
    screenshots: [
  '/projects/restaurant-dishes.png',
  '/projects/restaurant-add-dish.png',
  '/projects/restaurant-drinks.png',
  '/projects/restaurant-accompaniments.png',
  '/projects/restaurant-orders.png',
  '/projects/restaurant-menu-2.png',
  '/projects/restaurant-menu-4.png',
],
  },
  {
    id: 'discover-algeria',
    number: '05',
    title: 'Discover Algeria',
    date: 'Mobile app · February–April 2025',
    category: 'Web & Mobile',
    description: 'A tourism mobile app with search by name or wilaya, geolocation, ratings and comments, offline mode, favorites and recommendations.',
    details: 'Application mobile touristique dédiée à la découverte de l’Algérie. Elle propose une recherche par lieu ou wilaya, une carte, la géolocalisation, les favoris, les évaluations, les commentaires et un mode hors ligne.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'SQL'],
    screenshots: ['/projects/discover-home.jpg', '/projects/discover-search.jpg', '/projects/discover-detail.jpg'],
  },
];

const skillGroups = [
  { label: 'Languages', items: ['C', 'Java', 'Python', 'SQL', 'Dart', 'JavaScript', 'TypeScript'] },
  { label: 'Front-end', items: ['HTML', 'CSS', 'React', 'Next.js', 'Flutter', 'Responsive Design'] },
  { label: 'Back-end', items: ['Node.js', 'Express.js', 'REST API', 'Firebase'] },
  { label: 'Data', items: ['PostgreSQL', 'MongoDB', 'SQLite', 'SQL Server', 'Firestore'] },
  { label: 'AI & Research', items: ['TensorFlow', 'Keras', 'NumPy', 'Matplotlib', 'Plotly', 'Jupyter', 'Deep Learning', 'Computer Vision', 'neural networks', 'satellite data'] },
  { label: 'Tools & Systems', items: ['Git', 'GitHub', 'Vercel', 'Streamlit', 'Selenium', 'VAPI', 'Linux', 'JADE'] },
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<'All' | Project['category']>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const visibleProjects = projects.filter((project) => filter === 'All' || project.category === filter);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="portfolio-shell">
      <section className="hero" id="top">
        <header className="topbar">
          <div className="container topbar-inner">
            <a className="wordmark" href="#top" data-testid="link-wordmark" onClick={closeMenu}>
              <span className="wordmark-mark" aria-hidden="true">SA</span>
              <span>Sarah Aribi</span>
            </a>
            <button
              className="menu-button"
              type="button"
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={menuOpen}
              data-testid="button-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={23} strokeWidth={1.5} /> : <Menu size={23} strokeWidth={1.5} />}
            </button>
            <nav className={`nav-links${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
              <a href="#work" data-testid="link-work" onClick={closeMenu}>Work</a>
              <a href="#experience" data-testid="link-experience" onClick={closeMenu}>Experience</a>
              <a href="#about" data-testid="link-about" onClick={closeMenu}>About</a>
              <a href="#contact" className="nav-contact" data-testid="link-contact-nav" onClick={closeMenu}>Let&apos;s connect</a>
              <a
  href={`${import.meta.env.BASE_URL}cv/sarah-aribi-cv.pdf`}
  className="nav-contact nav-cv"
  download
  onClick={closeMenu}
  data-testid="link-download-cv"
>
  Download my CV
</a>
            </nav>
          </div>
        </header>
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="live-dot" aria-hidden="true" /> AI Engineer · Full-Stack Developer</div>
            <h1>Building with <em>curiosity</em> &amp; care.</h1>
            <p className="hero-lede">
              I&apos;m Sarah, an AI Engineer and Full-Stack Developer turning ideas into reliable applications and intelligent solutions.
            </p>
            <div className="hero-actions">
              <a className="button-primary" href="#work" data-testid="button-explore-work">Explore my work <ArrowDown size={15} /></a>
              <a className="button-ghost" href="https://www.linkedin.com/in/sarah-aribi-8a9b48347/" target="_blank" rel="noreferrer" data-testid="link-linkedin-hero">Open to opportunities <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="hero-orbit" aria-label="Sarah Aribi's focus areas">
            <div className="orbit-ring" aria-hidden="true" />
            <div className="orbit-ring two" aria-hidden="true" />
            <div className="orbit-ring three" aria-hidden="true" />
            <div className="orbit-core"><div><strong>SA</strong><span>full-stack</span></div></div>
            <span className="orbit-label a">build / learn</span>
            <span className="orbit-label b">web + mobile</span>
            <span className="orbit-label c">artificial intelligence</span>
            <span className="orbit-node a" aria-hidden="true" />
            <span className="orbit-node b" aria-hidden="true" />
            <span className="orbit-node c" aria-hidden="true" />
          </div>
        </div>
        <div className="scroll-mark"><span>Scroll to explore</span></div>
      </section>

      <section className="intro" id="about">
        <div className="container intro-grid">
          <div>
            <div className="eyebrow">01 / A little context</div>
            <h2 className="section-title">Serious about the<br /><em>useful</em> details.</h2>
          </div>
          <div className="intro-copy">
            <p data-testid="text-profile">
                I&apos;m an AI Engineer and Full-Stack Developer focused on building reliable digital products and intelligent solutions. I turn complex ideas into practical applications that solve real-world problems.
            </p>
            <div className="intro-note"><span aria-hidden="true">✳</span><span>Currently completing a Master&apos;s degree in Artificial Intelligence at USTHB, where I explore how research can become practical and useful solutions.</span></div>
          </div>
        </div>
      </section>

      <section className="projects section-dark" id="work">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="eyebrow">02 / Selected work</div>
              <h2 className="section-title">Things I&apos;ve<br /><em>made</em> &amp; studied.</h2>
            </div>
            <div className="project-filter" role="group" aria-label="Filter projects">
              {(['All', 'AI & Data', 'Web & Mobile'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`filter-button${filter === option ? ' active' : ''}`}
                  aria-pressed={filter === option}
                  data-testid={`button-filter-${option.toLowerCase().replaceAll(' ', '-')}`}
                  onClick={() => setFilter(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="project-list">
            {visibleProjects.map((project) => (
              <article className="project-row" key={project.id} data-testid={`card-project-${project.id}`}>
                <div className="project-index">{project.number}</div>
                <div>
                  <h3 className="project-name">{project.title}</h3>
                  <div className="project-meta">{project.date} · {project.category}</div>
                  <div className="project-tags">
                    {project.tags.map((tag) => <span className="project-tag" key={tag}>{tag}</span>)}
                  </div>
                </div>
                <p className="project-description">{project.description}</p>
                <button
                  className="project-arrow project-open"
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`Voir la description et les captures de ${project.title}`}
                  data-testid={`button-project-${project.id}`}
                >
                  <ArrowUpRight size={15} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div className="project-modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}>
          <section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="project-modal-close" type="button" onClick={() => setSelectedProject(null)} aria-label="Fermer la fiche projet">
              <X size={20} />
            </button>
            <div className="eyebrow">{selectedProject.date} · {selectedProject.category}</div>
            <h2 id="project-modal-title">{selectedProject.title}</h2>
            <p className="project-modal-description">{selectedProject.details}</p>
            <div className="project-tags project-modal-tags">
              {selectedProject.tags.map((tag) => <span className="project-tag" key={tag}>{tag}</span>)}
            </div>
            {selectedProject.report && (
  <a
    className="button-primary project-report-link"
    href={publicAsset(selectedProject.report)}
    target="_blank"
    rel="noreferrer"
  >
    Lire le rapport complet <ArrowUpRight size={15} />
  </a>
)}
{selectedProject.demo && (
  <a
    className="button-primary project-report-link"
    href={selectedProject.demo}
    target="_blank"
    rel="noopener noreferrer"
  >
    Ouvrir la démo NeuroTech <ArrowUpRight size={15} />
  </a>
)}
            {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
  <div className="project-gallery" aria-label={`Captures de ${selectedProject.title}`}>
    {selectedProject.screenshots.map((screenshot, index) => (
      <figure key={screenshot}>
        <img
          src={publicAsset(screenshot)}
          alt={`${selectedProject.title} — capture ${index + 1}`}
          loading="lazy"
        />
      </figure>
    ))}
  </div>
)}
          </section>
        </div>
      )}

      <section className="experience" id="experience">
        <div className="container experience-grid">
          <div className="experience-intro">
            <div className="eyebrow">03 / Experience</div>
            <h2 className="section-title">Learning by<br /><em>doing.</em></h2>
            <p>My first professional experience brought together security thinking, automation and the discipline of making information easy to trust.</p>
          </div>
          <div className="timeline">
            <article className="timeline-item" data-testid="card-experience-algerie-poste">
              <span className="timeline-dot" aria-hidden="true" />
              <div className="timeline-date">June–July 2025</div>
              <h3>Stage pratique</h3>
              <div className="timeline-place">Algérie Poste · RSSI immersion</div>
              <p>Risk, attack and protection analysis; an account-management automation platform; extraction, verification and visualization.</p>
              <div className="skill-line">
                {['Python', 'Selenium', 'Streamlit', 'Plotly'].map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="education" aria-labelledby="education-heading">
        <div className="container education-grid">
          <div>
            <div className="eyebrow">04 / Formation</div>
            <h2 className="section-title" id="education-heading">A foundation<br />with <em>range.</em></h2>
          </div>
          <div className="education-list">
            <article className="education-item" data-testid="card-education-master">
              <div className="education-date">2025–2026<br />In progress</div>
              <div><h3>Master 2 Artificial Intelligence</h3><p>USTHB</p></div>
            </article>
            <article className="education-item" data-testid="card-education-licence">
              <div className="education-date">2022–2025</div>
              <div><h3>Licence Informatique</h3><p>USTHB</p></div>
            </article>
            <article className="education-item" data-testid="card-education-bac">
              <div className="education-date">2021</div>
              <div><h3>Baccalauréat Mathématiques Techniques</h3><p>Mention Très Bien</p></div>
            </article>
          </div>
        </div>
      </section>

      <section className="toolkit" aria-labelledby="toolkit-heading">
        <div className="container toolkit-grid">
          <div className="toolkit-copy">
            <div className="eyebrow">05 / Toolkit</div>
            <h2 className="section-title" id="toolkit-heading">A broad<br /><em>working set.</em></h2>
            <p>From interface details to data pipelines, these are the tools and concepts I use to turn a question into something testable and useful.</p>
          </div>
          <div className="toolkit-groups">
            {skillGroups.map((group) => (
              <div className="tool-group" key={group.label}>
                <h3>{group.label}</h3>
                <div className="tool-items">
                  {group.items.map((item) => <span className="tool-item" key={item}>{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact section-dark" id="contact">
        <div className="container contact-grid">
          <div>
            <div className="eyebrow">06 / Find me</div>
            <h2 className="section-title">Let&apos;s make<br /><em>something useful.</em></h2>
            <p className="contact-copy">I&apos;m currently looking for an opportunity as an AI Engineer or Full-Stack Developer. If you are building a thoughtful product or exploring applied AI, I&apos;d be glad to connect.</p>
          </div>
          <div className="contact-links">
            <a className="contact-link" href="https://github.com/SarahAR-dev" target="_blank" rel="noreferrer" data-testid="link-github"><span><Github size={15} aria-hidden="true" /> <span className="sr-only">GitHub: </span>github.com/SarahAR-dev</span><ArrowUpRight size={16} /></a>
            <a className="contact-link" href="https://www.linkedin.com/in/sarah-aribi-8a9b48347/" target="_blank" rel="noreferrer" data-testid="link-linkedin"><span><Linkedin size={15} aria-hidden="true" /> <span className="sr-only">LinkedIn: </span>linkedin.com/in/sarah-aribi</span><ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="container footer">
          <span>© Sarah Aribi · AI Engineer &amp; Full-Stack Developer</span>
          <span>Algeria · open to what&apos;s next</span>
        </div>
      </section>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;