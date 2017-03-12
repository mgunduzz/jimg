import {callback} from '../core/callback';
import {buffer} from '../core/buffer';




export abstract class stream {
    abstract canSeek(): boolean;
    abstract canRead(): boolean;
    abstract canWrite(): boolean;
    abstract length(): number;
    abstract position():number;
    abstract seek(offset: number): void;    
    abstract read(start?: number,count?: number): buffer;
    abstract write(items: buffer): void;


   
}