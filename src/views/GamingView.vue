<script setup>
    import { reactive, ref } from 'vue';
    import { botMove } from '../../botAI';
    import { judgeAlive } from '../../judgeAlive'
    import GainMP from '@/components/GameCards/GainMP.vue';
    import SmallFire from '@/components/GameCards/SmallFire.vue';
    import MediumFire from '@/components/GameCards/MediumFire.vue';
    import LargeFire from '@/components/GameCards/LargeFire.vue';
    import Shield from '@/components/GameCards/Shield.vue';
    import Reflect from '@/components/GameCards/Reflect.vue';
    import ShowStatus from '@/components/ShowStatus.vue';
    import GainMP_Icon from '../assets/Icons/GainMP_icon.png';
    import SmallFire_Icon from '../assets/Icons/SmallFire_icon.png';
    import MediumFire_Icon from '../assets/Icons/MediumFire_icon.png';
    import LargeFire_Icon from '../assets/Icons/LargeFire_icon.png';
    import Shield_Icon from '../assets/Icons/Shield_icon.png';
    import Reflect_Icon from '../assets/Icons/Reflect_icon.png';

    const iconMap = {
        "GainMP": GainMP_Icon,
        "SmallFire": SmallFire_Icon,
        "MediumFire": MediumFire_Icon,
        "LargeFire": LargeFire_Icon,
        "Shield": Shield_Icon,
        "Reflect": Reflect_Icon,
    };

    const mpMap = {
        "GainMP": 1,
        "SmallFire": -1,
        "MediumFire": -2,
        "LargeFire": -3,
        "Shield": 0,
        "Reflect": -1,
    };

    const system = reactive({
        gameState: 'loading', //default 'loading'
        winner: 'pending...',
        gameResult: 'Player Time Out', //possibility: ['Player Time Out', 'Player Out of Mana', 'Player Got Burned by the Bot', 'Player Scorched the Bot']
        blindMode: false,
    });

    const player = reactive({
        alive: true,
        mp: 0,
        previousDecision: "", // Default "GainMP"
    });

    const bot = reactive({
        alive: true,
        mp: 0,
        previousDecision:  "", // Default "GainMP"
    });

    const timer = ref(5);

    /* -------------Game Kernal------------- */
    const startGame = async () => {
        system.gameState = 'starting';
        await runCountdown(3, 'thinking');
        await thinking();
    }

    const thinking  = async () => {
        await runCountdown(5, 'judging'); // wait for 5 second, the go 'judging'
        await judging(player.previousDecision);
    }

    const judging = async (playerDecision) => {
        /* If player didn't make decision in time */
        if(playerDecision===''){
            system.gameState = 'ending';
            system.gameResult = 'Player Time Out';
            system.winner = "Bot";
            player.alive = false;
            return;
        }

        const botDecision = botMove(player.mp, bot.mp);
        // special case
        if(bot.mp===0 && botDecision==='Reflect') botDecision = 'GainMP'; // prevent Bot Out of Mana
        else if(player.mp===0 && botDecision==='Reflect') botDecision = 'SmallFire'; // prevent wasting Mana, just attack
        bot.previousDecision = botDecision; // update bot info

        // modify MP 
        player.mp += mpMap[playerDecision];
        bot.mp += mpMap[botDecision];

        /* If player out of Mana by mistake */
        if(player.mp < 0){
            system.gameState = 'ending';
            system.gameResult = 'Player Out Of Mana';
            system.winner = "Bot";
            player.alive = false;
            return;
        }

        // Get Result Of Current Round
        const result = judgeAlive(playerDecision, botDecision); // ["Player win", "Bot win", "continue"]
        if(result === "continue"){
            await runCountdown(3, "thinking");
            // reset, go next round
            player.previousDecision = '';
            bot.previousDecision = '';
            await thinking();
        }else{
            await runCountdown(5, "ending");
            if(result==="Player win"){
                system.winner = "Player";
                system.gameResult = 'Player Scorched the Bot';
                bot.alive = false;
            }else{
                system.winner = "Bot";
                system.gameResult = 'Player Got Burned by the Bot';
                player.alive = false;
            }
        }
    }
    /* ------------------------------------ */


    function runCountdown(seconds, nextState) {
        return new Promise((resolve) => {
            timer.value = seconds;
            const countdownInterval = setInterval(() => {
                timer.value--;
                if (timer.value <= 0) {
                    clearInterval(countdownInterval);
                    system.gameState = nextState;
                    resolve(); // ✅ 通知外部倒數結束了
                }
            }, 1000);
        });
    }
