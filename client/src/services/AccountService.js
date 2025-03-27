import { TowerEvent } from '@/models/TowerEvent.js'
import { AppState } from '../AppState.js'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'
import { Ticket } from '@/models/Ticket.js'

class AccountService {
  async getEventsForAccount(accountID) {
    const response = await api.get('api/events')
    logger.log(response.data)
    const events = response.data.map(pojo => new TowerEvent(pojo))
    AppState.events = events

     const accountEvents = AppState.events.filter(event => event.creatorId == accountID) // ANCHOR i guess this is our current workaround
     AppState.events = accountEvents
     logger.log(AppState.events)

     // SECTION Tickets

     const response2 = await api.get('account/tickets')
     logger.log(response2.data)
      const tickets = response2.data.map(pojo => new Ticket(pojo))
      AppState.tickets = tickets
     


  }
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
}

export const accountService = new AccountService()
