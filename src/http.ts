import { Adapter, Context } from 'koishi'
import { WeChatFerryBot } from './bot'
import { adaptSession } from './utils'

export class HttpServer<C extends Context = Context> extends Adapter<C, WeChatFerryBot<C, WeChatFerryBot.Config>>{
  static inject = ['server']
  private logger

  constructor(public ctx:  any, bot: WeChatFerryBot) {
    super(ctx)
    this.logger = ctx.logger('wechatFerry')

    const {path, isOutLog} = bot.config

    ctx.server.post(path, async (sctx) => {
      const {body} = sctx.request
      if (isOutLog) this.logger.info(`receive %o`, body)

      const isSelf = body.is_self;
      sctx.status = 200;
      if (isSelf) {
        sctx.body = { isSelf };
        return;
      }

      const b = this.bots && this.bots[0];
      if (!b) return;

      const session = await adaptSession(b, body)

      if (isOutLog) this.logger.info(`session %o`, session)
      b.dispatch(session)
    })

  }

  async connect(bot: WeChatFerryBot) {
    await bot.getLogin()
    bot.online()

  }
}
