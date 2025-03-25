<script setup>
import { TowerEvent } from '@/models/TowerEvent.js';
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';


defineProps({
  eventProp: {type: TowerEvent, required: true}
})

async function viewCard(Event) {
  try {
    await towerEventService.viewCard(Event)
  }
  catch (error){
    Pop.error(error);
  }
}

</script>


<template>
  <div @click="viewCard(eventProp)" class="card">
card
  </div>
</template>


<style lang="scss" scoped></style>