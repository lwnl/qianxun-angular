export function extractContent(raw: string): string {
  return raw
    .trim()
    .replace(/【大纪元[^】]*】/, '')
    .replace(/（大纪元[^）]*）/g, '')
    .replace(/\r?\n/g, '<br>');
}