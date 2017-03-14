import {callback} from '../core/callback';
import {eventEmitter} from '../core/eventEmitter';
import {errors} from '../core/errors';


/**
 * base abstract stream class that inherits from @see eventEmitter
 */
export abstract class stream extends eventEmitter{

    /**
     * @constructor
     * @param bufferSize default bufferSize for read and write
     */
    constructor(bufferSize: number = 8192){
        super();
        this._bufferSize = bufferSize;
       

    }
    //protected members for derived classes
    protected _bufferSize: number;
    protected _canSeek: boolean;
    protected _canWrite: boolean;
    protected _canRead: boolean;
    protected _length: number;
    protected _position: number;
    protected _sizeOfUnit: number;

    public canSeek(): boolean {return this._canSeek;}
    public canRead(): boolean {return this._canWrite;}
    public canWrite(): boolean {return this._canWrite;}
    public length(): number {return this._length;}
    public position():number {return this._position;}
    
    protected abstract _seek(offset: number): number;
    
    /**
     * 
     * @param offset  offset index from starting
     * @returns number seted offset value if value is <0  then an error occured, call @see lastError()
     */
    public seek(offset: number): number {
        if(!this._canSeek){
            super.callEvent("onError",errors.streamCannotSeek);
            return;
        }
        return this._seek(offset);
    }

    protected abstract _read(start?: number,count?: number):ArrayBuffer;

    /**
     * 
     * @param start start index of stream, if undefined current position
     * @param count count of items, if undefined end of stream
     * @returns ArrayBuffer, if value is undefined then call @see lastError() 
     */
    public read(start?: number,count?: number): ArrayBuffer {
        if(!this._canRead){
            super.callEvent("onError",errors.streamCannotRead);
            return;        
        }
        return this._read(start,count);
    }

    protected abstract _write(items: ArrayBuffer): void;
    public write(items: ArrayBuffer): void {
        if(!this._canWrite){
            super.callEvent('onError',errors.streamCannotWrite);
            return;
        }
        this._write(items);
    }

    protected _lastError: any = undefined;
    /**
     * @returns lastError
     */
    public lastError(): any {return this._lastError;}

    private startReading(){
        this.lastError = undefined;
        let offset = 0;
        let buffer: ArrayBuffer = null;
        while((buffer = this._read(offset,this._bufferSize))!=undefined){            
            offset += (buffer.byteLength/this._sizeOfUnit);
            super.callEvent('onData',buffer);
        }
        if(this._lastError)
          super.callEvent('onError',this._lastError);
        else
          super.callEvent('onDataFinished');
        
    }

    private _readingStarted: boolean = false;
    /**
     * 
     * @param eventName name of event like onRead, onWrite, onClosed
     * @param func callback function as @see callback
     */
    public addEvent(eventName: string,func: callback): void {
        super.addEvent(eventName,func);
        if(!this._readingStarted && eventName === 'onData'){
            
            new Promise((resolve,reject)=>{
                  this.startReading();
                  resolve();
            }); 
            this._readingStarted = true;
        }

    }

      
}