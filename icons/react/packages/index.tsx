import React, { useMemo } from 'react';
import { caiyunIcon, isWarning, qweatherIcon } from '../../utils';
import { P } from '../index';
import 'virtual:svg-icons-register';

export default function ({ size = 50, type = 'qweather', name }: P) {
  const iconSize = useMemo(() => {
    if (typeof size === 'number') {
      return `${size}px`;
    } else if (typeof size === 'string') {
      return size;
    }
  }, [size]);

  const iconType = useMemo(() => {
    if (isWarning(name)) {
      return 'warnings';
    } else {
      return 'weathers';
    }
  }, [name]);

  const symbolId = useMemo(() => {
    if (type === 'qweather') {
      return `#icon-${iconType}-${qweatherIcon(name)}`;
    } else if (type === 'caiyun') {
      return `#icon-${iconType}-${caiyunIcon(name)}`;
    }
  }, [name, type]);

  return (
    <svg
      aria-hidden="true"
      style={{
        width: iconSize,
        height: iconSize,
      }}>
      <use href={symbolId} />
    </svg>
  );
}
