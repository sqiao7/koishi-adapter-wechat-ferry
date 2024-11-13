import { WeChatFerryBot } from './bot'
import { Context, Dict, h, MessageEncoder } from 'koishi'

export class WechatFerryMessageEncoder<C extends Context = Context> extends MessageEncoder<C, WeChatFerryBot<C, WeChatFerryBot.Config>> {
  private readySend: Dict = {
    text: "",
    img: "",
    file: "",
    at: ""
  }

  async flush(): Promise<void> {
    while (this.readySend.text.startsWith("\n")) {
      this.readySend.text = this.readySend.text.slice(1);
    }
    while (this.readySend.text.endsWith("\n")) {
      this.readySend.text = this.readySend.text.slice(0, -1);
    }
    if (this.readySend.text) {
      let at = ""
      if(this.channelId.includes('chatroom')){
        if (this.bot.config.isAutoAters && this.session.userId) at = this.session.userId
        if (this.readySend.at) at = this.readySend.at
        if(at) {
          this.readySend.text = `@${at}\n` + this.readySend.text
        }
      }
      await this.bot.internal.text(at, this.readySend.text, this.channelId)
    }
    if (this.readySend.img) {
     const res =  await this.bot.internal.image(this.readySend.img, this.channelId)
      if(res.data.data === false) this.bot.logger.error(`send image fail: ${this.readySend.img}`)
    }
    if (this.readySend.file) {
      await this.bot.internal.file(this.readySend.file, this.channelId)
    }
  }

  async visit(element: h): Promise<void> {
    const { type, attrs, children } = element;
    if (type === 'template') await this.render(children)
    if (type === 'br')  this.readySend.text += "\n"
    if (type === 'file') {
      this.readySend.file = attrs.src
    }
    if (type === 'audio') {
      this.readySend.file = attrs.src
    }
    if (type === 'file') {
      this.readySend.file = attrs.src
    }
    if (type === 'at') {
      this.readySend.at = attrs.id
    }
    if (type === 'img' || type === 'image') {
      this.readySend.img = attrs.src
    }

    if ( type === 'p' ) {
      if (!this.readySend.text.endsWith("\n")) this.readySend.text += "\n";
      await this.render(children)
      if (!this.readySend.text.endsWith("\n")) this.readySend.text += "\n";
    }

    if (type === 'text') {
      this.readySend.text += attrs.content
    }

    else if (type === "message") {
      await this.flush();
      await this.render(children);
      await this.flush();
    }
  }
}
