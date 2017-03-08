

export interface stream {
    canSeek(): boolean;
    canRead(): boolean;
    canWrite(): boolean;
    length(): number;
    position():number;
    seek(offset: number): void;    
    read(start?: number,count?: number): Uint8Array;
    
}