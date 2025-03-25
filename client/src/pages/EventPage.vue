<script setup>
import { AppState } from '@/AppState.js';
import { computed } from 'vue';


const event = computed(()=> AppState.activeEvent)

</script>


<template>
<div>Event Page for {{ event }}</div>
</template>


<style lang="scss" scoped>

</style>