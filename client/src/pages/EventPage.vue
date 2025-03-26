<script setup>
import { AppState } from '@/AppState.js';
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const event = computed(() => AppState.activeEvent)
const tickets = computed(() => AppState.activeEventTickets)
const account = computed(() => AppState.account)
const yourTickets = computed(()=> tickets.value.some(ticket => ticket.accountId == account?.value.id))
const route = useRoute()
const eventId = route.params.eventId


async function cancelEvent() {
  try {
    await towerEventService.cancelEvent(eventId)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function getTicket() {
  try {
    const payload = { eventId: eventId }
    await towerEventService.getTicket(payload)
  }
  catch (error) {
    Pop.error(error);
  }
}

onMounted(() =>
  viewCard()
)

async function viewCard() {
  try {
    await towerEventService.viewCard(eventId)
  }
  catch (error) {
    Pop.error(error);
  }
}

</script>


<template>

  <div class="container" v-if="event">
    <div class="row">
      <div class="col-12">
        <img :src="event.coverImg" alt="Event picture">
        <h1 v-if="event.isCanceled" class="fw-bold text-danger">Canceled</h1>
        <div v-if="yourTickets">You are attending</div>
        <div v-else>You are not attending</div>



      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h1>{{ event.name }}</h1>
        <p>{{ event.description }}</p>
        <!-- TODO add the fine details and style Later towards the end. -->
        <button @click="getTicket()" class="btn btn-outline-dark">Grab a Ticket</button>
        <div v-for="ticket in tickets" :key="ticket.id">Ticket for {{ ticket.accountId }}
          <div v-if="ticket.accountId == account.id">You are attending</div>
        </div>

      </div>

    </div>
    <div class="row">
      <div class="col-12">

        <button v-if="!event.isCanceled" @click="cancelEvent()" class="btn btn-outline-dark"> Cancel event </button>
      </div>
    </div>
  </div>

</template>


<style lang="scss" scoped></style>