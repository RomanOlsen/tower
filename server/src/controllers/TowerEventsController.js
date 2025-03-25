import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventService } from "../services/TowerEventService.js";
import { dbContext } from "../db/DbContext.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getEvents)
      .get('/:eventId', this.getEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.postEvent)
      .put('/:eventId', this.editEvent)


  }
async  editEvent(request, response, next) {
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
async  getEventById(request,response,next) {
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