import {callback} from '../core/callback';
import {eventEmitter} from '../core/eventEmitter';
import {errors} from '../core/errors';

export abstract class stream extends eventEmitter{
    constructor(bufferSize: number = 8192){
        super();
        this._bufferSize = bufferSize;
    }
    protected _bufferSize: number;
    protected _canSeek: boolean;
    protected _canWrite: boolean;
    protected _canRead: boolean;
    protected _length: number;
    protected _position: number;
    public canSeek(): boolean {return this._canSeek;}
    public canRead(): boolean {return this._canWrite;}
    public canWrite(): boolean {return this._canWrite;}
    public length(): number {return this._length;}
    public position():number {return this._position;}

    protected abstract _seek(offset: number): void;
    public seek(offset: number): void {
        if(!this._canSeek){
            super.callEvent("onError",errors.streamCannotSeek);
            return;
        }
        this._seek(offset);
    }    
    protected abstract _read(start?: number,count?: number):ArrayBuffer;
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

    private startReading(){
        let offset = 0;
        let buffer: ArrayBuffer = null;
        while((buffer = this._read(offset,this._bufferSize))!=null){
            super.callEvent('onData',buffer);
        }
        super.callEvent('onDataFinished',null);
        
    }

    private _readingStarted: boolean = false;
    public addEvent(eventName: string,func: callback): void {
        super.addEvent(eventName,func);
        if(!this._readingStarted)
              new Promise(function(resolve,reject){
                  this.startReading();
                
            }); 

    }

      
}