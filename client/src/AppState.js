import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {import('./models/TowerEvent.js').TowerEvent[]} user info from the database*/
  events: [],
    /** @type {import('./models/TowerEvent.js').TowerEvent} user info from the database*/
  activeEvent: null,
  categories: [
    {name: 'concert', icon: 'mdi-microphone-variant'}, {name: 'convention', icon: 'mdi-account-group-outline'}, {name: 'sport', icon: 'mdi-soccer'}, {name: 'digital', icon: 'mdi-monitor'}],
  activeCategory: null
})

