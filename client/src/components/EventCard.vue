<script setup>
import { AppState } from '@/AppState.js';
import { TowerEvent } from '@/models/TowerEvent.js';
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';


defineProps({
  eventProp: { type: TowerEvent, required: true }
})

const category = computed(() => AppState.categories)


// async function viewCard(Event) { // NOTE we might not need this and the @click 
//   try {
//     await towerEventService.viewCard(Event)
//   }
//   catch (error) {
//     Pop.error(error);
//   }
// }

</script>


<template>
  <RouterLink :to="{ name: 'Event Page', params: { eventId: eventProp.id } }">



<div class="card m-2">
  <div class="text-center">

    <img :src="eventProp.coverImg" alt="event image" class="event-img rounded">
    <div>
      <div class="d-flex justify-content-between align-items-center mx-3">
        <div class="fs-5"> {{
          eventProp.startDate.toLocaleString('en-US', { month: 'long' }) }}</div>
        <div class="fs-1 fw-bold text-success"> {{ eventProp.startDate.toLocaleString('en-US', {
          day:
            'numeric'
        }) }} </div>

        <div class="fs-5">{{ eventProp.startDate.toLocaleTimeString('en-US', {
          hour: '2-digit',
          timeZone: 'MST'
        }) }}</div>

      </div>
      <div class="fw-bold fs-3 text-center"> {{ eventProp.name }}
      </div>
  
      <div class="text-center"> {{ eventProp.location }}
      </div>
      <div class="d-flex justify-content-between align-items-center mx-2 mb-1">
        <span v-if="eventProp.type == category[0].name" :class="'fs-2 mdi ' + category[0].icon"> <span
            class="fs-4 text-capitalize ms-2">{{ eventProp.type }}</span>
        </span>
        <span v-if="eventProp.type == category[1].name" :class="'fs-2 mdi ' + category[1].icon">
          <span class="fs-4 text-capitalize ms-2">{{ eventProp.type }}</span> </span>
        <span v-if="eventProp.type == category[2].name" :class="'fs-2 mdi ' + category[2].icon">
          <span class="fs-4 text-capitalize ms-2">{{ eventProp.type }}</span> </span>
        <span v-if="eventProp.type == category[3].name" :class="'fs-2 mdi ' + category[3].icon">
          <span class="fs-4 text-capitalize ms-2">{{ eventProp.type }}</span> </span>


          <div class="fs-5 text-center"> {{ eventProp.ticketCount }} attending
          </div>

        <!-- <button @click="deleteEvent(eventProp.id)" class="btn btn-outline-danger">Cancel Event</button> -->
      </div>
    </div>
  </div>

</div>



  </RouterLink>
</template>


<style lang="scss" scoped>
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
</style>