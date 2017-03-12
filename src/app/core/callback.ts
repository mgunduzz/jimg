
/**
 *  this class represents a function delegate class,
 *  @example 
 *  func test(x: number) { return  x+3 ;}
 *  var caller = new callback(test);
 *  var returnValue = caller.call(5);
 *  returnValue is 8
 *  @public
 */
export class callback {

    private func: (parameters: any) => any;

    /**
     * @constructs
     * @param func , a function that uses only a parameter with any type, this function must not be rest parameters structure
     * @public
     */
    public constructor(func: (parameters: any) => any) {

        this.func = func;

    }

    /**
     * 
     * @param parameters function parameter with any type
     * @return if func is defined then void or func return  else undefined
     */
    public call(parameters: any): any {
        if (this.func)
            return this.func(parameters);
        return undefined;
    }
}