</script>

<template>
    <div class="flex flex-col items-center">
        <!-- -----Show status of player and bot---- -->
        <section v-if="system.gameState!=='loading'" class="w-full flex justify-between px-8 my-4 text-white text-4xl">
            <div class="flex gap-3">
                <ShowStatus v-if="!system.blindMode" entityName="Player" :alive="player.alive" :mp="player.mp" :decision="player.previousDecision"/>
                <div class="bg-blue-100 flex w-30 p-2 items-center justify-center rounded-lg">
                    <img :src="iconMap[player.previousDecision]" />
                </div>
            </div>
            <div class="flex gap-3">
                <div class="bg-blue-100 flex w-30 p-2 items-center justify-center rounded-lg">
                    <img :src="iconMap[bot.previousDecision]" />
                </div>
                <ShowStatus v-if="!system.blindMode" entityName="Bot" :alive="bot.alive" :mp="bot.mp" :decision="bot.previousDecision"/>
            </div>
        </section>

        <!-- Loading (wait player to press ready)-->
        <section v-if="system.gameState==='loading'" class="mt-30 flex flex-col items-center gap-12">
            <button @click="startGame" class="bg-red-900 p-5 rounded-2xl hover:border-white hover:border-2 active:bg-black">
                <h1 class="text-white text-6xl">I'm ready!</h1>
            </button>
            <button @click="()=>{system.blindMode=true; startGame();}" class="bg-black p-5 rounded-2xl hover:border-red-900 hover:border-2 active:bg-gray-900">
                <h1 class="text-white text-6xl">Activate Blind Mode</h1>
            </button>
        </section>

        <!-- Starting (count down 5 second) -->
        <section v-else-if="system.gameState==='starting'">
            <p class="text-white text-6xl">Game will begin in {{ timer }} second</p>
        </section>

        <!-- Thinking (count down 5 second for player to think, ) -->
        <section v-else-if="system.gameState==='thinking'" 
        class="flex flex-col gap-10 mt-5">
            <p class="text-white text-3xl">You have {{ timer }} second left.</p>

            <div class="flex gap-3">
                <GainMP @click="player.previousDecision='GainMP'"/>
                <Shield @click="player.previousDecision='Shield'"/>
                <Reflect @click="player.previousDecision='Reflect'"/>
            </div>
            <div class="flex gap-3">
                <SmallFire @click="player.previousDecision='SmallFire'"/>
                <MediumFire @click="player.previousDecision='MediumFire'"/>
                <LargeFire @click="player.previousDecision='LargeFire'"/>
            </div>
        </section>

        <!-- Judging (show the result of the previous move from player & bot, around 5 second) -->
        <section v-else-if="system.gameState==='judging'">
            <p class="text-white text-4xl">Next round will start in {{ timer }} second.</p>
            <div class="flex flex-col mt-30 gap-10">
                <p class="text-white text-6xl">
                    Your decision: {{ player.previousDecision }}
                </p>
                <p class="text-white text-6xl">
                    Bot's decision: {{ bot.previousDecision }}
                </p>
            </div>
        </section>

        <!-- Ending (reveal winner, show result and home page button) -->
        <section v-else-if="system.gameState==='ending'" class="flex flex-col gap-8 mt-30">
            <p class="text-white text-5xl text-center">{{ system.gameResult }}</p>
            <p class="text-7xl text-center" :class="system.winner==='Player'?'text-green-400':'text-red-400'">The Winner Is {{ system.winner }} !</p>
            <RouterLink to="/" class="bg-blue-100 py-4 rounded-lg">
                <p class="text-black text-5xl text-center">
                    Back To Home Page
                </p>
            </RouterLink>
        </section>
    </div>
</template>

<style>

</style>