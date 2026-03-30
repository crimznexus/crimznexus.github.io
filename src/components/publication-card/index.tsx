import { Fragment } from 'react';
import { SanitizedPublication } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

const PublicationCard = ({
  publications,
  loading,
}: {
  publications: SanitizedPublication[];
  loading: boolean;
}) => {
  const renderSkeleton = () => (
    <div
      className="p-5 rounded-2xl"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="flex items-start gap-4">
        {skeleton({ widthCls: 'w-10', heightCls: 'h-10', className: 'rounded-xl flex-shrink-0' })}
        <div className="flex-1">
          {skeleton({ widthCls: 'w-24', heightCls: 'h-4', className: 'mb-3' })}
          {skeleton({ widthCls: 'w-full', heightCls: 'h-5', className: 'mb-1' })}
          {skeleton({ widthCls: 'w-3/4', heightCls: 'h-5', className: 'mb-3' })}
          {skeleton({ widthCls: 'w-full', heightCls: 'h-4', className: 'mb-1' })}
          {skeleton({ widthCls: 'w-full', heightCls: 'h-4', className: 'mb-1' })}
          {skeleton({ widthCls: 'w-5/6', heightCls: 'h-4' })}
        </div>
      </div>
    </div>
  );

  const renderPublications = () =>
    publications.map((item, index) => (
      <div
        key={index}
        className="group p-5 rounded-2xl transition-all duration-300"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-start gap-4">
          {/* Trophy icon */}
          <div
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
            style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="8 21 12 17 16 21" />
              <line x1="12" y1="17" x2="12" y2="11" />
              <path d="M7 4H4a2 2 0 0 0-2 2v2a4 4 0 0 0 4 4h.5" />
              <path d="M17 4h3a2 2 0 0 1 2 2v2a4 4 0 0 1-4 4h-.5" />
              <rect x="7" y="2" width="10" height="12" rx="2" />
            </svg>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Award badge */}
            {item.conferenceName && (
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mb-3"
                style={{
                  background: 'rgba(251,191,36,0.1)',
                  border: '1px solid rgba(251,191,36,0.25)',
                  color: '#fbbf24',
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {item.conferenceName}
              </span>
            )}

            {/* Title */}
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="block font-bold text-sm leading-snug mb-3 hover:text-primary transition-colors duration-200"
                style={{ color: 'rgba(226,232,240,0.9)' }}
              >
                {item.title}
              </a>
            ) : (
              <p className="font-bold text-sm leading-snug mb-3" style={{ color: 'rgba(226,232,240,0.9)' }}>
                {item.title}
              </p>
            )}

            {/* Journal name */}
            {item.journalName && (
              <p className="text-xs mb-2" style={{ color: 'rgba(129,140,248,0.8)' }}>
                {item.journalName}
              </p>
            )}

            {/* Authors */}
            {item.authors && (
              <p className="text-xs mb-3" style={{ color: 'rgba(166,173,187,0.5)' }}>
                {item.authors}
              </p>
            )}

            {/* Description */}
            {item.description && (
              <>
                <div
                  className="w-full mb-3"
                  style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }}
                />
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(166,173,187,0.55)' }}>
                  {item.description}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    ));

  return (
    <Fragment>
      <div className="col-span-1 lg:col-span-2">
        <div
          className="card shadow-lg bg-base-100"
          style={{ borderTop: '2px solid transparent', backgroundImage: 'linear-gradient(var(--color-base-100, #1d232a), var(--color-base-100, #1d232a)), linear-gradient(90deg, #fbbf24, #fb923c)', backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box' }}
        >
          <div className="card-body p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm" style={{ color: 'rgba(226,232,240,0.85)' }}>
                  {loading ? skeleton({ widthCls: 'w-32', heightCls: 'h-5' }) : 'Research Work'}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(166,173,187,0.45)' }}>
                  {loading ? skeleton({ widthCls: 'w-24', heightCls: 'h-3' }) : `${publications.length} publication${publications.length !== 1 ? 's' : ''}`}
                </p>
              </div>
            </div>

            {/* Publications */}
            <div className="flex flex-col gap-3">
              {loading ? renderSkeleton() : renderPublications()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PublicationCard;
