import { io } from "socket.io-client";

class PeerConnectionSession {
  _room: any;
  _userId: any;
  socket: any;

  constructor(socket: any) {
    this.socket = socket;
  }

  joinRoom(link: string, userId: string) {
    this._userId = userId;
    this._room = link;
    this.socket.emit("join", { link, userId });
  }

  onUpdateUserList(callback: any) {
    this.socket.on(`${this._room}-update-user-list`, ({ users }: any) => {
      callback(users);
    });
  }

  onRemoveUser(callback: any){
    this.socket.on(`${this._room}-remove-user`, ({socketId}: any) => {
      callback(socketId);
    })
  }
}

export const createPeerConnectionContext = () => {
  const { VITE_PUBLIC_WS_URL } = import.meta.env;

  const socket = io(VITE_PUBLIC_WS_URL);

  return new PeerConnectionSession(socket);
};
