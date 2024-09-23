export type Timestamp = number;

export interface Page<T, M> {
    backward?: M;
    items: T[];
} 
