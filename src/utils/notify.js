import { Notification } from 'element-ui';

export default function notify(warings) {
  for (let i = 0; i < warings.length; i++) {
    const { level, typeName, text } = warings[i];
    setTimeout(() => {
      Notification({
        title: `${level}${typeName}预警`,
        message: text,
        type: 'warning',
        duration: 0,
      });
    }, 500 * i);
  }
}
