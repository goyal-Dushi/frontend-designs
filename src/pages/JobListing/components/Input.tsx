import React, { useCallback, useRef, useState } from 'react';
import styles from './input.module.css';
import Tags from './Tags';

export interface InputProps {
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  tags: string[] | null;
}

const Input: React.FC<InputProps> = ({ setTags, tags }) => {
  const [deletable, setDeletable] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const setLocalStorage = useCallback((vals: string[]) => {
    window.localStorage.setItem('tags', JSON.stringify(vals));
  }, []);

  const validateTags = (inputVal: string | null): boolean => {
    if (!inputVal) {
      return false;
    }
    const alreadyPresent = tags?.filter(
      (tagName) => tagName.toLowerCase() === inputVal?.trim().toLowerCase()
    );
    if (alreadyPresent?.length) {
      return false;
    }
    return true;
  };

  const handleInput = (e: React.KeyboardEvent) => {
    let inputVal = inputRef.current && inputRef.current.value;
    if (inputVal?.includes(',')) {
      inputVal = inputVal.slice(0, -1).trim();
    }

    if (!validateTags(inputVal)) {
      return;
    }

    const validKey = e.key === 'Enter' || e.key === ',';

    if (validKey && inputRef.current && inputVal) {
      let newTags: string[] = [];
      if (tags) {
        newTags = [...tags, inputVal];
      }

      setTags(newTags);
      setLocalStorage(newTags);
      inputRef.current.value = '';
    }
  };

  if (deletable) {
    const newTags = tags?.filter((tag) => tag !== deletable);
    if (newTags) {
      setTags(newTags);
      setLocalStorage(newTags);
      setDeletable('');
    }
  }

  const handleClear = () => {
    setTags([]);
    setLocalStorage([]);
  };

  return (
    <div
      className={`${styles.tag_input_wrap} input-group my-auto position-absolute w-75 d-flex`}
    >
      <div className="form-control">
        {Boolean(tags?.length) && (
          <div className="d-flex w-auto mb-2 flex-wrap">
            <Tags deleteArr={tags} setDeletable={setDeletable} />
          </div>
        )}
        <input
          type="text"
          ref={inputRef}
          onKeyUp={handleInput}
          className="form-control"
          placeholder="Search by click or typing tag name"
          aria-label="Search by Tags"
          aria-describedby="tag-search"
        />
      </div>
      <button
        onClick={handleClear}
        className={styles.search_btn}
        type="button"
        id="tag-search"
      >
        {' '}
        Clear{' '}
      </button>
    </div>
  );
};

export default Input;
