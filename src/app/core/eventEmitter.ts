
import {callback} from './callback';

/**
 * an event class, 
 */
export class eventEmitter {
    private events: Map<string, eventPublisher>;
    constructor(){
        this.events = new Map<string, eventPublisher>();
    }
    public addEvent(eventName: string,func: callback): void {
        if(!this.events.has(eventName))
            this.events.set(eventName,new eventPublisher());
        this.events.get(eventName).add(func);

    }
    public removeEvent(eventName:string,func: callback): void {
        if(this.events.has(eventName))
         {
             this.events.get(eventName).remove(func);
         }

    }
   
    protected callEvent(eventName:string,parameters: any): void {
         if(this.events.has(eventName))
         {
             this.events.get(eventName).all(parameters);
         }
    }

    
}


/**
 *  an event publish class
 */
class eventPublisher{
    // function callbacks array
    private functions: callback[];
    constructor(){
        this.functions = [];
    }

    /**
     * add function to array
     * @param func callback function
     */
    add(func: callback): void{
        if(func)
           this.functions.push(func);           
    }
    /**
     * removes functions from array
     * @param func remove callback function
     */
    remove(func: callback):void {
        let index;
        if(func)
         if((index = this.functions.findIndex(item => item === func))>=0)
          this.functions.splice(index,1);
    }

    /**
     * executes all functions with parameters
     * @param parameters execute parameters for functions
     */
    all(parameters:any):void {
        this.functions.forEach(item=> item.call(parameters));
    }
}