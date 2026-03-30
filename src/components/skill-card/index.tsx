import { skeleton } from '../../utils';

const SkillCard = ({
  loading,
  skills,
}: {
  loading: boolean;
  skills: string[];
}) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 12; index++) {
      array.push(
        <div key={index}>
          {skeleton({ widthCls: 'w-16', heightCls: 'h-6', className: 'm-1' })}
        </div>,
      );
    }
    return array;
  };

  return (
    <div className="card shadow-lg card-sm bg-base-100">
      <div className="card-body">
        <div className="mx-3 mb-2">
          <h5 className="card-title">
            {loading ? (
              skeleton({ widthCls: 'w-32', heightCls: 'h-8' })
            ) : (
              <span className="section-header">
                <span className="section-header-dot" />
                Tech Stack
              </span>
            )}
          </h5>
        </div>
        <div className="p-2">
          <div className="flex flex-wrap gap-2 justify-center">
            {loading
              ? renderSkeleton()
              : skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
