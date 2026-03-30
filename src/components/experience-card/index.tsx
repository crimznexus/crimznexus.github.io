import React, { Fragment } from 'react';
import { SanitizedExperience } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

const ListItem = ({
  time,
  position,
  company,
  companyLink,
  description,
}: {
  time: React.ReactNode;
  position?: React.ReactNode;
  company?: React.ReactNode;
  companyLink?: string;
  description?: string[];
}) => (
  <li className="timeline-item">
    <div className="timeline-dot" />
    <div className="timeline-date">{time}</div>
    <div className="timeline-position">{position}</div>
    <div className="timeline-company">
      {companyLink ? (
        <a href={companyLink} target="_blank" rel="noreferrer">
          {company}
        </a>
      ) : (
        company
      )}
    </div>
    {description?.map((item, index) => (
      <div key={index} className="timeline-desc">
        {item}
      </div>
    ))}
  </li>
);

const ExperienceCard = ({
  experiences,
  loading,
}: {
  experiences: SanitizedExperience[];
  loading: boolean;
}) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 2; index++) {
      array.push(
        <ListItem
          key={index}
          time={skeleton({ widthCls: 'w-5/12', heightCls: 'h-4' })}
          position={skeleton({
            widthCls: 'w-6/12',
            heightCls: 'h-4',
            className: 'my-1.5',
          })}
          company={skeleton({ widthCls: 'w-6/12', heightCls: 'h-3' })}
        />,
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
                Experience
              </span>
            )}
          </h5>
        </div>
        <div className="px-3 pb-1">
          <div className="timeline-container">
            <div className="timeline-line" />
            <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {loading ? (
                renderSkeleton()
              ) : (
                <Fragment>
                  {experiences.map((experience, index) => (
                    <ListItem
                      key={index}
                      time={`${experience.from} — ${experience.to}`}
                      position={experience.position}
                      company={experience.company}
                      companyLink={
                        experience.companyLink
                          ? experience.companyLink
                          : undefined
                      }
                      description={experience.description}
                    />
                  ))}
                </Fragment>
              )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
