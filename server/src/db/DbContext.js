import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { towerEventSchema } from '../models/TowerEvent.js';
import { ticketSchema } from '../models/Ticket.js';


class DbContext {
  TowerEvent = mongoose.model('TowerEvent', towerEventSchema)
  Account = mongoose.model('Account', AccountSchema);
  Ticket = mongoose.model('Ticket', ticketSchema)
}

export const dbContext = new DbContext()
