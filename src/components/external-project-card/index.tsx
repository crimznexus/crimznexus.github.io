import { Fragment } from 'react';
import LazyImage from '../lazy-image';
import { ga, skeleton } from '../../utils';
import { SanitizedExternalProject } from '../../interfaces/sanitized-config';

const ExternalProjectCard = ({
  externalProjects,
  header,
  loading,
  googleAnalyticId,
}: {
  externalProjects: SanitizedExternalProject[];
  header: string;
  loading: boolean;
  googleAnalyticId?: string;
}) => {
  const renderSkeleton = () =>
    Array.from({ length: externalProjects.length }).map((_, index) => (
      <div
        key={index}
        className="flex items-start gap-5 p-5 rounded-2xl"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {skeleton({ widthCls: 'w-16', heightCls: 'h-16', className: 'rounded-xl flex-shrink-0' })}
        <div className="flex-1 min-w-0">
          {skeleton({ widthCls: 'w-40', heightCls: 'h-5', className: 'mb-2' })}
          {skeleton({ widthCls: 'w-full', heightCls: 'h-4', className: 'mb-1' })}
          {skeleton({ widthCls: 'w-5/6', heightCls: 'h-4', className: 'mb-1' })}
          {skeleton({ widthCls: 'w-3/4', heightCls: 'h-4' })}
        </div>
      </div>
    ));

  const renderProjects = () =>
    externalProjects.map((item, index) => {
      const isClickable = !!item.link;
      const isUnderDevelopment = !item.link;

      return (
        <div
          key={index}
          className="group flex items-start gap-5 p-5 rounded-2xl transition-all duration-300 cursor-pointer"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
          onClick={() => {
            if (!isClickable) return;
            try {
              if (googleAnalyticId) ga.event('Click External Project', { post: item.title });
            } catch {}
            window?.open(item.link, '_blank');
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = 'rgba(56,189,248,0.05)';
            el.style.borderColor = 'rgba(56,189,248,0.2)';
            el.style.transform = 'translateY(-2px)';
            el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(56,189,248,0.08)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = 'rgba(255,255,255,0.03)';
            el.style.borderColor = 'rgba(255,255,255,0.06)';
            el.style.transform = 'translateY(0)';
            el.style.boxShadow = 'none';
          }}
        >
          {/* Image */}
          {item.imageUrl && (
            <div
              className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <LazyImage
                src={item.imageUrl}
                alt={item.title}
                placeholder={skeleton({ widthCls: 'w-full', heightCls: 'h-full', shape: '' })}
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-sm" style={{ color: 'rgba(226,232,240,0.9)' }}>
                  {item.title}
                </h3>
                {isUnderDevelopment && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: 'rgba(251,146,60,0.1)',
                      border: '1px solid rgba(251,146,60,0.25)',
                      color: '#fb923c',
                    }}
                  >
                    In Dev
                  </span>
                )}
              </div>
              {isClickable && (
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-70 transition-opacity duration-200"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              )}
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(166,173,187,0.55)' }}>
              {item.description}
            </p>
          </div>
        </div>
      );
    });

  return (
    <Fragment>
      <div className="col-span-1 lg:col-span-2">
        <div
          className="card shadow-lg bg-base-100"
          style={{ borderTop: '2px solid transparent', backgroundImage: 'linear-gradient(var(--color-base-100, #1d232a), var(--color-base-100, #1d232a)), linear-gradient(90deg, #818cf8, #f471b5)', backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box' }}
        >
          <div className="card-body p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(129,140,248,0.1)', border: '1px solid rgba(129,140,248,0.2)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm" style={{ color: 'rgba(226,232,240,0.85)' }}>
                  {loading ? skeleton({ widthCls: 'w-28', heightCls: 'h-5' }) : header}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(166,173,187,0.45)' }}>
                  {loading ? skeleton({ widthCls: 'w-24', heightCls: 'h-3' }) : `${externalProjects.length} featured projects`}
                </p>
              </div>
            </div>

            {/* Project list */}
            <div className="flex flex-col gap-3">
              {loading ? renderSkeleton() : renderProjects()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ExternalProjectCard;
