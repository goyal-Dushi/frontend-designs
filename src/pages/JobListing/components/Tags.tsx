import React from 'react';
import styles from './tags.module.css';

export interface TagProps {
  newTag?: boolean;
  featured?: boolean;
  languages?: string[];
  deleteArr?: string[] | null;
  setDeletable?: React.Dispatch<React.SetStateAction<string>>;
}

const Tags: React.FC<TagProps> = (props) => {
  const { setDeletable, featured, newTag, languages, deleteArr } = props;

  if (newTag) {
    return <span className={`${styles.new_tag} badge rounded-pill`}>NEW!</span>;
  }

  if (featured) {
    return (
      <span className={`${styles.featured_tag} badge rounded-pill`}>
        FEATURED
      </span>
    );
  }

  const handleDelete = (name: string) => {
    setDeletable?.(name);
  };

  if (deleteArr?.length) {
    return (
      <>
        {deleteArr.map((names, i) => {
          return (
            <div key={names + '-' + i} className={'me-2'}>
              <div className={`${styles.deletable_tag} badge`}>{names}</div>
              <button
                onClick={() => handleDelete(names)}
                className={styles.delete_icon}
              >
                {' '}
                X{' '}
              </button>
            </div>
          );
        })}
      </>
    );
  }

  if (Array.isArray(languages) && languages?.length) {
    return (
      <>
        {languages.map((language, i) => (
          <div
            key={i + '-' + language}
            className={`${styles.skill_tag} badge mx-2 my-1`}
          >
            {language}
          </div>
        ))}
      </>
    );
  }

  return null;
};

export default Tags;
