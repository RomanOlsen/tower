import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from "@/models/TowerEvent.js"
import { AppState } from "@/AppState.js"

class TowerEventService {

  async cancelEvent(eventId) {
    const response = await api.delete(`api/events/${eventId}`)
    logger.log(response.data)
    AppState.activeEvent.isCanceled = true
    

  }
  changeCategory(category) {
    AppState.activeCategory = category
    logger.log(AppState.activeCategory);
    
  }
  async createEvent(eventData) {
    const response = await api.post('api/events', eventData)
    logger.log(response.data)
    const event = new TowerEvent(response.data)
    AppState.events.push(event) // ANCHOR  push and unshift both moving it to bottom???
  }
  async viewCard(EventID) {
    // AppState.activeEvent = Event
    // logger.log(Event)

    const response = await api.get(`api/events/${EventID}`)
    const event = new TowerEvent(response.data)
    AppState.activeEvent = event
    
  }
  async getEvents() {
    const response = await api.get('api/events')
    logger.log(response.data)
    const events = response.data.map(pojo => new TowerEvent(pojo))
    AppState.events = events
  }
}
export const towerEventService = new TowerEventService()