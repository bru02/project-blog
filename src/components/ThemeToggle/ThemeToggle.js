'use client';
import React from 'react';
import VisuallyHidden from '../VisuallyHidden/VisuallyHidden';
import { Moon, Sun } from 'react-feather';
import {
  DARK_TOKENS,
  LIGHT_TOKENS,
} from '@/constants';

import styles from '../Header/Header.module.css';
import Cookies from 'js-cookie';

function ThemeToggle({ intitalTheme }) {
  const [theme, setTheme] =
    React.useState(intitalTheme);
  const ThemeIcon = theme === 'light' ? Sun : Moon;

  function toggleTheme() {
    const nextTheme =
      theme === 'light' ? 'dark' : 'light';

    setTheme(nextTheme);

    Cookies.set('color-theme', nextTheme, {
      expires: 1000,
    });

    document.documentElement.dataset.colorTheme =
      nextTheme;

    Object.assign(
      document.documentElement.style,
      nextTheme === 'light'
        ? LIGHT_TOKENS
        : DARK_TOKENS
    );

    const nextTokens =
      nextTheme === 'light'
        ? LIGHT_TOKENS
        : DARK_TOKENS;

    for (const prop of Object.entries(nextTokens)) {
      document.documentElement.style.setProperty(
        ...prop
      );
    }
  }
  return (
    <button
      className={styles.action}
      onClick={toggleTheme}
    >
      <ThemeIcon size="1.5rem" />
      <VisuallyHidden>
        Toggle dark / light mode
      </VisuallyHidden>
    </button>
  );
}

export default ThemeToggle;
