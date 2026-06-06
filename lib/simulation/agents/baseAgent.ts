
export class BaseAgent {
    id: string;
    type: string;
    state: Record<string, any>;

    constructor(id: string, type: string) {
        this.id = id;
        this.type = type;
        this.state = {};
    }

    update(tick: number): void {
        // Base update logic
    }

    setState(key: string, value: any): void {
        this.state[key] = value;
    }
}
