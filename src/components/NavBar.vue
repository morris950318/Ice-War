<script setup>
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import { globalState } from '../../global';

    const isLogin = ref(false);
    const username = 'momo95318'
</script>

<template>
    <section class="w-full bg-cyan-200 px-4 py-4 flex items-center justify-between">
        <RouterLink to="/" class="text-7xl px-5">
            <h1>🧊 Ice War</h1>
        </RouterLink>

        <div class="absolute left-1/2 transform -translate-x-1/2 text-white text-4xl">
            {{ globalState.playerWinCount }} : {{ globalState.botWinCount }}
        </div>

        <div class="flex text-4xl">
            <div v-if="isLogin">
                <p>{{ username }}</p>
            </div>
            <div v-else>
                <RouterLink to="/login">
                    login / register
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<style>
    .nav-bar {
        width: 100%;
        height: 150px;
        background-color: aqua;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 2rem;
        padding-right: 2rem;
    }

   
</style>