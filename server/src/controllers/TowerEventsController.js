import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventService } from "../services/TowerEventService.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.postEvent)


  }

  async postEvent(request, response, next){
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