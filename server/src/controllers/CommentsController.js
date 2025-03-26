import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js";

export class CommentsController extends BaseController{
  constructor(){
    super('api/comments')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.postComment)
  }

  async postComment(request, response, next) {
    try {

      const commentBody = request.body

      const user = request.userInfo
      commentBody.creatorId = user.id

      const comment = await commentsService.postComment(commentBody)
      response.send(comment)
    } catch (error) {
      next(error)
    }
  }
}