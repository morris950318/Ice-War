export function judgeAlive(playerMove, botMove) {
    if(playerMove === botMove) return "continue";
    const powerMap = {
        "GainMP": 0,
        "SmallFire": 1,
        "MediumFire": 2,
        "LargeFire": 3,
        "Shield": -1,
        "Reflect": -999,
    }
    const playerPower = powerMap[playerMove];
    const botPower = powerMap[botMove];
    
    /* Judge Part */
    if(playerPower>0 && botPower>0){ // Both Side Attack
        if(playerPower > botPower){
            return "Player win";
        }else if(botPower > playerPower){
            return "Bot win";
        }else{
            return "continue";
        }
    }else if(playerPower > 0){ // Only Player Attack
        // Reflect
        if(botPower === -999) return "Bot win"; 
        // GainMP
        if(botPower === 0) return "Player win";
        // Shield
        if(playerPower >= 2){
            return "Player win";
        }else{
            return "continue";
        }
    }else if(botPower > 0){ // Only Bot Attack
        // Reflect
        if(playerPower === -999) return "Player win";
        // GainMP
        if(playerPower === 0) return "Bot win";
        // Shield
        if(botPower >= 2){
            return "Bot win";
        }else{
            return "continue";
        }
    }else{ // No one Attack
        return "continue";
    }
}