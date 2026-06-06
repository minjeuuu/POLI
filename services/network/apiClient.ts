
export class ApiClient {
    private baseUrl: string;
    private headers: Record<string, string>;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.headers = { 'Content-Type': 'application/json' };
    }

    protected async get<T>(endpoint: string): Promise<T> {
        const res = await fetch(`${this.baseUrl}${endpoint}`, { headers: this.headers });
        return res.json();
    }

    protected async post<T>(endpoint: string, body: any): Promise<T> {
        const res = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        });
        return res.json();
    }
}
