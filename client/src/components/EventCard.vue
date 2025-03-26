<script setup>
import { TowerEvent } from '@/models/TowerEvent.js';
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';


defineProps({
  eventProp: { type: TowerEvent, required: true }
})

async function viewCard(Event) { // NOTE we might not need this and the @click 
  try {
    await towerEventService.viewCard(Event)
  }
  catch (error) {
    Pop.error(error);
  }
}

</script>


<template>
  <RouterLink :to="{ name: 'Event Page', params: { eventId: eventProp.id } }">
    <div @click="viewCard(eventProp)" class="card">
      card {{ eventProp.name }}
    </div>
  </RouterLink>
</template>


<style lang="scss" scoped></style>