<script setup>
import { AppState } from '@/AppState.js';
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';

const categories = AppState.categories

const eventData = ref({
  name: '',
  description: '',
  coverImg: '',
  location: '',
  capacity: '',
  startDate: '',
  type: '',
})


async function createEvent() {
  try {
    await towerEventService.createEvent(eventData.value)
  }
  catch (error) {
    Pop.error(error);
  }
}

</script>


<template>
  <div class="modal fade" id="createEventModal" tabindex="-1" aria-labelledby="albumModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content text-dark">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="albumModalLabel">Create Event</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit="createEvent()">
            <input v-model="eventData.name" type="text" minlength="3" maxlength="50" required placeholder="Name">
            <input v-model="eventData.description" type="text" minlength="15" maxlength="1000" required
              placeholder="Description">
            <input v-model="eventData.coverImg" type="url" required placeholder="Cover Image">
            <input v-model="eventData.location" type="text" minlength="1" maxlength="500" required
              placeholder="Location">
            <input v-model="eventData.capacity" type="number" min="1" max="5000" required placeholder="Capacity">
            <input v-model="eventData.startDate" type="date" required placeholder="Start date">
            <select v-model="eventData.type" id="eventCategory" required>
              <option selected disabled placeholder="Choose a category">Choose a category</option>
              <option v-for="category in categories" :key="category.name" :value="category.name" required>{{ category.name }}</option>
              <!-- unsure what :value does --> 
               <!-- UPDATE :value is whats part of the Payload! make sure its the category.name! -->

            </select>



            <button class="btn btn-outline-dark" type="submit">
              Create Event
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>