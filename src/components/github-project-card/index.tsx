import { Fragment } from 'react';
import { AiOutlineFork, AiOutlineStar } from 'react-icons/ai';
import { ga, getLanguageColor, skeleton } from '../../utils';
import { GithubProject } from '../../interfaces/github-project';

const GithubProjectCard = ({
  header,
  githubProjects,
  loading,
  limit,
  googleAnalyticsId,
}: {
  header: string;
  githubProjects: GithubProject[];
  loading: boolean;
  limit: number;
  googleAnalyticsId?: string;
}) => {
  if (!loading && githubProjects.length === 0) return;

  const renderSkeleton = () =>
    Array.from({ length: limit }).map((_, index) => (
      <div
        key={index}
        className="flex items-start gap-4 p-4 rounded-xl"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {skeleton({ widthCls: 'w-40', heightCls: 'h-5' })}
          </div>
          {skeleton({ widthCls: 'w-full', heightCls: 'h-4', className: 'mb-1' })}
          {skeleton({ widthCls: 'w-3/4', heightCls: 'h-4' })}
        </div>
        <div className="flex-shrink-0">
          {skeleton({ widthCls: 'w-16', heightCls: 'h-5' })}
        </div>
      </div>
    ));

  const renderProjects = () =>
    githubProjects.map((item, index) => (
      <a
        key={index}
        href={item.html_url}
        onClick={(e) => {
          e.preventDefault();
          try {
            if (googleAnalyticsId) ga.event('Click project', { project: item.name });
          } catch {}
          window?.open(item.html_url, '_blank');
        }}
        className="group flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300"
        style={{ borderBottom: index < githubProjects.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = 'rgba(56,189,248,0.04)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = 'transparent';
        }}
      >
        {/* Repo icon */}
        <div
          className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.15)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className="font-semibold text-sm transition-colors duration-200"
              style={{ color: 'rgba(226,232,240,0.85)' }}
            >
              {item.name}
            </span>
            {item.language && (
              <span
                className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: `${getLanguageColor(item.language)}18`,
                  border: `1px solid ${getLanguageColor(item.language)}40`,
                  color: getLanguageColor(item.language),
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: getLanguageColor(item.language) }}
                />
                {item.language}
              </span>
            )}
          </div>
          {item.description && (
            <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'rgba(166,173,187,0.55)' }}>
              {item.description}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="flex-shrink-0 flex items-center gap-3 text-xs" style={{ color: 'rgba(166,173,187,0.45)' }}>
          {Number(item.stargazers_count) > 0 && (
            <span className="flex items-center gap-1">
              <AiOutlineStar size={13} />
              {item.stargazers_count}
            </span>
          )}
          {Number(item.forks_count) > 0 && (
            <span className="flex items-center gap-1">
              <AiOutlineFork size={13} />
              {item.forks_count}
            </span>
          )}
          {/* Arrow */}
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="opacity-0 group-hover:opacity-60 transition-opacity duration-200"
            style={{ transform: 'rotate(-45deg)' }}
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </a>
    ));

  return (
    <Fragment>
      <div className="col-span-1 lg:col-span-2">
        <div
          className="card shadow-lg bg-base-100"
          style={{ borderTop: '2px solid transparent', backgroundImage: 'linear-gradient(var(--color-base-100, #1d232a), var(--color-base-100, #1d232a)), linear-gradient(90deg, #38bdf8, #818cf8)', backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box' }}
        >
          <div className="card-body p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm" style={{ color: 'rgba(226,232,240,0.85)' }}>
                    {loading ? skeleton({ widthCls: 'w-36', heightCls: 'h-5' }) : header}
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(166,173,187,0.45)' }}>
                    {loading ? skeleton({ widthCls: 'w-28', heightCls: 'h-3' }) : `${githubProjects.length} repositories`}
                  </p>
                </div>
              </div>
            </div>

            {/* List */}
            <div className="flex flex-col">
              {loading ? renderSkeleton() : renderProjects()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default GithubProjectCard;
