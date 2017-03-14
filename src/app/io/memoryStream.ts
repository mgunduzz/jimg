import { stream } from './stream';
import {callback} from '../core/callback';
import {errors} from '../core/errors';


export class memoryStream extends stream{
  

    protected _bufferSize: number;
    protected _canSeek: boolean;
    protected _canWrite: boolean;
    protected _canRead: boolean;
    protected _length: number;
    protected _position: number;
    protected _lastError: any;
    protected _sizeOfUnit: number;
    private _data: Uint8ClampedArray;    
  

    public constructor(dataorlength: any,bufferSize: number = 8192 ) {        
        super(bufferSize);
        this._bufferSize = bufferSize;                          
        this._data = new Uint8ClampedArray(dataorlength);                       
        this._position = 0;
        this._length = this._data.length;
        this._sizeOfUnit = 1;
        this._canSeek = true;
        this._canWrite = true;
        this._canRead = true;
        this._lastError = undefined;
        
    }    
    
    protected _seek(position: number): number {
        
        if( position >= this._length ){
            
            this._lastError = errors.indexOutOfRange;
            return -1;
        }
        this._position = position;
        return this._position;
     }    
    protected _read(start?: number,count?: number):ArrayBuffer{
       if(start && start == this._length) //end of stream
             return undefined;
       if(start && this._position != start){            
           let ret = this.seek(start);
           if(ret === -1)
             return undefined;
        }
        
        let countOfItems= count;
       
        if(this._position + count > this._length)
            countOfItems = this._length - this._position;
 
        return this._data.slice(this._position,this._position+countOfItems).buffer;
                    
    }
    protected _write(items: ArrayBuffer): void{

    }
}