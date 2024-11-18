import { Context, h, User } from 'koishi'
import { WeChatFerryBot } from './bot'
import { MessageType, MsgCb, Ui } from './types'
import * as xml2js from 'xml2js'
import * as WechatFerry from "./types";
export * from "./types";

export async function adaptSession<C extends Context>(bot: WeChatFerryBot<C>, input: MsgCb): Promise<C[typeof Context.session]>{
  const session = bot.session()
  session.timestamp = input.ts;
  session.userId = input.sender;
  session.channelId = input.roomid || session.userId;
  session.messageId = input.id;
  session.subtype = input.is_group ? "group" : "private"
  if (input.type === MessageType.friend_confirm /* friend_confirm */) {
    session.isDirect = true
    session.type = "friend-request"
    session.event.type="friend-request"
    session.event.timestamp = input.ts;
    session.event.selfId = bot.selfId

    const wxid = input.content.match(/fromusername="([^"]*)"/)[1]
    const v3 = input.content.match(/encryptusername="([^"]*)"/)[1]
    const v4 = input.content.match(/ticket="([^"]*)"/)[1]
    const msg = input.content.match(/content="([^"]*)"/)[1]
    const scene = input.content.match(/scene="([^"]*)"/)[1]
    const nickname = input.content.match(/fromnickname="([^"]*)"/)[1]

    session.userId = wxid
    session.username = nickname
    session.channelId = wxid
    session.messageId = `${scene}:${v3}:${v4}:${msg}`

    return session
  }else if (input.type === MessageType.img /* img */) {

  }else if (input.type === MessageType.text /* text */) {
    session.isDirect = true
    session.type = "message"
    session.elements = [h.text(input.content)]

    return session
  } else if (input.type === MessageType.location /* location */) {
    session.isDirect = true;
    session.type = "message";
    let {
      msg: {
        location: { $: locationData }
      }
    } = await xml2js.parseStringPromise(input.content, {explicitArray:false})

    session.elements = [h('location', { latitude: locationData.x,
      longitude: locationData.y,
      label: locationData.label})]

    return session
  }



  return session
}

export function adaptUser(response : any) {
  return {
    id: response.data?.wxid,
    name: response.data?.name,
    avatar: "",
    discriminator: "",
    isBot: true
  }
}
