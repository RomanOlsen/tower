import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketService {
  async deleteTicket(ticketID, userID) {
    const ticket = await dbContext.Ticket.findById(ticketID)
    if (ticket == null) {
      throw new BadRequest('invalid id')
    }
    if (ticket.accountId != userID) {
      throw new Forbidden('Thats not your ticket')
    }
    await ticket.deleteOne()
    return 'ticket gone'
  }
  async getEventTickets(eventID) {
    const tickets = await dbContext.Ticket.find({ eventId: eventID }).populate('event').populate('profile')
    return tickets
  }
  async getMyTickets(userInfoID) {
    const tickets = await dbContext.Ticket.find({ accountId: userInfoID }).populate('event')
    //{ path: 'event', populate: {
    //   path: 'creator ticketCount',

    // }}

    return tickets
  }
  async postTicket(ticketData) {
    const ticket = await dbContext.Ticket.create(ticketData)
    await ticket.populate('profile')
    await ticket.populate('event')
    return ticket
  }
}
export const ticketService = new TicketService()