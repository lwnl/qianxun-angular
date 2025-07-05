import mongoose from 'mongoose'

const { Schema, model, models } = mongoose

export interface INews extends Document {
  id: number,
  title: string,
  url: string,
  content: string,
  createdAt: string
}

const NewsSchema = new Schema<INews>({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  content: { type: String, default: '' },
  createdAt: { type: String, required: true }
})
// 「如果 Mongoose 中已经存在名为 News 的模型，就使用它；否则用我们定义的 schema 来创建一个新的 News 模型。」
export const NewsModel = models.News || model<INews>('News', NewsSchema)