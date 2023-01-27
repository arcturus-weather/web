import Icon from 'iweather_icons_react';

export type IconType = 'qweather' | 'caiyun' | undefined;

interface P {
  name: string;
  label: string;
  type?: 'qweather' | 'caiyun';
  onClick: () => void;
}

export default function ({
  name,
  label,
  type,
  onClick,
}: P) {
  return (
    <div className="icon-wrapper clickable" onClick={onClick}>
      <Icon name={name} size="100px" type={type}></Icon>
      <div className="icon-label">{label}</div>
    </div>
  );
}
