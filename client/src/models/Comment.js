export class Comment{
  constructor(data){
    this.id = data.id
      this.creatorId = data.creatorId
      this.eventId = data.eventId
      this.body = data.body

      this.creator = data.creator
      this.creator.name = data.creator.name
      this.creator.picture = data.creator.picture

  }
}