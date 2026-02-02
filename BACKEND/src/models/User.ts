import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  name: string;
  passwordHash: string;
  series: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  series: [
    {
      type: Schema.Types.ObjectId,
      ref: "Serie",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    const ret = returnedObject as {
      id?: string;
      _id?: Types.ObjectId;
      __v?: number;
      passwordHash?: string;
    };
    ret.id = ret._id?.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
  },
});

const User = model<IUser>("User", userSchema);

export default User;
