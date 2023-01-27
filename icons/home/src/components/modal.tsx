import { IconInfo } from '@pages/utils';
import { Col, Modal, Row, Tabs, TabsProps } from 'antd';
import Icon from 'iweather_icons_react';
import { useCallback, useMemo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import copy from 'copy-to-clipboard';
import { message } from 'antd';

function Code({ content }: { content: string }) {
  const copyCode = useCallback(() => {
    copy(content);
    message.success('复制成功');
  }, [content]);

  return (
    <SyntaxHighlighter
      language="jsx"
      style={a11yDark}
      className="clickable"
      onClick={copyCode}
    >
      {content}
    </SyntaxHighlighter>
  );
}

function ReactCode({ info }: { info: IconInfo }) {
  const caiyun = useMemo(() => {
    if (info?.caiyun) {
      return (
        <>
          <div>彩云天气</div>
          <Code
            content={`<Icon name="${info?.caiyun}" type="caiyun" />`}
          ></Code>
        </>
      );
    }
  }, [info]);

  const qweather = useMemo(() => {
    if (info?.qweather) {
      return (
        <>
          <div>和风天气</div>
          <Code
            content={`<Icon name="${info?.qweather}" type="qweather" />`}
          ></Code>
        </>
      );
    }
  }, [info]);

  return (
    <div>
      <div>引入</div>
      <Code content="import Icon from 'iweather_icons_react';"></Code>
      {qweather}
      {caiyun}
    </div>
  );
}

function VueCode({ info }: { info: IconInfo }) {
  const caiyun = useMemo(() => {
    if (info?.caiyun) {
      return (
        <>
          <div>彩云天气</div>
          <Code
            content={`<i-icon name="${info?.caiyun}" type="caiyun" />`}
          ></Code>
        </>
      );
    }
  }, [info]);

  const qweather = useMemo(() => {
    if (info?.qweather) {
      return (
        <>
          <div>和风天气</div>
          <Code
            content={`<i-icon name="${info?.qweather}" type="qweather" />`}
          ></Code>
        </>
      );
    }
  }, [info]);

  return (
    <div>
      <div>引入</div>
      <Code content="import { icon as IIcon } from 'iweather_icons';"></Code>
      {qweather}
      {caiyun}
    </div>
  );
}

interface P {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  info: IconInfo;
}

export default function IconModal({
  open,
  info,
  onCancel,
  onOk,
}: P) {
  const items = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: '1',
        label: 'react',
        children: <ReactCode info={info} />,
      },
      {
        key: '2',
        label: 'vue',
        children: <VueCode info={info}></VueCode>,
      },
    ];
  }, [info]);

  const t = useMemo(() => {
    if (info?.qweather) {
      return 'qweather';
    } else if (info?.caiyun) {
      return 'caiyun';
    }
  }, [info]);

  const name = useMemo(() => {
    if (info?.qweather) {
      return info.qweather;
    } else if (info?.caiyun) {
      return info.caiyun;
    }
  }, [info]);

  return (
    <Modal
      title={info?.label}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      centered
      footer={null}
      width={780}
    >
      <Row
        align="middle"
        justify="center"
        style={{ width: '100%' }}
      >
        <Col span={8}>
          <Icon name={name!} type={t} size="200px"></Icon>
        </Col>
        <Col span={16}>
          <Tabs defaultActiveKey="1" items={items} />
        </Col>
      </Row>
    </Modal>
  );
}
