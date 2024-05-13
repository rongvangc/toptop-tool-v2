"use client";

import PrintTemplate from "@/components/printTemplate";
import { commmentToptopColumns } from "@/components/toptop/comment-columns";
import { CommentToptopTable } from "@/components/toptop/comment-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSocket } from "@/providers/SocketProvider";
import useToptopStore from "@/store/toptop";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const ToptopPage = () => {
  const socket = useSocket();

  const [userId, setUserId] = useState<string>("");
  const [isConnected, setIsConnected] = useState(socket?.connected);
  const [comments, setComments] = useState<CommentTopTopData[]>([]);
  const [inprocess, setInprocess] = useState<boolean>(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const { printData, setPrintData } = useToptopStore();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Đơn hàng",
    onAfterPrint: () => {
      console.log("In đơn hàng thành công");
      setPrintData(null);
    },
    onPrintError: () => {
      console.log("In đơn hàng lỗi");
      setPrintData(null);
    },
    removeAfterPrint: true,
  });

  const handleGetComment = useCallback(() => {
    setComments([]);
    socket?.emit("chat-tiktok", userId);
    localStorage.setItem("userId", userId);
    localStorage.setItem("comments", JSON.stringify([]));
  }, [userId, socket]);

  const handleCloseComment = useCallback(() => {
    socket?.emit("close-tiktok");
    localStorage.setItem("userId", "");
    localStorage.setItem("comments", JSON.stringify([]));
  }, [socket]);

  useEffect(() => {
    printData?.userId && handlePrint();
  }, [printData, handlePrint]);

  useEffect(() => {
    if (!socket) return;

    const handleInProcess = (data: boolean) => {
      setInprocess(data);
    };

    const handleConnect = () => {
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleGetCommentData = (commentData: CommentTopTopData) => {
      setComments((prevComments) => {
        const updatedComments = [commentData, ...prevComments];
        localStorage.setItem("comments", JSON.stringify(updatedComments));
        return updatedComments;
      });
    };

    const handleConnectError = (err: any) => {
      console.log(err);
    };

    socket.on("in-process", handleInProcess);
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("get-comment", handleGetCommentData);
    socket.on("connect_error", handleConnectError);

    return () => {
      socket.off("in-process", handleInProcess);
      socket.off("get-comment", handleGetCommentData);
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleConnectError);
      socket.off("disconnect", handleDisconnect);
    };
  }, [socket]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    userId && setUserId(userId);
  }, []);

  useEffect(() => {
    const localComments = localStorage.getItem("comments");
    localComments && setComments(JSON.parse(localComments));
  }, []);

  return (
    <div>
      <div className="">
        <div className="flex">
          {!inprocess ? (
            <>
              <div className="mr-2">
                <Input
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <Button disabled={inprocess} onClick={handleGetComment}>
                Lấy comments
              </Button>
            </>
          ) : (
            <div>
              <h1>
                Đang lấy comments từ{" "}
                <span className="font-bold text-red-500">{userId}</span>
              </h1>
              <Button className="mt-2" onClick={handleCloseComment}>
                Tắt comments
              </Button>
            </div>
          )}
        </div>

        <div>
          {!!comments?.length && (
            <CommentToptopTable
              data={comments}
              columns={commmentToptopColumns}
            />
          )}
          <div className="hidden">
            <PrintTemplate ref={componentRef} data={printData!} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToptopPage;
