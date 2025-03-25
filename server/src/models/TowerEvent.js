import { Schema } from "mongoose";

export const towerEventSchema = new Schema(
{
  creatorId: {type: Schema.ObjectId, ref: 'Account', required: true},
  name: {type: String, minLength: 3, maxLength: 50, required: true},
  description: {type: String, minLength: 15, maxLength: 1000, required: true},
  coverImg: {type: String, required: true},
  location: {type: String, minLength: 1, maxLength: 500, required: true},
  capacity: {type: Number, min: 1, max: 5000, required: true},
  startDate: {type: Date, required: true},
  isCanceled: {type: Boolean, default: false, required: true},
  type: {type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true}
},
{
  timestamps: true,
  toJSON: {virtuals: true, versionKey: false}
}
)

// virtuals here

towerEventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

// towerEventSchema.virtual('ticketCount', {
//   localField: 'capacity',
//   foreignField: '_id',
//   ref: 'Ticket',
//   justOne: true
// })

// TODO ticketCount (but on backburner)