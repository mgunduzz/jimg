import {limits} from './limits';
import {i10n} from './i10n';
import {exception} from './exception';
    
    export class image{
        private _width: number;
        private _height: number;
        private _format: number;
        private _pixels: Uint8Array;
        public constructor(width: number,height:number,format?: imageFormat,pixels?: Uint8Array){            

            
            if(format)
            this._format = format;

            if(width <= limits.uint16_MIN || width > limits.uint16_MAX)
            throw new exception(i10n.errImageWidthOrHeightNotValid());
            this._width = width;

            if(height <= limits.uint16_MIN || height > limits.uint16_MAX)
            throw new exception(i10n.errImageWidthOrHeightNotValid());
            this._height =  height;
           

        };
                

        public width(): number{            
            return this._width;
        }
        public height(): number{
            return this._height;
        }

        public format(): imageFormat{
            return this._format;
        }
        
        
    }
    

    export enum imageFormat{
        RGB,
        RGBA
    }

    
