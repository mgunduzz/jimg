
export class errors{

    public static readonly imageWidthOrHeightNotValid = { ErrNo: 1, Msg: 'image width and height must be between 1-65535'};
    public static readonly undefinedVariable = { ErrNo: 2, Msg: 'undefined variable'  };
    public static readonly streamCannotSeek = { ErrNo: 3, Msg: 'stream can not seek' };
    public static readonly indexOutOfRange = { ErrNo: 4, Msg: 'index out of range'};
}
