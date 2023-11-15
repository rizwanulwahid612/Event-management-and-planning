import { Schema, model } from 'mongoose';
import { IPost, PostModel } from './post.interface';

const PostSchema = new Schema<IPost, PostModel>(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    imagepost: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const Post = model<IPost, PostModel>('Post', PostSchema);
