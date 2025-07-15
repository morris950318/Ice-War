<script setup>
    import { useRoute } from 'vue-router';
    const route = useRoute();
    const username = route.params.username;
</script>

<template>
    <h1 class="text-white">
        Hello, {{ username }}!
    </h1>
    <p class="text-white">
        Here's your Statistic.
    </p>
</template>

<style>

</style>