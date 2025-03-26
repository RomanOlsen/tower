import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class TowerEventService {
  async cancelEvent(id, eventToCancel, user) {
    const event = await this.getEventById(id)
    if (event.creatorId != user.id) {
      throw new Forbidden(`You cant CANCEL someone elses event`)
    }
    event.isCanceled = true
    await event.save()
    return event
  }
  async editEvent(id, newEventData, user) { // refer to inspire lecture if lost
    const event = await this.getEventById(id)
    if (event.creatorId != user.id) {
      throw new Forbidden(`You cant EDIT someone elses event`)
    }
    event.name = newEventData.name
    event.description = newEventData.description
    event.isCanceled = false // not !event.isCanceled ?

    await event.save()

    return event
  }
  async getEventById(id) {

    const event = (await dbContext.TowerEvent.findById(id).populate('creator')).populate('ticketCount')
    return event
  }
  async getEvents() {

    const events = await dbContext.TowerEvent.find().populate('creator').populate('ticketCount')


    return events
  }
  async postEvent(eventData) {

    const event = await dbContext.TowerEvent.create(eventData)
    await event.populate('creator')
    await event.populate('ticketCount')
    //  await event.populate('ticketCount')
    return event


  }
}
export const towerEventService = new TowerEventService()