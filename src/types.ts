import { Quester } from "koishi";
/**
 * 消息回调格式
 */
export interface MsgCb {
  /**
   * 消息 ID
   */
  id: string;
  /**
   * 时间戳
   */
  ts: number;
  /**
   * 消息类型
   */
  type: number;
  /**
   * 消息 xml 部分
   */
  xml: string;
  /**
   * 群 ID（仅群消息有）
   */
  roomid: string;
  /**
   * 消息内容
   */
  content: string;
  /**
   * 视频或图片消息的缩略图路径
   */
  thumb: string;
  /**
   * 消息发送人
   */
  sender: string;
  /**
   * 视频或图片消息的路径
   */
  extra: string;
  /**
   * Sign
   */
  sign: number;
  /**
   * 是否被 @：群消息，在 @ 名单里，并且不是 @ 所有人
   */
  is_at: Boolean;
  /**
   * 是否自己发送的
   */
  is_self: Boolean;
  /**
   * 是否群消息
   */
  is_group: Boolean;
}
/**
 * 通用请求结构
 */
export interface RequestBody {
  id?: number;
  /**
   * 群 ID
   */
  roomid?: string;
  /**
   * wxid
   */
  wxid?: string;
  /**
   * wxid，多个用逗号分隔
   */
  wxids?: string;
  /**
   * 要发送的消息，换行使用 \n
   */
  msg?: string;
  /**
   * 消息接收人，wxid 或者 roomid
   */
  receiver?: string;
  /**
   * 要 @ 的 wxid，多个用逗号分隔；@所有人 只需要 notify@all
   */
  aters?: string;
  /**
   * 路径
   */
  path?: string;
  /**
   * 卡片消息：左下显示的名字
   */
  name?: string;
  /**
   * 卡片消息：公众号 id 可以显示对应的头像（gh_ 开头的）
   */
  account?: string;
  /**
   * 卡片消息：标题，最多两行
   */
  title?: string;
  /**
   * 卡片消息：摘要，三行
   */
  digest?: string;
  /**
   * 卡片消息：点击后跳转的链接
   */
  url?: string;
  /**
   * 卡片消息：缩略图的链接
   */
  thumburl?: string;
  /**
   * 数据库名
   */
  db?: string;
  /**
   * 要执行的 SQL
   */
  sql?: string;
  /**
   * 扩展信息
   */
  extra?: string;
  /**
   * 超时时间
   */
  timeout?: number;
  /**
   * 加密用户名 (好友申请消息里 v3 开头的字符串)
   */
  v3?: string;
  /**
   * Ticket (好友申请消息里 v4 开头的字符串)
   */
  v4?: string;
  /**
   * 申请方式 (好友申请消息里的 scene)
   */
  scene?: number;
  /**
   * 转账消息里的 transferid
   */
  transferid?: string;
  /**
   * 转账消息里的 transactionid
   */
  transactionid?: string;
  src?: string;
  dst?: string;
  thumb?: string;
  dir?: string;
}
/**
 * 通用返回结构
 */
export interface ResponseBody {
  status: number;
  message: string;
  data?: {
    /**
     * 是否登录
     */
    login?: Boolean;
    /**
     * 登录账号 wxid
     */
    wxid?: string;
    /**
     * 登录账号昵称
     */
    name?: string;
    /**
     * 登录账号手机号
     */
    mobile?: string;
    /**
     * 登录账号用户数据文件夹
     */
    home?: string;
    /**
     * 消息数据类型
     */
    types?: any;
    /**
     * 好友列表
     */
    friends?: Array<Contacts>;
    /**
     * 联系人信息
     */
    contacts?: Array<Contacts>;
    /**
     * 所有数据库
     */
    dbs?: Array<string>;
    /**
     * db 下的所有表名及对应建表语句
     */
    tables?: Array<Tables>;
    /**
     * 群成员列表 wxid : 昵称
     */
    members?: any;
    /**
     * 用户名片昵称
     */
    alias?: string;
    /**
     * 文件保存路径
     */
    path?: string;
    /**
     * 登录账号个人信息
     */
    ui?: Ui;
  };
}
/**
 * 联系人信息
 */
export interface Contacts {
  /**
   * 联系人 wxid
   */
  wxid: string;
  /**
   * 联系人自定义微信号
   */
  code: string;
  /**
   * 联系人备注
   */
  remark: string;
  /**
   * 联系人昵称
   */
  name: string;
  /**
   * 联系人国家代码
   */
  country: string;
  /**
   * 联系人省份代码
   */
  province: string;
  /**
   * 联系人城市代码
   */
  city: string;
  /**
   * 联系人性别：男 | 女 |
   */
  gender: string;
}
/**
 * 表名及对应建表语句
 */
export interface Tables {
  /**
   * 表名
   */
  name: string;
  /**
   * 建表语句
   */
  sql: string;
}
/**
 * 登录账号个人信息
 */
export interface Ui {
  /**
   * 联系人 wxid
   */
  wxid: string;
  /**
   * 联系人昵称
   */
  name: string;
  /**
   * 登录账号手机号
   */
  mobile: string;
  /**
   * 微信文件路径
   */
  home: string;
}
/**
 * 回调消息类型
 */
export  enum MessageType {
  text = 1,
  friend_confirm = 37,
  location = 48,
  img =3
}
export interface Internal {
}
export declare class Internal {
  http: Quester;
  constructor(http: Quester);
  static define(name: string, method: string, path: string): void;
}
