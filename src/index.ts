import {WeChatFerryBot} from './bot'
import * as WeChatFerry from './utils'

export {WeChatFerry}
export * from "./bot";
export * from "./message";
export * from "./http";
export * from "./utils";

export declare const name = 'adapter-wechat-ferry'
export default WeChatFerryBot;

declare module "@satorijs/core" {
  interface Session {
    wechatFerry?: WeChatFerry.RequestBody & WeChatFerry.Internal;
  }
}
