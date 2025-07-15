<script setup>
    import { RouterLink } from 'vue-router';
    const username = 'momo95318';
</script>

<template>
    <section class="flex items-center flex-col justify-center gap-15 mt-30 text-center">
        <RouterLink to="/battle" class="p-6 bg-amber-400 rounded-sm">
            <div class="w-56 text-4xl">
                <h3>Start Game</h3>
            </div>
        </RouterLink>

        <RouterLink :to="`/statistic/${username}`" class="p-6 bg-amber-400 rounded-sm">
            <div class="w-56 text-4xl">
                <h3>View Statistic</h3>
            </div>
        </RouterLink>

        <RouterLink to="/rule" class="p-6 bg-amber-400 rounded-sm">
            <div class="w-56 text-4xl">
                <h3>How to play ?</h3>
            </div>
        </RouterLink>
    </section>
</template>

<style>

</style>