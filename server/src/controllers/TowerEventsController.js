import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventService } from "../services/TowerEventService.js";
import { dbContext } from "../db/DbContext.js";
import { ticketService } from "../services/TicketService.js";
import { commentsService } from "../services/CommentsService.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getEvents)
      .get('/:eventId', this.getEventById)
      .get('/:eventId/tickets', this.getEventTickets) 
      .get('/:eventId/comments', this.getEventComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.postEvent)
      .put('/:eventId', this.editEvent)
      .delete('/:eventId', this.cancelEvent)


  }
  async getEventComments(request, response, next) {
    try {
      const eventID = request.params.eventId
      const comments = await commentsService.getEventComments(eventID)
      response.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async getEventTickets(request, response, next) {
    try {
      const eventID = request.params.eventId
      const tickets = await ticketService.getEventTickets(eventID)
      response.send(tickets)
    } catch (error) {
      next(error)
    }
  }
  async cancelEvent(request, response, next) {
    try {
      const eventToCancel = request.body
      const id = request.params.eventId
      const user = request.userInfo
      const event = await towerEventService.cancelEvent(id, eventToCancel, user)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }
  async editEvent(request, response, next) {
    try {
      const newEventData = request.body
      const id = request.params.eventId

      const user = request.userInfo

      const event = await towerEventService.editEvent(id, newEventData, user)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }
  async getEventById(request, response, next) {
    try {
      const id = request.params.eventId
      const event = await towerEventService.getEventById(id)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }
  async getEvents(request, response, next) {
    try {

      const events = await towerEventService.getEvents()
      response.send(events)
    } catch (error) {
      next(error)
    }
  }

  async postEvent(request, response, next) {
    try {
      const eventData = request.body
      const user = request.userInfo
      eventData.creatorId = user.id

      const event = await towerEventService.postEvent(eventData)
      response.send(event)
    } catch (error) {
      next(error) // next(error) NOT next.error(error)
    }
  }
}