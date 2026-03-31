import { useCallback, useEffect, useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { formatDistance } from 'date-fns';
import {
  CustomError,
  GENERIC_ERROR,
  INVALID_CONFIG_ERROR,
  INVALID_GITHUB_USERNAME_ERROR,
  setTooManyRequestError,
} from '../constants/errors';
import '../assets/index.css';
import { getInitialTheme, getSanitizedConfig, setupHotjar } from '../utils';
import { SanitizedConfig } from '../interfaces/sanitized-config';
import ErrorPage from './error-page';
import { DEFAULT_THEMES } from '../constants/default-themes';
import ThemeChanger from './theme-changer';
import { BG_COLOR } from '../constants';
import AvatarCard from './avatar-card';
import { Profile } from '../interfaces/profile';
import DetailsCard from './details-card';
import SkillCard from './skill-card';
import ExperienceCard from './experience-card';
import EducationCard from './education-card';
import CertificationCard from './certification-card';
import { GithubProject } from '../interfaces/github-project';
import GithubProjectCard from './github-project-card';
import ExternalProjectCard from './external-project-card';
import BlogCard from './blog-card';
import Footer from './footer';
import PublicationCard from './publication-card';
import MangaForgePage from './mangaforge-page';

const ROLES = [
  'AI Developer',
  'ML Engineer',
  'Full-Stack Developer',
  'Data Scientist',
];

const GitProfile = ({ config }: { config: Config }) => {
  const [sanitizedConfig] = useState<SanitizedConfig | Record<string, never>>(
    getSanitizedConfig(config),
  );
  const [theme, setTheme] = useState<string>(DEFAULT_THEMES[0]);
  const [error, setError] = useState<CustomError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [githubProjects, setGithubProjects] = useState<GithubProject[]>([]);

  // Page routing state
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  // Hero typewriter state
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Sticky nav scroll state
  const [navScrolled, setNavScrolled] = useState(false);

  // Ref for scroll reveal observer
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ── Typewriter effect ──────────────────────────────────────────────
  useEffect(() => {
    const role = ROLES[roleIdx];
    let delay: number;

    if (!deleting) {
      if (charIdx < role.length) {
        delay = 100;
      } else {
        delay = 2200;
      }
    } else {
      delay = charIdx > 0 ? 48 : 0;
    }

    const t = setTimeout(() => {
      if (!deleting) {
        if (charIdx < role.length) {
          setCharIdx((c) => c + 1);
        } else {
          setDeleting(true);
        }
      } else {
        if (charIdx > 0) {
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setRoleIdx((i) => (i + 1) % ROLES.length);
        }
      }
    }, delay);

    return () => clearTimeout(t);
  }, [charIdx, deleting, roleIdx]);

  const displayRole = ROLES[roleIdx].slice(0, charIdx);

  // ── Sticky nav ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Mouse spotlight ─────────────────────────────────────────────────
  useEffect(() => {
    let rafId: number;
    let targetX = -200;
    let targetY = -200;
    let currentX = -200;
    let currentY = -200;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;
      document.documentElement.style.setProperty('--mouse-x', `${currentX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${currentY}px`);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // ── Scroll reveal ───────────────────────────────────────────────────
  useEffect(() => {
    if (loading) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );

    const elements = document.querySelectorAll('.reveal, .reveal-left');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [loading]);

  // ── GitHub data ──────────────────────────────────────────────────────
  const getGithubProjects = useCallback(
    async (publicRepoCount: number): Promise<GithubProject[]> => {
      if (sanitizedConfig.projects.github.mode === 'automatic') {
        if (publicRepoCount === 0) return [];

        const excludeRepo =
          sanitizedConfig.projects.github.automatic.exclude.projects
            .map((project) => `+-repo:${project}`)
            .join('');

        const query = `user:${sanitizedConfig.github.username}+fork:${!sanitizedConfig.projects.github.automatic.exclude.forks}${excludeRepo}`;
        const url = `https://api.github.com/search/repositories?q=${query}&sort=${sanitizedConfig.projects.github.automatic.sortBy}&per_page=${sanitizedConfig.projects.github.automatic.limit}&type=Repositories`;

        const repoResponse = await axios.get(url, {
          headers: { 'Content-Type': 'application/vnd.github.v3+json' },
        });
        return repoResponse.data.items;
      } else {
        if (sanitizedConfig.projects.github.manual.projects.length === 0)
          return [];

        const repos = sanitizedConfig.projects.github.manual.projects
          .map((project) => `+repo:${project}`)
          .join('');

        const url = `https://api.github.com/search/repositories?q=${repos}+fork:true&type=Repositories`;
        const repoResponse = await axios.get(url, {
          headers: { 'Content-Type': 'application/vnd.github.v3+json' },
        });
        return repoResponse.data.items;
      }
    },
    [
      sanitizedConfig.github.username,
      sanitizedConfig.projects.github.mode,
      sanitizedConfig.projects.github.manual.projects,
      sanitizedConfig.projects.github.automatic.sortBy,
      sanitizedConfig.projects.github.automatic.limit,
      sanitizedConfig.projects.github.automatic.exclude.forks,
      sanitizedConfig.projects.github.automatic.exclude.projects,
    ],
  );

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.github.com/users/${sanitizedConfig.github.username}`,
      );
      const data = response.data;
      setProfile({
        avatar: data.avatar_url,
        name: data.name || ' ',
        bio: data.bio || '',
        location: data.location || '',
        company: data.company || '',
      });

      if (!sanitizedConfig.projects.github.display) return;
      setGithubProjects(await getGithubProjects(data.public_repos));
    } catch (err) {
      handleError(err as AxiosError | Error);
    } finally {
      setLoading(false);
    }
  }, [
    sanitizedConfig.github.username,
    sanitizedConfig.projects.github.display,
    getGithubProjects,
  ]);

  useEffect(() => {
    if (Object.keys(sanitizedConfig).length === 0) {
      setError(INVALID_CONFIG_ERROR);
    } else {
      setError(null);
      setTheme(getInitialTheme(sanitizedConfig.themeConfig));
      setupHotjar(sanitizedConfig.hotjar);
      loadData();
    }
  }, [sanitizedConfig, loadData]);

  useEffect(() => {
    theme && document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleError = (error: AxiosError | Error): void => {
    console.error('Error:', error);
    if (error instanceof AxiosError) {
      try {
        const reset = formatDistance(
          new Date(error.response?.headers?.['x-ratelimit-reset'] * 1000),
          new Date(),
          { addSuffix: true },
        );
        if (typeof error.response?.status === 'number') {
          switch (error.response.status) {
            case 403:
              setError(setTooManyRequestError(reset));
              break;
            case 404:
              setError(INVALID_GITHUB_USERNAME_ERROR);
              break;
            default:
              setError(GENERIC_ERROR);
              break;
          }
        } else {
          setError(GENERIC_ERROR);
        }
      } catch {
        setError(GENERIC_ERROR);
      }
    } else {
      setError(GENERIC_ERROR);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = 64;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  // ── Project page routing ────────────────────────────────────────────
  if (currentPage === 'MangaForge') {
    return <MangaForgePage onBack={() => setCurrentPage(null)} />;
  }

  return (
    <div className="fade-in">
      {error ? (
        <ErrorPage
          status={error.status}
          title={error.title}
          subTitle={error.subTitle}
        />
      ) : (
        <>
          {/* ── Mouse spotlight ────────────────────────────────────── */}
          <div className="mouse-spotlight" aria-hidden="true" />

          {/* ── Sticky Navigation ──────────────────────────────────── */}
          <nav className={`sticky-nav ${navScrolled ? 'scrolled' : ''}`}>
            <span
              className="nav-logo"
              onClick={() => scrollToSection('hero')}
              style={{ cursor: 'pointer' }}
            >
              FM
            </span>
            <ul className="nav-links">
              <li>
                <button
                  className="nav-link"
                  onClick={() => scrollToSection('hero')}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  className="nav-link"
                  onClick={() => scrollToSection('about')}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  className="nav-link"
                  onClick={() => scrollToSection('projects')}
                >
                  Projects
                </button>
              </li>
              <li>
                <button
                  className="nav-link"
                  onClick={() => scrollToSection('contact')}
                >
                  Contact
                </button>
              </li>
            </ul>
            {sanitizedConfig.resume?.fileUrl && (
              <a
                href={sanitizedConfig.resume.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm hidden md:flex"
              >
                Resume
              </a>
            )}
          </nav>

          {/* ── Hero Section ───────────────────────────────────────── */}
          <section id="hero" className="hero-section">
            {/* Background orbs */}
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />

            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
              {/* Eyebrow */}
              <p className="hero-eyebrow mb-5">Hello, World 👋</p>

              {/* Name */}
              <h1 className="hero-title mb-4">
                {loading || !profile
                  ? 'Muhammad Faizan-e-Mustafa'
                  : profile.name}
              </h1>

              {/* Typewriter */}
              <div className="flex items-center justify-center gap-2 mb-6 hero-typewriter">
                <span
                  style={{ color: 'rgba(166,173,187,0.5)', fontWeight: 400 }}
                >
                  I&apos;m a&nbsp;
                </span>
                <span className="cursor-blink">{displayRole}</span>
              </div>

              {/* Bio */}
              <p className="hero-bio mx-auto mb-8">
                {loading || !profile
                  ? 'Building intelligent systems that solve real-world problems.'
                  : profile.bio ||
                    'Building intelligent systems that solve real-world problems.'}
              </p>

              {/* CTAs */}
              <div className="hero-cta flex flex-wrap gap-4 justify-center mb-12">
                {sanitizedConfig.resume?.fileUrl && (
                  <a
                    href={sanitizedConfig.resume.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-lg resume-btn gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download Resume
                  </a>
                )}
                <button
                  className="btn btn-outline btn-lg gap-2"
                  onClick={() => scrollToSection('projects')}
                >
                  View My Work
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>

              {/* Stats */}
              <div className="hero-stats flex justify-center gap-10 mb-14">
                <div className="text-center">
                  <div className="stat-number">3+</div>
                  <div className="stat-label">Years Exp.</div>
                </div>
                <div
                  style={{
                    width: '1px',
                    background: 'rgba(56,189,248,0.15)',
                    margin: '0.25rem 0',
                  }}
                />
                <div className="text-center">
                  <div className="stat-number">10+</div>
                  <div className="stat-label">Projects</div>
                </div>
                <div
                  style={{
                    width: '1px',
                    background: 'rgba(56,189,248,0.15)',
                    margin: '0.25rem 0',
                  }}
                />
                <div className="text-center">
                  <div className="stat-number">4+</div>
                  <div className="stat-label">Certs</div>
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="scroll-indicator flex flex-col items-center gap-1">
                <span
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  scroll
                </span>
                <svg
                  width="16"
                  height="24"
                  viewBox="0 0 16 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1"
                    y="1"
                    width="14"
                    height="22"
                    rx="7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="8" cy="7" r="2" fill="currentColor">
                    <animate
                      attributeName="cy"
                      values="7;15;7"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="1;0;1"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              </div>
            </div>
          </section>

          {/* ── Main Content ────────────────────────────────────────── */}
          <div id="about" className={`p-4 lg:p-10 min-h-full ${BG_COLOR}`}>
            {!sanitizedConfig.themeConfig.disableSwitch && (
              <div className="mb-6">
                <ThemeChanger
                  theme={theme}
                  setTheme={setTheme}
                  loading={loading}
                  themeConfig={sanitizedConfig.themeConfig}
                />
              </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-box">
              {/* Left column */}
              <div className="col-span-1">
                <div className="grid grid-cols-1 gap-6">
                  <div className="reveal-left">
                    <AvatarCard
                      profile={profile}
                      loading={loading}
                      avatarRing={sanitizedConfig.themeConfig.displayAvatarRing}
                      resumeFileUrl={sanitizedConfig.resume.fileUrl}
                    />
                  </div>
                  <div id="contact" className="reveal-left" style={{ transitionDelay: '0.05s' }}>
                    <DetailsCard
                      profile={profile}
                      loading={loading}
                      github={sanitizedConfig.github}
                      social={sanitizedConfig.social}
                    />
                  </div>
                  {sanitizedConfig.skills.length !== 0 && (
                    <div className="reveal-left" style={{ transitionDelay: '0.1s' }}>
                      <SkillCard
                        loading={loading}
                        skills={sanitizedConfig.skills}
                      />
                    </div>
                  )}
                  {sanitizedConfig.experiences.length !== 0 && (
                    <div className="reveal-left" style={{ transitionDelay: '0.15s' }}>
                      <ExperienceCard
                        loading={loading}
                        experiences={sanitizedConfig.experiences}
                      />
                    </div>
                  )}
                  {sanitizedConfig.certifications.length !== 0 && (
                    <div className="reveal-left" style={{ transitionDelay: '0.2s' }}>
                      <CertificationCard
                        loading={loading}
                        certifications={sanitizedConfig.certifications}
                      />
                    </div>
                  )}
                  {sanitizedConfig.educations.length !== 0 && (
                    <div className="reveal-left" style={{ transitionDelay: '0.25s' }}>
                      <EducationCard
                        loading={loading}
                        educations={sanitizedConfig.educations}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Right column */}
              <div id="projects" className="lg:col-span-2 col-span-1">
                <div className="grid grid-cols-1 gap-6">
                  {sanitizedConfig.projects.github.display && (
                    <div className="reveal">
                      <GithubProjectCard
                        header={sanitizedConfig.projects.github.header}
                        limit={sanitizedConfig.projects.github.automatic.limit}
                        githubProjects={githubProjects}
                        loading={loading}
                        googleAnalyticsId={sanitizedConfig.googleAnalytics.id}
                      />
                    </div>
                  )}
                  {sanitizedConfig.publications.length !== 0 && (
                    <div className="reveal" style={{ transitionDelay: '0.05s' }}>
                      <PublicationCard
                        loading={loading}
                        publications={sanitizedConfig.publications}
                      />
                    </div>
                  )}
                  {sanitizedConfig.projects.external.projects.length !== 0 && (
                    <div className="reveal" style={{ transitionDelay: '0.1s' }}>
                      <ExternalProjectCard
                        loading={loading}
                        header={sanitizedConfig.projects.external.header}
                        externalProjects={
                          sanitizedConfig.projects.external.projects
                        }
                        googleAnalyticId={sanitizedConfig.googleAnalytics.id}
                        onProjectClick={(title) => setCurrentPage(title)}
                      />
                    </div>
                  )}
                  {sanitizedConfig.blog.display && (
                    <div className="reveal" style={{ transitionDelay: '0.15s' }}>
                      <BlogCard
                        loading={loading}
                        googleAnalyticsId={sanitizedConfig.googleAnalytics.id}
                        blog={sanitizedConfig.blog}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer ──────────────────────────────────────────────── */}
          {sanitizedConfig.footer && (
            <footer
              className={`p-4 footer ${BG_COLOR} text-base-content footer-center`}
            >
              <div className="card card-sm bg-base-100 shadow-sm footer-card">
                <Footer content={sanitizedConfig.footer} loading={loading} />
              </div>
            </footer>
          )}
        </>
      )}
    </div>
  );
};

export default GitProfile;
