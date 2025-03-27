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
  <div class="about text-center">
    <div v-if="account">
      <div class="d-flex justify-content-center">
        <div class="bg-gray p-3 mt-3 rounded">

          <img :src="account.picture" alt="" />

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
        <h1>Your Events</h1>
      </div>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  // max-width: 100px;
  width: 7rem;
  border-radius: 50%;
}

// .bg-transparentBlack{
// background-color: rgba(0, 0, 0, 0.498);
// }</style>
