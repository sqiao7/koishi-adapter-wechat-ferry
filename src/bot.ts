import { Bot, Context, Quester, Schema } from 'koishi'
import { WechatFerryMessageEncoder } from './message'
import { HttpServer } from './http'
import { Internal } from './internal'

export class WeChatFerryBot<C extends Context = Context, T extends WeChatFerryBot.Config = WeChatFerryBot.Config> extends Bot<C, T> {
  static MessageEncoder: typeof WechatFerryMessageEncoder = WechatFerryMessageEncoder;

  static inject: string[];

  http: Quester;
  internal: Internal

  constructor(ctx: C, config:T) {
    super(ctx, config, 'wechat')
    this.logger = ctx.logger('wechatFerry')
    this.http = ctx.http.extend({headers: {"Content-Type": "application/json"}}).extend(config)
    this.internal = new Internal(this.http)
    ctx.plugin(HttpServer, this)
  }

  async getLogin() {
    const userinfo  = await this.internal.userinfo()
    this.user = {
      id: userinfo.data.wxid,
      name: userinfo.data.name,
      nick: userinfo.data.name,
      avatar: userinfo.data.small_head_url,
      isBot: true
    }
    this.logger.info("user", this.user);
    this.selfId = userinfo.data.wxid
    return this.toJSON();
  }

  async handleFriendRequest(messageId: string, accept: boolean, comment?: string) {
    const [scene, v3,v4,_] = messageId.split(':')
    if (!accept) {
      this.logger.info("拒绝好友请求", messageId)
      return
    }

    const res = await this.internal.acceptNewFriend(Number(scene), v3, v4)
    console.log(res)
  }
}

export namespace WeChatFerryBot {
  interface BaseConfig extends Quester.Config{
    path: string
    isAutoAters: boolean
    isOutLog: boolean
  }

  export type Config = BaseConfig
  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      path: Schema.string().description("wechat-ferry 服务监听路径").default('/wechatFerry'),
      isAutoAters: Schema.boolean().description("是否自动艾特发出指令的人员(群聊)").default(false),
      isOutLog: Schema.boolean().description("是否在控制台输出入接收信息的日志").default(false),
    }),
    Quester.createConfig("http://127.0.0.1:10010")
  ])
}
