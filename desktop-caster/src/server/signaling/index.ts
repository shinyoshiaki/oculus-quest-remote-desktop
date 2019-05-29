import socketio_ from "socket.io";
import http_ from "http";
const load = (window as any).require;

const socketio: typeof socketio_ = load("socket.io");
const http: typeof http_ = load("http");

interface roomObj {
  roomId: string;
}

export default function signaling() {
  const srv = new http.Server();
  const io = socketio(srv);
  srv.listen(20000);

  const roomList: { [key: string]: { hostId: string; guestId: string } } = {};

  io.on("connection", socket => {
    console.log("connection");

    socket.on("create", (data: roomObj) => {
      const { roomId } = data;
      console.log("create", roomId);
      roomList[roomId] = { hostId: socket.id, guestId: "" };
      console.log("roomList", roomList);
    });

    socket.on("connect", (data: roomObj) => {
      try {
        const { roomId } = data;
        console.log("connected", roomId, socket.id);
        const { hostId, guestId } = roomList[roomId];
        delete roomList[roomId];
        io.sockets.sockets[hostId].disconnect();
        io.sockets.sockets[guestId].disconnect();
      } catch (error) {
        console.log({ error });
      }
    });

    socket.on("join", (data: roomObj) => {
      const { roomId } = data;
      if (Object.keys(roomList).includes(roomId)) {
        try {
          console.log("join", roomId);
          const room = roomList[roomId];
          room.guestId = socket.id;
          console.log("roomList", roomList);
          io.sockets.sockets[socket.id].emit("join", { room: roomId });
        } catch (error) {
          console.log(error);
        }
      }
    });

    socket.on("sdp", (data: { roomId: string; sdp: string }) => {
      try {
        const { roomId, sdp } = data;

        const room = roomList[roomId];

        console.log("sdp", { room, data });

        if (socket.id === room.hostId) {
          if (io.sockets.sockets[room.guestId])
            io.sockets.sockets[room.guestId].emit("sdp", { sdp });
        } else {
          if (io.sockets.sockets[room.hostId])
            io.sockets.sockets[room.hostId].emit("sdp", { sdp });
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
}
