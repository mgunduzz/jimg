
export class i10n {
    
    static _culture: string = 'en-us';
    public static setCulture(culture: string){
        i10n._culture=culture;
    }
    public static getCulture(): string {
        return i10n._culture;
    }

    public  static errImageWidthOrHeightNotValid(): string {
        
        if(i10n._culture == undefined || i10n._culture == 'en-us')
           return 'image width and height must be between 1-65535';

        return 'image width and height must be between 1-65535';   
    }

    public static errUndefinedVariable(): string {
        return "undefined variable";
    }
    public static errStreamCannotSeek(): string {
        return "stream can not seek";
    }
    public static errIndexOutofRange(): string {
        return "stream can not seek";
    }

}