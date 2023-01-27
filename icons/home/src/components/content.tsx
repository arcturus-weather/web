import Icon, { IconType } from '@components/icon';
import IconModal from '@src/components/modal';
import { IconInfo } from '@pages/utils';
import { useMemo, useState } from 'react';

interface P {
  w: IconInfo[];
}

export default function Content({ w }: P) {
  const [open, setOpen] = useState(false);
  const [iconInfo, setIconInfo] = useState<IconInfo>();

  const iconList = useMemo(() => {
    return w.map((e, idx) => {
      let n;

      if (e.qweather) {
        n = e.qweather;
      } else {
        n = e.caiyun;
      }

      let t: IconType;

      if (e.qweather) {
        t = 'qweather';
      } else {
        t = 'caiyun';
      }

      return (
        <Icon
          key={idx}
          name={n!}
          type={t}
          label={e.label}
          onClick={() => {
            setOpen(true);
            setIconInfo(e);
          }}
        ></Icon>
      );
    });
  }, [w]);

  return (
    <>
      <div className="content">{iconList}</div>
      <IconModal
        info={iconInfo!}
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      ></IconModal>
    </>
  );
}
