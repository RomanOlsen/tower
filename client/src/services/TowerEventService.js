import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from "@/models/TowerEvent.js"
import { AppState } from "@/AppState.js"
import { Ticket } from "@/models/Ticket.js"
import { Comment } from "@/models/Comment.js"

class TowerEventService {
  async deleteEvent(eventID) {
    const response = await api.delete(`api/events/${eventID}`)
    const eventIndex = AppState.events.findIndex(event => event.id == eventID)
    logger.log(eventIndex)
    AppState.events.splice(eventIndex, 1)

  }
  async deleteTicket(ticketID) {
    const response = await api.delete(`api/tickets/${ticketID}`)
    const ticketIndex = AppState.tickets.findIndex(ticket => ticket.id == ticketID)
    logger.log(ticketIndex)
    AppState.tickets.splice(ticketIndex, 1)
  }
  async getTicket(payload) {
 
    const response = await api.post('api/tickets', payload)
    logger.log(response.data)
    const ticket = new Ticket(response.data)
    if (AppState.activeEvent.ticketCount >= AppState.activeEvent.capacity) {
      return
    }
    AppState.activeEventTickets.push(ticket)
    AppState.activeEvent.ticketCount++
  }

  async cancelEvent(eventId) {
    const response = await api.delete(`api/events/${eventId}`)
    logger.log(response.data)
    AppState.activeEvent = new TowerEvent(response.data) // better than below? since its pulling whatevers on the back-end
    // AppState.activeEvent.isCanceled = true 

    

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
  async viewCard(EventID) { // NOTE gets event details AND tickets for the event
    const response = await api.get(`api/events/${EventID}`)
    const event = new TowerEvent(response.data)
    AppState.activeEvent = event
    logger.log(AppState.activeEvent);
    
// SECTION get tickets for page below
    const response2 = await api.get(`api/events/${EventID}/tickets`)
    const tickets = response2.data.map(pojo => new Ticket(pojo))
    AppState.activeEventTickets = tickets

// SECTION get comments for page

    const response3 = await api.get(`api/events/${EventID}/comments`)
    const comments = response3.data.map(pojo => new Comment(pojo))
    AppState.activeEventComments = comments
    
  }
  async getEvents() {
    const response = await api.get('api/events')
    logger.log(response.data)
    const events = response.data.map(pojo => new TowerEvent(pojo))
    AppState.events = events
  }
}
export const towerEventService = new TowerEventService()