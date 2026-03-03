
export const generateTacticalMap = (size: number = 5): string => {
    let map = "";
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const rand = Math.random();
            if (rand > 0.9) map += "1"; // Enemy
            else if (rand > 0.8) map += "2"; // Player
            else if (rand > 0.7) map += "3"; // Ally
            else if (rand > 0.6) map += "X"; // Conflict
            else map += "0"; // Empty
        }
        if (y < size - 1) map += "\n";
    }
    return map;
};
