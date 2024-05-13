import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as IOServer } from "socket.io";
import { Server } from "socket.io";
import { WebcastPushConnection } from "tiktok-live-connector";

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

let tiktokLiveConnection: WebcastPushConnection;

export async function SocketHandler(
  _req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("chat-tiktok", (userId) => {
      console.log(`LIVE: ${userId}`);
      if (userId) {
        tiktokLiveConnection = new WebcastPushConnection(userId);
        tiktokLiveConnection
          .connect()
          .then((state) => {
            console.info(`Connected to roomId ${state.roomId}`);
          })
          .catch((err) => {
            console.error("Failed to connect", err);
          });

        tiktokLiveConnection.on(
          "chat",
          ({
            comment,
            userId,
            nickname,
            uniqueId,
            profilePictureUrl,
            createTime,
          }) => {
            console.log(`${nickname}-${comment}-${createTime}`);

            const data = {
              comment,
              userId,
              uniqueId,
              nickname,
              profilePictureUrl,
              createTime,
            };

            io.emit("get-comment", data);
            io.emit("in-process", true);
          }
        );
      } else {
        tiktokLiveConnection && tiktokLiveConnection.disconnect();
      }
    });

    socket.on("close-tiktok", () => {
      if (tiktokLiveConnection) {
        io.emit("in-process", false);
        tiktokLiveConnection.disconnect();
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnect");
    });
  });

  if (!res.socket.server.io) {
    console.log("*First use, starting socket.io");

    const httpServer = res.socket.server;
    io.attach(httpServer, {
      cors: {
        origin: "*",
      },
    });
  }

  console.log("Setting up socket");
  res.end();
}
