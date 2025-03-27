export class Ticket{
  /**
   * @param {{ id: any; accountId: any; eventId: any; event: { capacity: any; coverImg: any; createdAt: any; creatorId: any; description: any; id: any; isCanceled: any; location: any; name: any; startDate: any; type: any; updatedAt: any; }; }} data
   */
constructor(data){
  this.id = data.id
  this.accountId = data.accountId
  this.eventId = data.eventId

  this.event = data.event
  this.event.capacity = data.event.capacity
  this.event.coverImg = data.event.coverImg
  this.event.createdAt = data.event.createdAt
  this.event.creatorId = data.event.creatorId
  this.event.description = data.event.description
  this.event.id = data.event.id
  this.event.isCanceled = data.event.isCanceled
  this.event.location = data.event.location
  this.event.name = data.event.name
  this.event.startDate = data.event.startDate
  this.event.type = data.event.type
  this.event.updatedAt = data.event.updatedAt

  
}
}