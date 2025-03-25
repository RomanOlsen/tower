import { dbContext } from "../db/DbContext.js"

class TicketService{
  async postTicket(ticketData) {
    const ticket = await dbContext.Ticket.create(ticketData)
    await ticket.populate('profile')
    await ticket.populate('event')
    return ticket
  }
}
export const ticketService = new TicketService()