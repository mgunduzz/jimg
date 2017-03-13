
import {callback} from './callback';

/**
 * an event class with promise, 
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

    
    /**
     * executes all publishers async
     * @param eventName name of event
     * @param parameters call function parameteters
     * @returns all promises array
     */
    protected callEvent(eventName:string,parameters?: any): Array<any> {
         if(this.events.has(eventName))
         {
             return this.events.get(eventName).all(parameters);
            
         }
         return undefined;
    }
   
    

    
}


/**
 *  an event publish class, with promise
 * @see Promise
 */
class eventPublisher{
    // function callbacks array
    private promiseList: Array<any>;
    private functions: callback[];
    constructor(){
        this.functions = [];
        this.promiseList= new Array<any>();
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
    
    all(parameters?:any): Array<any> {
      
        this.promiseList = new Array<any>();
        this.functions.forEach((item) => {
            let promise = new Promise((resolve, reject) => {
                setTimeout(()=> {
                    
                  let returnVal = item.call(parameters);
                   resolve(returnVal);                   
                }, 1000);
                 
            });
            this.promiseList.push(promise);
        });
        return this.promiseList;
        
            
    }
    

}