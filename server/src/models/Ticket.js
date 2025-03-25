import { Schema } from "mongoose";

export const ticketSchema = new Schema(
  {
    accountId: { type: Schema.ObjectId, ref: 'Account', required: true },
    eventId: { type: Schema.ObjectId, ref: 'TowerEvent', required: true }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, versionKey: false }
  }
)

// virtuals here

ticketSchema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

ticketSchema.virtual('event', {
  localField: 'eventId',
  foreignField: 'id',
  ref: 'TowerEvent',
  justOne: true
})