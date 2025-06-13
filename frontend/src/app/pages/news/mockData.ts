export const newsList = Array.from({length:20}, (_, index)=> {
  const date = new Date()
  date.setDate(date.getDate() - index)
  return {
    id: index + 1,
    title: `第${index+1}条新闻`,
    content: `mock内容为${createContent(100)}`,
    editor: `editor${index + 1}`,
    createdAt: date.toISOString(),
  }
}) as {
  id: number,
  title: string,
  content: string,
  editor: string,
  createdAt: string
}[]

function createContent(length: number): string {
  let content = ''

  for (let i = 0; i<length; i++) {
    const charCode = Math.floor(Math.random()*(0x9FA5 - 0x4E00)) + 0x4E00
    content += String.fromCharCode(charCode)
  }
  return content
}
