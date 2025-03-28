<script setup>
import { AppState } from '@/AppState.js';
import { towerEventService } from '@/services/TowerEventService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';


const event = computed(() => AppState.activeEvent)
const tickets = computed(() => AppState.activeEventTickets)
const account = computed(() => AppState.account)
const yourTickets = computed(() => tickets.value.some(ticket => ticket.accountId == account.value?.id))
const comments = computed(() => AppState.activeEventComments)
const route = useRoute()
const category = computed(() => AppState.categories)
const eventId = route.params.eventId

const commentData = ref({
  body: ''
})

async function cancelEvent() {
  const confirmed = await Pop.confirm('Are you sure you want to cancel the event?')
  if (!confirmed) {
    return
  }
  try {
    await towerEventService.cancelEvent(eventId)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function getTicket() {
  try {
    const payload = { eventId: eventId }
    await towerEventService.getTicket(payload)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function postComment() {
  try {

    const payload = { body: commentData.value.body, creatorId: account.value.id, eventId: eventId }
    await towerEventService.postComment(payload)
  }
  catch (error) {
    Pop.error(error);
  }
}

async function deleteComment(commentID) {
  const confirmed = await Pop.confirm('Are you sure you want to delete this comment?')
  if (!confirmed) {
    return
  }
  try {

    await towerEventService.deleteComment(commentID)
  }
  catch (error) {
    Pop.error(error);
  }
}

onMounted(() =>
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

  <div class="container" v-if="event">
    <div class="row">
      <div class="col-12">
        <img :src="event.coverImg" alt="Event picture" class="event-image">
        <h1 v-if="event.isCanceled" class="fw-bold text-danger">Canceled</h1>
        <div v-else class="d-flex justify-content-evenly align-items-center">
          <h1 v-if="yourTickets" class="text-success">You are attending this event!</h1>
          <h2 v-else>You are not attending this event.</h2>

          <h1 v-if="event.ticketCount >= event.capacity" class="text-primary">SOLD OUT</h1>
          <div v-else class="fs-5 text-center"> {{ event.ticketCount }}/{{
            event.capacity }} attending |
            <span>{{ event.capacity - event.ticketCount }} Spots Left</span>
          </div>

        </div>




        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between">

          <h1>{{ event.name }}</h1>

          <span v-if="event.type == category[0].name" :class="'fs-2 mdi ' + category[0].icon"> <span
              class="fs-4 text-capitalize ms-2">{{ event.type }}</span>
          </span>
          <span v-if="event.type == category[1].name" :class="'fs-2 mdi ' + category[1].icon">
            <span class="fs-4 text-capitalize ms-2">{{ event.type }}</span> </span>
          <span v-if="event.type == category[2].name" :class="'fs-2 mdi ' + category[2].icon">
            <span class="fs-4 text-capitalize ms-2">{{ event.type }}</span> </span>
          <span v-if="event.type == category[3].name" :class="'fs-2 mdi ' + category[3].icon">
            <span class="fs-4 text-capitalize ms-2">{{ event.type }}</span> </span>
        </div>

        <h2>By {{ event.creator.name }}</h2>
        <p>{{ event.description }}</p>

        <h3>Starts on: {{ event.startDate.toLocaleString() }}</h3>
        <h3>Located: {{ event.location }}</h3>
        <hr>
        <!-- TODO add the fine details and style Later towards the end. -->
        <button v-if="!event.isCanceled && account" @click="getTicket()" class="btn btn-outline-dark"
          :disabled="event.ticketCount >= event.capacity">Grab a Ticket</button>
        <div class="my-3" v-if="account && !event.isCanceled">Tickets: {{ event.ticketCount }}</div>
        <div class="card mb-1" v-for="ticket in tickets" :key="ticket.id">
          <div class="d-flex justify-content-between align-items-center">
            <div class="fw-bold m-2">
              <img :src="ticket.profile.picture" alt="" class="ticket-image">
              <span class="ms-2">{{ ticket.profile.name }}</span>
            </div>

            <div v-if="account && ticket.accountId == account.id" class="me-2">This is yours!</div>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div v-if="account && !event.isCanceled && account.id == event.creatorId" class="row">
      <div class="col-12 text-center">

        <button v-if="!event.isCanceled" @click="cancelEvent()" class="btn btn-outline-dark"> Cancel event </button>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-12">

        <form v-if="account && !event.isCanceled" @submit.prevent="postComment()" class="text-center">
          <div class="mb-2">

            <button class="btn btn-primary text-light" type="submit">Write a comment</button>
          </div>
          <input class="comment-box" v-model="commentData.body" type="text" required>
        </form>

        <div class="d-inline-block">
          <div v-for="comment in comments" :key="comment.id" class="card my-2">


            <div class="card-body d-flex align-items-center gap-4">
              <img :src="comment.creator.picture" class="profile-img" alt="">
              <div>
                <div class="fw-bold fs-4">
                  {{ comment.creator.name }}
                </div>
                <div>
                  {{ comment.body }}
                </div>
              </div>

            </div>
            <div class="text-end mb-1 me-1">
              <button @click="deleteComment(comment.id)" class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>


<style lang="scss" scoped>
.profile-img {
  // max-width: 100px;
  width: 5rem;
  border-radius: 50%;
  aspect-ratio: 1/1;
  object-fit: cover;

}

.event-image {


  width: 100%;
  height: 70dvh;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.ticket-image {
  width: 3rem;
  border-radius: 50%;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.comment-box {
  width: 100%;
}
</style>