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

function changeCategory(category){
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
  <div class="container">
    <div class="row">
      <div v-for="event in events" :key="event.id" class="col-6">
        <EventCard :event-prop="event" />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        Discover an Event (non functional)
      </div>
      <div v-if="account" class="col-6">
        <div class="p-4 fs-3 fw-bold text-center rounded mb-2" role="button" title="Create new album"
          data-bs-toggle="modal" data-bs-target="#createEventModal">
          Create Event
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-evenly">
          <div @click="changeCategory(null)" class="text-center mdi mdi-infinity">
            <div>All</div>
          </div>
          <div v-for="category in categories" :key="category.name" class="text-center mdi" :class="category.icon"
            @click="changeCategory(category)">
            <div>{{ category.name }}</div>
          </div>
        </div>
      </div>

    </div>
  </div>
  <CreateEventModal />
</template>

<style scoped lang="scss"></style>
