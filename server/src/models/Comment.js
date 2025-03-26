import { Schema } from "mongoose";

export const commentSchema = new Schema(
  {
    creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
    eventId: { type: Schema.ObjectId, ref: 'TowerEvent', required: true },
    body: {type: String, required: true}
  },
  {

    timestamps: true,
    toJSON: { virtuals: true, versionKey: false }

  }
)

//virtual

commentSchema.virtual('creator',{
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})