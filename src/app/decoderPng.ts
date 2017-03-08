import {image} from './image';
import {exception} from './exception';

enum PNGColorType
{
  LCT_GREY = 0, /*greyscale: 1,2,4,8,16 bit*/
  LCT_RGB = 2, /*RGB: 8,16 bit*/
  LCT_PALETTE = 3, /*palette: 1,2,4,8 bit*/
  LCT_GREY_ALPHA = 4, /*greyscale with alpha: 8,16 bit*/
  LCT_RGBA = 6 /*RGB with alpha: 8,16 bit*/
} ;


export class decoderPng{
       public static decode(): image {
           return undefined;
       }
}