<script setup>
import { computed, onMounted, watch } from 'vue';
import { AppState } from '../AppState.js';
import { Pop } from '@/utils/Pop.js';
import { accountService } from '@/services/AccountService.js';
import { logger } from '@/utils/Logger.js';
import { useRoute } from 'vue-router';

const account = computed(() => AppState.account)
const events = computed(() => AppState.events)
const tickets = computed(() => AppState.tickets)
const ticketedEvents = computed(()=> AppState.ticketedEvents)
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
            <h1>Events You Created</h1>

          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-for="event in events" :key="event.id" class="col-1">
        <div class="card">
          <img :src="event.coverImg" alt="" class="event-img">
          {{ event.name }}

        </div>
      </div>

    </div>
    <div class="row">
      <h1 class="text-center">Your Tickets to Events</h1>
      <div v-for="ticket in tickets" :key="ticket.id" class="col-1">
        <div class="card">
          <img :src="ticket.event.coverImg" alt="" class="event-img">

          {{ ticket.event.capacity }}
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
.event-img{
  width: 100%;
   height: 40dvh;
  aspect-ratio: 1/1;
  object-fit: cover;
}
// .bg-transparentBlack{
// background-color: rgba(0, 0, 0, 0.498);
// }</style>
