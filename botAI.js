function planA_aggressive(bot){
    let decision = pickWeightedRandom([
        { action: 'GainMP', weight: 10 },
        { action: 'Attack', weight: 60 },
        { action: 'Shield', weight: 10 },
        { action: 'Reflect', weight: 20 },
    ]);
    if(decision === 'Attack'){
        decision = choseAttack(bot);
    }
    return decision;
}

function planA(bot){
    let decision = pickWeightedRandom([
        { action: 'GainMP', weight: 20 },
        { action: 'Attack', weight: 40 },
        { action: 'Shield', weight: 15 },
        { action: 'Reflect', weight: 25 },
    ]);
    if(decision === 'Attack'){
        decision = choseAttack(bot);
    }
    return decision;
}

function planB(bot){
    let decision = pickWeightedRandom([
        { action: 'GainMP', weight: 40 },
        { action: 'Attack', weight: 25 },
        { action: 'Shield', weight: 25 },
        { action: 'Reflect', weight: 25 },
    ]);
    if(decision === 'Attack'){
        decision = choseAttack(bot);
    }
    return decision;
}

function planC(bot){
    let decision = pickWeightedRandom([
        { action: 'GainMP', weight: 40 },
        { action: 'Attack', weight: 15 },
        { action: 'Shield', weight: 25 },
        { action: 'Reflect', weight: 20 },
    ]);
    if(decision === 'Attack'){
        decision = choseAttack(bot);
    }
    return decision;
}

function planC_passive(bot){
    let decision = pickWeightedRandom([
        { action: 'GainMP', weight: 35 },
        { action: 'Attack', weight: 15 },
        { action: 'Shield', weight: 15 },
        { action: 'Reflect', weight: 35 },
    ]);
    if(decision === 'Attack'){
        decision = choseAttack(bot);
    }
    return decision;
}

function choseAttack(mp){
    if(mp === 0) return 'GainMP'; //if no MP, just GainMP
    const options = []

    if (mp >= 3) {
        options.push({ action: 'LargeFire', weight: 70 })
        options.push({ action: 'MediumFire', weight: 20 })
        options.push({ action: 'SmallFire', weight: 10 })
    } else if (mp >= 2) {
        options.push({ action: 'MediumFire', weight: 60 })
        options.push({ action: 'SmallFire', weight: 40 })
    } else if (mp >= 1) {
        options.push({ action: 'SmallFire', weight: 100 })
    }

    const decision = pickWeightedRandom(options)
    return decision;
}

function pickWeightedRandom(options) {
  const totalWeight = options.reduce((sum, item) => sum + item.weight, 0)
  const rand = Math.random() * totalWeight

  let cumulative = 0
  for (const option of options) {
    cumulative += option.weight
    if (rand < cumulative) {
      return option.action
    }
  }
  return options[0].action; // prevent error
}

export function botMove(player, bot) {
    if(player===0 && bot>=2) return 'MediumFire'; // Wining Formula
    
    if(bot === player){
        if(bot === 0){
            return 'GainMP';
        }else{
            return planB(bot);
        }
    }else if(bot > player){
        if(bot-player >= 3){
            return planA_aggressive(bot);
        }else{
            return planA(bot);
        }
    }else if(bot < player){
        if(player-bot >= 3){
            return planC_passive(bot);
        }else{
            return planC(bot);
        }
    }
}