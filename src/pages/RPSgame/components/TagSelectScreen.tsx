import React from 'react';
import styles from './tagSelectScreen.module.css';
import GameTags from './GameTags';

export interface TagSelectScreenProps {}

const TagSelectScreen: React.FC<TagSelectScreenProps> = () => {
  return (
    <div className={`${styles.tag_container}`}>
      <div
        className="d-flex justify-content-center"
        style={{ paddingTop: '70px' }}
      >
        <GameTags classes={styles.paper_tag} type={'paper'} />
        <GameTags classes={styles.scissor_tag} type={'scissor'} />
      </div>
      <div
        className="d-flex justify-content-center"
        style={{ paddingTop: '30px' }}
      >
        <GameTags classes={styles.rock_tag} type={'rock'} />
      </div>
    </div>
  );
};

export default TagSelectScreen;
