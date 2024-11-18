import { Quester } from 'koishi'
import form_data from 'form-data'

export class Internal {
  constructor(private http: Quester) {
  }

  async acceptNewFriend(scene: number, v3: string, v4: string) {
    return await this.request("POST", "/accept-new-friend",  {scene, v3, v4})
  }

  async addChatroomMember(roomid: string, wxids: string) {
    return await this.request("POST", "/add-chatroom-member", {roomid,wxids})
  }

  async deleteChatroomMember(roomid: string, wxids: string) {
    return await this.request("POST", "/delete-chatroom-member", {roomid,wxids})
  }

  async inviteChatroomMember(roomid: string, wxids: string) {
    return await this.request("POST", "/invite-chatroom-member",  {roomid,wxids})
  }

  async contacts() {
    return await this.request("GET", "/contacts")
  }

  async file(path: string, receiver: string) {
    return await this.request("POST", "/file",  {path, receiver})
  }

  async forwardMsg(id: string, receiver: string) {
    return await this.request("POST", "/forward-msg",  {id, receiver})
  }

  async image(path: string, receiver: string) {
    return await this.request("POST", "/image",  {path, receiver})
  }

  async text(aters: string,msg: string, receiver: string) {
    return await this.request("POST", "/text",  {aters, msg, receiver})
  }

  async isLogin() {
    return await this.request("GET", "/islogin")
  }

  async msgTypes() {
    return await this.request("GET", "/msg-types")
  }

  async pat(roomid: string, wxid: string) {
    return await this.request("POST", "/msg-types",  {roomid, wxid})
  }

  async queryRoomMember(room_id: string) {
    return await this.request("GET", "/query-room-member", {room_id})
  }

  async receiveTransfer(taid: string, tfid: string, wxid: string) {
    return await this.request("POST", "/receive-transfer",  {taid, tfid, wxid})
  }

  async revokeMsg(id: string) {
    return await this.request("POST", "/revoke-msg",  {id})
  }

  async selfWxid() {
    return await this.request("GET", "/selfwxid")
  }

  async userinfo() {
    return await this.request("GET", "/userinfo")
  }

  private async request(method: Quester.Method, path: string, data?: any, headers?: any) {
    if (method === "GET") {
      return (await this.http(path, { params: data, headers })).data;
    } else {
      return (await this.http(method, path, { data:  JSON.stringify(data), headers })).data;
    }
  }
}
