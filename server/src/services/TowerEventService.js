import { dbContext } from "../db/DbContext.js"

class TowerEventService {
  async editEvent(id, newEventData, user) { // refer to inspire lecture if lost
    const event = await dbContext.TowerEvent.findById(id)
    if (event.creatorId != user.id) {
      return
    }
    event.equals(newEventData)
    await event.save()

    return event
  }
  async getEventById(id) {

    const event = await dbContext.TowerEvent.findById(id).populate('creator')
    return event
  }
  async getEvents() {

    const events = await dbContext.TowerEvent.find().populate('creator')


    return events
  }
  async postEvent(eventData) {

    const event = await dbContext.TowerEvent.create(eventData)
    await event.populate('creator')
    //  await event.populate('ticketCount')
    return event


  }
}
export const towerEventService = new TowerEventService()