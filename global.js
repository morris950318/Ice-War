import { reactive } from 'vue';

export const globalState = reactive({
  playerWinCount: 0,
  botWinCount: 0,
})