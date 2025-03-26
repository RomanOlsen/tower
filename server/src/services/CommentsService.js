import { dbContext } from "../db/DbContext.js"

class CommentsService {
  async postComment(commentBody) {
    const comment = await dbContext.Comment.create(commentBody)
    await comment.populate('creator')

    return comment
  }
}
export const commentsService = new CommentsService()