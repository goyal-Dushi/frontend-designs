import React, { memo, useContext, useRef } from 'react';
import rock from '../../../images/rockPaperGame/icon-rock.svg';
import paper from '../../../images/rockPaperGame/icon-paper.svg';
import scissor from '../../../images/rockPaperGame/icon-scissors.svg';
import styles from './gametags.module.css';
import { ResultContext } from '../context';

export interface GameTagProps {
  type: 'rock' | 'paper' | 'scissor';
  classes?: string;
  big?: boolean;
}

const GameTags: React.FC<GameTagProps> = ({ type, classes, big }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const context = useContext(ResultContext);

  let imgUrl = '';
  let coinCss = '';
  let bigIcon = '';

  // eslint-disable-next-line default-case
  switch (type) {
    case 'paper':
      imgUrl = paper;
      bigIcon = 'icon_big_paper';
      coinCss = 'rps_paper_icon';
      break;
    case 'scissor':
      imgUrl = scissor;
      bigIcon = 'icon_big_scissor';
      coinCss = 'rps_scissor_icon';
      break;
    case 'rock':
      imgUrl = rock;
      bigIcon = 'icon_big_rock';
      coinCss = 'rps_rock_icon';
      break;
  }

  const handleIconClick = () => {
    context?.setResult(inputRef.current?.value as string);
  };

  return (
    <form onSubmit={handleIconClick}>
      <input ref={inputRef} readOnly hidden value={type} />
      <button
        type="submit"
        className={`${styles.game_icon} ${big && styles[bigIcon]} ${styles[coinCss]} ${classes} rounded-circle`}
      >
        <div
          className={`${styles.inner_coin_bg} d-flex justify-content-center align-items-center`}
        >
          <img src={imgUrl} alt="gametag" />
        </div>
      </button>
    </form>
  );
};

export default memo(GameTags);
