export function extractContent(rawHtml: string): string {
  const match = rawHtml.match(/【大纪元[\s\S]*?责任编辑：[^#<]{1,20}#?/);

  if (!match) {
    return '未能提取正文';
  }

  return match[0]
    .trim()
    .replace(/【大纪元[^】]*】/, '')         // 删除前缀
    .replace(/（大纪元[^）]*）/g, '')        // 删除括号版权信息
    .replace(/\r?\n/g, '<br>');              // 替换换行符
}