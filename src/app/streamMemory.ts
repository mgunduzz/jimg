import { stream } from './stream';
import { exception } from './exception';
import {i10n } from './i10n';

export class streamMemory implements stream{
  
    private _data: Uint8Array;
    private _position: number;
    private _length: number;
    public constructor(data?: Uint8Array,length?: number) {
        
        if(data && length)
            throw new exception(i10n.errUndefinedVariable());
        if(data)
        this._data = new Uint8Array(data);
        else
        if(length)
        this._data = new Uint8Array(length);
        this._position = 0;
        this._length = this._data.byteLength;
    }

    public canSeek(): boolean { return true;}
    public canRead(): boolean { return true;}
    public canWrite(): boolean { return true;}
    
    public length(): number { return this._data.byteLength; }
    position():number { return this._position; }
    seek(position: number): void {
        if( !this.canSeek() )
           throw new exception(i10n.errStreamCannotSeek());
        if( position >= this._length )
            throw new exception(i10n.errIndexOutofRange());
        this._position = position;
     }    
    read(start?: number,count?: number): Uint8Array {
        if(start)
           this.seek(start);
        let countOfBytes= count;
        if(this._position + count > this._length)
            countOfBytes = this._length - this._position;
 
        return this._data.subarray(this._position,this._position+countOfBytes);
                    
    }
}