import { dbContext } from "../db/DbContext.js"

class TowerEventService {
  async postEvent(eventData) {

   const event = await dbContext.TowerEvent.create(eventData)
   await event.populate('creator')
  //  await event.populate('ticketCount')
   return event


  }
}
export const towerEventService = new TowerEventService()