import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {
  async deleteComment(commentId, userID) {
    const comment = await dbContext.Comment.findById(commentId)
    if (comment == null) {
      throw new BadRequest('invalid id')
    }
    if (comment.creatorId != userID) {
      throw new Forbidden('Thats not your comment')
    }
    await comment.deleteOne()
    return 'comment gone'

  }
  async getEventComments(eventID) {
    const comments = await dbContext.Comment.find({ eventId: eventID }).populate('creator')
    return comments
  }
  async postComment(commentBody) {
    const comment = await dbContext.Comment.create(commentBody)
    await comment.populate('creator')

    return comment
  }
}
export const commentsService = new CommentsService()