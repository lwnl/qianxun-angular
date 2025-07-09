import mongoose, { HydratedDocument } from 'mongoose'
const { model, models, Schema } = mongoose
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  username: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
})

UserSchema.methods.comparePassword = function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}

UserSchema.pre('save', async function (this: HydratedDocument<IUser>, next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const UserModel = models.Users || model<IUser>('User', UserSchema)