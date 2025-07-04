export interface News {
  id: number;
  title: string;
  content: string;
  editor: string;
  createdAt: string;
}

export const newsList: News[] = Array.from({ length: 20 }, (_, index) => {
  const date = new Date()
  date.setDate(date.getDate() - index)
  return {
    id: index + 1,
    title: `第${index + 1}条新闻`,
    content: `mock内容`,
    editor: `editor${index + 1}`,
    createdAt: date.toLocaleDateString(),
  }
})


