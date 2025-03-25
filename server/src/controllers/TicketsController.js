import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketService } from "../services/TicketService.js";
import BaseController from "../utils/BaseController.js";

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.postTicket)
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