import { FALLBACK_IMAGE } from '../../constants';
import { Profile } from '../../interfaces/profile';
import { skeleton } from '../../utils';
import LazyImage from '../lazy-image';

interface AvatarCardProps {
  profile: Profile | null;
  loading: boolean;
  avatarRing: boolean;
  resumeFileUrl?: string;
}

const AvatarCard: React.FC<AvatarCardProps> = ({
  profile,
  loading,
  avatarRing,
  resumeFileUrl,
}): React.JSX.Element => {
  return (
    <div className="card shadow-lg card-sm bg-base-100">
      <div className="grid place-items-center py-8 px-4">
        {/* Avatar */}
        {loading || !profile ? (
          <div className="avatar opacity-90 mb-8">
            <div className="rounded-full w-32 h-32">
              {skeleton({ widthCls: 'w-full', heightCls: 'h-full', shape: '' })}
            </div>
          </div>
        ) : (
          <div
            className="avatar-wrapper mb-8"
            style={{ width: '9rem', height: '9rem' }}
          >
            {avatarRing && (
              <div
                className="avatar-ring-glow"
                style={{ inset: '-3px' }}
              />
            )}
            <div
              className="avatar-img-wrapper"
              style={{ width: '9rem', height: '9rem', zIndex: 1 }}
            >
              <LazyImage
                src={profile.avatar ? profile.avatar : FALLBACK_IMAGE}
                alt={profile.name}
                placeholder={skeleton({
                  widthCls: 'w-full',
                  heightCls: 'h-full',
                  shape: '',
                })}
              />
            </div>
          </div>
        )}

        {/* Name */}
        <div className="text-center px-4 w-full">
          <h5 className="font-black text-2xl tracking-tight mb-1">
            {loading || !profile ? (
              skeleton({ widthCls: 'w-48', heightCls: 'h-8' })
            ) : (
              <span
                style={{
                  background:
                    'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {profile.name}
              </span>
            )}
          </h5>

          {/* Bio */}
          <div
            className="mt-2 text-sm font-mono leading-relaxed"
            style={{ color: 'rgba(166,173,187,0.6)' }}
          >
            {loading || !profile
              ? skeleton({ widthCls: 'w-48', heightCls: 'h-5' })
              : profile.bio}
          </div>
        </div>

        {/* Resume button */}
        {resumeFileUrl &&
          (loading ? (
            <div className="mt-6">
              {skeleton({ widthCls: 'w-40', heightCls: 'h-8' })}
            </div>
          ) : (
            <a
              href={resumeFileUrl}
              target="_blank"
              className="btn btn-outline btn-sm mt-6 gap-2 resume-btn"
              download
              rel="noreferrer"
              style={{ fontSize: '0.75rem' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
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
          ))}
      </div>
    </div>
  );
};

export default AvatarCard;
