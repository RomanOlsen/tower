<script setup>
import { AppState } from '@/AppState.js';
import CreateEventModal from '@/components/CreateEventModal.vue';
import EventCard from '@/components/EventCard.vue';
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';


const categories = AppState.categories
const activeCategory = computed(() => AppState.activeCategory)
const events = computed(() => {
  if (!activeCategory.value) {
    return AppState.events
  }
  return AppState.events.filter(event => event.type == activeCategory.value.name)
})

const account = computed(() => AppState.account)




onMounted(() => {
  getEvents()
})

function changeCategory(category) {
  towerEventService.changeCategory(category)
}

async function getEvents() {
  try {
    await towerEventService.getEvents()
  }
  catch (error) {
    Pop.error(error);
  }
}



</script>

<template>
  <div class="container-fluid">
    <div class="row homepageBg">
      <div class="col-12 text-light text-center align-items-center d-flex justify-content-center">


        <div>
          <h1 class="bg-dark rounded p-2">Welcome to the Tower Event App!</h1>
        </div>
      </div>


      <div class="col-12 text-light text-center align-items-center d-flex justify-content-center">

        <p class="bg-dark rounded p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum deserunt fuga
          tenetur ut eius laboriosam consequatur porro nisi, culpa debitis.</p>
      </div>



    </div>

    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-around align-items-center">
          <div class="fw-bold fs-4">Discover some events!</div>
          <div v-if="account">

            <div class="bg-dark rounded text-light p-3 m-3 fw-bold" role="button" title="Create new album" data-bs-toggle="modal"
              data-bs-target="#createEventModal">+ Create an Event</div>

          </div>
        </div>
      </div>
      <hr>
    </div>
    <div class="row">
      <div class="col-12">

        <div class="d-flex justify-content-evenly">
          <div @click="changeCategory(null)" class="text-center mdi mdi-infinity bg-dark text-light p-2 rounded"
            role="button">
            <div>All</div>
          </div>
          <div v-for="category in categories" :key="category.name"
            class="text-center mdi bg-dark text-light p-2 rounded" :class="category.icon"
            @click="changeCategory(category)" role="button">
            <div>{{ category.name }}</div>



          </div>
        </div>
        <hr>
      </div>
    </div>

    <div class="row">
      <div v-for="event in events" :key="event.id" class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
        <EventCard :event-prop="event" class="text-decoration-none" />
      </div>
    </div>
  </div>
  <CreateEventModal />
</template>

<style lang="scss">
// .noDeco{
//   text-decoration: none;
// }

.homepageBg {
  background-image: url(https://images.unsplash.com/photo-1612389930565-6975454dc7cc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlb3BsZSUyMGV2ZW50fGVufDB8fDB8fHww);
  height: 70dvh;
  background-size: cover;
  background-position: bottom;

  // aspect-ratio: 2/1;
}
</style>
