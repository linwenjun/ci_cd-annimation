interface Position {
    left: number;
    top: number;
    width: number;
}

interface Positions {
    [key: string]: Position;
}

const positions: Positions = {
    "Backlong": {
        left: 0,
        top: 0,
        width: 0
    }
};

interface SD {
    color: string;
}

interface StageDefination {
    [key: string]: SD;
}

export const stageDefination: StageDefination = {
    "Backlong": {
        color: "#023C4E"
    },
    "BA": { color: "#EE6078" },
    "UX": { color: "#CC860C" },
    "Dev": { color: "#6B9E78" },
    "QA": { color: "#48A1AD" },
    "Deployment": { color: "#634F7D" }
}

export const stages = Object.keys(stageDefination)

export const tasksInBucket = 1;

export function updatePosition(key: string, bounding: Position) {
    positions[key] = bounding
    console.log(positions)
}

export function getPositionByKey(key: string) {
    return positions[key]
}

// export 