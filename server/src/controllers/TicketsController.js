import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketService } from "../services/TicketService.js";
import BaseController from "../utils/BaseController.js";

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.postTicket)
      .delete('/:ticketId', this.deleteTicket)
  }
  async deleteTicket(request, response, next) {
    try {
      const ticketID = request.params.ticketId
      const userID = request.userInfo.id
      const ticket = await ticketService.deleteTicket(ticketID, userID)
      response.send(ticket)
    } catch (error) {
      next(error)
    }
  }
  async postTicket(request, response, next) {
    try {
      const ticketData = request.body

      const user = request.userInfo
      ticketData.accountId = user.id
      const ticket = await ticketService.postTicket(ticketData)
      response.send(ticket)
    } catch (error) {
      next(error)
    }
  }
}