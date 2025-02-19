"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";

const SOCKET_SERVER = process.env.NEXT_PUBLIC_SOCKET_URL as string;
type SocketContextType = Socket | undefined;
const SocketContext = createContext<SocketContextType>(undefined);

export const useSocket = (): SocketContextType => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<SocketContextType>(undefined);

  useEffect(() => {
    const initializeSocket = () => {
      const newSocket = io(SOCKET_SERVER!, {
        transports: ["websocket"],
      });

      return newSocket;
    };

    const socket = initializeSocket();
    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
