<script setup>
    import { defineProps} from 'vue';
    import GainMP from '@/components/GameCards/GainMP.vue';
    import SmallFire from '@/components/GameCards/SmallFire.vue';
    import MediumFire from '@/components/GameCards/MediumFire.vue';
    import LargeFire from '@/components/GameCards/LargeFire.vue';
    import Shield from '@/components/GameCards/Shield.vue';
    import Reflect from '@/components/GameCards/Reflect.vue';

    const props = defineProps({
        entityName: String,
        alive: Boolean,
        mp: Number,
    });
</script>

<template>
    <div class="flex flex-col p-4 border-white border-2 border-dashed gap-2">
        
        <div class="flex items-center gap-5">
            <h4>
                {{ props.entityName }}
            </h4>
            <h5 :class="alive?'text-green-400':'text-red-400'">
                {{ alive ? 'Alive' : 'Dead' }}
            </h5>
        </div>
        
        <div class="flex items-center gap-1.5 text-indigo-200">
            <h4>MP</h4>
            <div v-if="props.mp<=0" class="flex items-end gap-1">
                <div class="shadow-[inset_0_4px_6px_rgba(0,0,0,0.3)] rounded-full bg-gray-400 w-6 h-6" />
            </div>
            <div v-if="Number.isInteger(props.mp) && props.mp > 0" class="flex items-end gap-1">
                <div v-for="i in props.mp" :key="i">
                    <div class="shadow-[inset_0_4px_6px_rgba(0,0,0,0.3)] rounded-full bg-sky-400 w-6 h-6" />
                </div>
            </div>
        </div>
    </div>
</template>