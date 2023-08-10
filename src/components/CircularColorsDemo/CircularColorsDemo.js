'use client';
import React from 'react';
import clsx from 'clsx';
import { Play, Pause, RotateCcw } from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';
import { MotionConfig, motion } from 'framer-motion';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  {
    label: 'yellow',
    value: 'hsl(50deg 100% 55%)',
  },
  {
    label: 'blue',
    value: 'hsl(235deg 100% 65%)',
  },
];

function CircularColorsDemo() {
  const id = React.useId();
  const [timeElapsed, setTimeElapsed] =
    React.useState(0);
  const [intervalId, setIntervalId] =
    React.useState(false);

  const selectedColor =
    COLORS[timeElapsed % COLORS.length];

  React.useEffect(() => {
    return () => {
      intervalId && clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const elapseTime = () =>
    setTimeElapsed((v) => v + 1);
  const pause = () => {
    clearInterval(intervalId);
    setIntervalId(false);
  };

  return (
    <MotionConfig reducedMotion="user">
      <Card as="section" className={styles.wrapper}>
        <ul className={styles.colorsWrapper}>
          {COLORS.map((color, index) => {
            const isSelected =
              color.value === selectedColor.value;

            return (
              <li
                className={styles.color}
                key={index}
                style={{
                  zIndex: isSelected ? 1 : 2,
                }}
              >
                {isSelected && (
                  <motion.div
                    className={
                      styles.selectedColorOutline
                    }
                    layoutId={id + '-outline'}
                  />
                )}
                <motion.div
                  className={clsx(
                    styles.colorBox,
                    isSelected &&
                      styles.selectedColorBox
                  )}
                  style={{
                    backgroundColor: color.value,
                  }}
                >
                  <VisuallyHidden>
                    {color.label}
                  </VisuallyHidden>
                </motion.div>
              </li>
            );
          })}
        </ul>

        <div className={styles.timeWrapper}>
          <dl className={styles.timeDisplay}>
            <dt>Time Elapsed</dt>
            <dd>{timeElapsed}</dd>
          </dl>
          <div className={styles.actions}>
            {intervalId === false ? (
              <button
                onClick={() => {
                  elapseTime();
                  setIntervalId(
                    setInterval(elapseTime, 1000)
                  );
                }}
              >
                <Play />
                <VisuallyHidden>Play</VisuallyHidden>
              </button>
            ) : (
              <button onClick={pause}>
                <Pause />
                <VisuallyHidden>Pause</VisuallyHidden>
              </button>
            )}

            <button
              onClick={() => {
                pause();
                setTimeElapsed(0);
              }}
            >
              <RotateCcw />
              <VisuallyHidden>Reset</VisuallyHidden>
            </button>
          </div>
        </div>
      </Card>
    </MotionConfig>
  );
}

export default CircularColorsDemo;
