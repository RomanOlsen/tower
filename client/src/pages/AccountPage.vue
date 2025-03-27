<script setup>
import { computed, onMounted, watch } from 'vue';
import { AppState } from '../AppState.js';
import { Pop } from '@/utils/Pop.js';
import { accountService } from '@/services/AccountService.js';
import { logger } from '@/utils/Logger.js';
import { useRoute } from 'vue-router';
import { towerEventService } from '@/services/TowerEventService.js';

const account = computed(() => AppState.account)
const events = computed(() => AppState.events)
const tickets = computed(() => AppState.tickets)

const category = computed(() => AppState.categories)
// const route = useRoute()

onMounted(() =>
  getEventsForAccount()
)




// watch(route, () => {
// getEventsForAccount()
//   })

async function getEventsForAccount() {
  try {
    // if (!account.value) {
    //   return
    // }
    await accountService.getAccount() // NOTE this works but is that okay?
    // await account
    await accountService.getEventsForAccount(account.value.id)
  }
  catch (error) {
    Pop.error(error);
    logger.error(error)
  }
}

async function deleteTicket(ticketID) {
  try {
    await towerEventService.deleteTicket(ticketID)
  }
  catch (error) {
    Pop.error(error);
  }
}


async function deleteEvent(eventID) {
  try {
    await towerEventService.deleteEvent(eventID)
  }
  catch (error) {
    Pop.error(error);
  }
}
</script>

<template>
  <div v-if="account" class="container">
    <div class="row">
      <div class="col-12">
        <div class="about text-center">
          <div class="d-flex justify-content-center">
            <div class="bg-gray p-3 mt-3 rounded">

              <img :src="account.picture" alt="" class="profile-img" />

              <h1>
                {{ account.name }}
              </h1>
              <div>
                {{ events.length }} events
                {{ tickets.length }} tickets
              </div>


            </div>
          </div>
          <div class="mt-5">
            <hr>

          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <h1 class="text-center">Your Tickets to Events</h1>
      <div v-for="ticket in tickets" :key="ticket.id" class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
        <div class="card m-2">
          <div class="text-center">

            <img :src="ticket.event.coverImg" alt="event image" class="event-img rounded">
            <div>
              <div class="d-flex justify-content-between align-items-center mx-3">
                <div class="fs-5"> {{
                  ticket.event.startDate.toLocaleString('en-US', { month: 'long' }) }}</div>
                <div class="fs-1 fw-bold text-success"> {{ ticket.event.startDate.toLocaleString('en-US', {
                  day:
                    'numeric'
                }) }} </div>

                <div class="fs-5">{{ ticket.event.startDate.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  timeZone: 'MST'
                }) }}</div>

              </div>
              <div class="fw-bold fs-3 text-center"> {{ ticket.event.name }}
              </div>
              <div class="d-flex justify-content-between align-items-center mx-1 mb-1">
                <span v-if="ticket?.event.type == category[0].name" :class="'fs-2 mdi ' + category[0].icon"> <span
                    class="fs-4 text-capitalize ms-2">{{ ticket.event.type }}</span>
                </span>
                <span v-if="ticket?.event.type == category[1].name" :class="'fs-2 mdi ' + category[1].icon">
                  <span class="fs-4 text-capitalize ms-2">{{ ticket.event.type }}</span> </span>
                <span v-if="ticket?.event.type == category[2].name" :class="'fs-2 mdi ' + category[2].icon">
                  <span class="fs-4 text-capitalize ms-2">{{ ticket.event.type }}</span> </span>
                <span v-if="ticket?.event.type == category[3].name" :class="'fs-2 mdi ' + category[3].icon">
                  <span class="fs-4 text-capitalize ms-2">{{ ticket.event.type }}</span> </span>



                <!-- <div> {{ ticket.event.description.substring(0, 25) }}... </div> -->
                <button @click="deleteTicket(ticket.id)" class="btn btn-outline-danger">Unattend</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="row">
      <h1 class="text-center my-5">Events You Created</h1>
      <div v-for="event in events" :key="event.id" class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">

        <div class="card m-2">
          <div class="text-center">

            <img :src="event.coverImg" alt="event image" class="event-img rounded">
            <div>
              <div class="d-flex justify-content-between align-items-center mx-3">
                <div class="fs-5"> {{
                  event.startDate.toLocaleString('en-US', { month: 'long' }) }}</div>
                <div class="fs-1 fw-bold text-success"> {{ event.startDate.toLocaleString('en-US', {
                  day:
                    'numeric'
                }) }} </div>

                <div class="fs-5">{{ event.startDate.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  timeZone: 'MST'
                }) }}</div>

              </div>
              <div class="fw-bold fs-3 text-center"> {{ event.name }}
              </div>
              <div class="d-flex justify-content-between align-items-center mx-1 mb-1">
                <span v-if="event.type == category[0].name" :class="'fs-2 mdi ' + category[0].icon"> <span
                    class="fs-4 text-capitalize ms-2">{{ event.type }}</span>
                </span>
                <span v-if="event.type == category[1].name" :class="'fs-2 mdi ' + category[1].icon">
                  <span class="fs-4 text-capitalize ms-2">{{ event.type }}</span> </span>
                <span v-if="event.type == category[2].name" :class="'fs-2 mdi ' + category[2].icon">
                  <span class="fs-4 text-capitalize ms-2">{{ event.type }}</span> </span>
                <span v-if="event.type == category[3].name" :class="'fs-2 mdi ' + category[3].icon">
                  <span class="fs-4 text-capitalize ms-2">{{ event.type }}</span> </span>




                <button @click="deleteEvent(event.id)" class="btn btn-outline-danger">Cancel Event</button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>

  <div v-else class="container">
    <div class="row">
      <div class="col-12">

        <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>

      </div>
    </div>
  </div>



</template>

<style scoped lang="scss">
.profile-img {
  // max-width: 100px;
  width: 7rem;
  border-radius: 50%;
  aspect-ratio: 1/1;
  object-fit: cover;

}

.MyEvent-img {
  width: 22%;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.event-img {
  width: 100%;
  height: 20dvh;
  aspect-ratio: 1/1;
  object-fit: cover;
}


// .bg-transparentBlack{
// background-color: rgba(0, 0, 0, 0.498);</style>
