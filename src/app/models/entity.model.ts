export interface Entity {
    id: string | number;
    created_at: Date;
}

export interface BatchResult {
    success: number;
    failed: number;
    collisions: number;
    executionTime: number;
}