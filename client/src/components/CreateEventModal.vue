<script setup>
import { AppState } from '@/AppState.js';
import { router } from '@/router.js';
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.js';
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
    const event = await towerEventService.createEvent(eventData.value)
    Modal.getOrCreateInstance('#createEventModal').hide()

    router.push({ name: 'Event Page', params: { eventId: event.id } })
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
          <form @submit.prevent="createEvent()">
            <div class="d-flex align-items-center justify-content-between my-1">
              <label for="name">Name
              </label>
              <input name="name" v-model="eventData.name" type="text" minlength="3" maxlength="50" required placeholder="Name">
            </div>
            <div class="d-flex align-items-center justify-content-between my-1">
              <label for="description">Description
              </label>
              <input v-model="eventData.description" type="text" minlength="15" maxlength="1000" required
              placeholder="Description">
            </div>
            <div class="d-flex align-items-center justify-content-between my-1">
              <label for="Cover Image">Cover Image
              </label>
              <input v-model="eventData.coverImg" type="url" required placeholder="Cover Image">
            </div>
            <div class="d-flex align-items-center justify-content-between my-1">
              <label for="Location">Location
              </label>
              <input v-model="eventData.location" type="text" minlength="1" maxlength="500" required
                placeholder="Location">
            </div>
            <div class="d-flex align-items-center justify-content-between my-1">
              <label for="Capacity">Capacity
              </label>
              <input v-model="eventData.capacity" type="number" min="1" max="5000" required placeholder="Capacity">
            </div>
            <div class="d-flex align-items-center justify-content-between my-1">
              <label for="Start date">Start date
              </label>
              <input v-model="eventData.startDate" type="date" required placeholder="Start date">
            </div>
            <div class="d-flex align-items-center justify-content-between my-1">
              <label for="Category">Category
              </label>
              <select v-model="eventData.type" id="eventCategory" required>
              <option selected disabled placeholder="Choose a category">Choose a category</option>
              <option v-for="category in categories" :key="category.name" :value="category.name" required>{{
                category.name }}</option>
          </select>
            </div>
              <!-- unsure what :value does -->
              <!-- UPDATE :value is whats part of the Payload! make sure its the category.name! -->



            <div class="text-end">

              <button class="btn btn-outline-dark" type="submit">
                Create Event
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>