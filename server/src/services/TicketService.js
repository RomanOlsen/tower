import { dbContext } from "../db/DbContext.js"

class TicketService {
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