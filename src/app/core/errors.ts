
export class errors{

    public static readonly imageWidthOrHeightNotValid = { errNo: 1, msg: 'image width and height must be between 1-65535'};
    public static readonly undefinedVariable = { errNo: 2, msg: 'undefined variable'  };
    public static readonly streamCannotSeek = { errNo: 3, msg: 'stream can not seek' };
    public static readonly indexOutOfRange = { errNo: 4, msg: 'index out of range'};
    public static readonly streamCannotRead = { errNo: 5, msg: 'stream can not read' };
    public static readonly streamCannotWrite = { errNo: 6, msg: 'stream can not write' };
}
