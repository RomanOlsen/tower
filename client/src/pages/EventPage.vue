<script setup>
import { AppState } from '@/AppState.js';
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const event = computed(() => AppState.activeEvent)
const route = useRoute()
const eventId = route.params.eventId


async function cancelEvent() {
  try {
    await towerEventService.cancelEvent(eventId)
  }
  catch (error){
    Pop.error(error);
  }
}

onMounted(()=>
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
  <div>Event Page for {{ event }}</div>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <button @click="cancelEvent()" class="btn btn-outline-dark"> Cancel event </button>
      </div>
    </div>
  </div>
  
</template>


<style lang="scss" scoped></style>