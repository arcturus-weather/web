// 替换字符串中 #size# 部分
export function replaceSize(content: string, size: number) {
  return content.replace(/#size#/g, String(size));
}

