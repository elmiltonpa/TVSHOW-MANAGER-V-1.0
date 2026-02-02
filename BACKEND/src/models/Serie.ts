import { Schema, model, Document, Types } from "mongoose";

export interface ISerie extends Document {
  tv_title: string;
  tv_id: string;
  episode: number;
  season: number;
  watched: boolean;
  favorite: boolean;
  watching: boolean[][];
  user: Types.ObjectId;
}

const serieSchema = new Schema<ISerie>({
  tv_title: {
    type: String,
    required: true,
  },
  tv_id: {
    type: String,
    required: true,
  },
  episode: {
    type: Number,
    default: 1,
  },
  season: {
    type: Number,
    default: 1,
  },
  watched: {
    type: Boolean,
    default: false,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  watching: {
    type: [[Boolean]],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

serieSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    const ret = returnedObject as {
      id?: string;
      _id?: Types.ObjectId;
      __v?: number;
    };
    ret.id = ret._id?.toString();
    delete ret._id;
    delete ret.__v;
  },
});

const Serie = model<ISerie>("Serie", serieSchema);

export default Serie;
