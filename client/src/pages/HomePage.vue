<script setup>
import { AppState } from '@/AppState.js';
import EventCard from '@/components/EventCard.vue';
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';


const events = computed(() => AppState.events)

onMounted(() =>{
  getEvents()
})

async function getEvents() {
  try {
    await towerEventService.getEvents()
  }
  catch (error){
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
  </div>
</template>

<style scoped lang="scss"></style>
