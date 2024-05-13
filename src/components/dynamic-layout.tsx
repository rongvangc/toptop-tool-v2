"use client";

import { NOT_DASHBOARD_URL } from "@/helpers/common";
import { cn } from "@/lib/utils";
import { dashboardNavigation } from "@/navigation";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { useMediaQuery } from "usehooks-ts";
import { ResizablePanel, ResizablePanelGroup } from "./ui/resizable";
import { TooltipProvider } from "./ui/tooltip";
import { Sidebar } from "./admin/sidebar";
import { Separator } from "./ui/separator";
import Image from "next/image";
import LogoPng from "@/assets/images/logo.png";

interface DashboardBoardProps {
  navCollapsedSize: number;
  children: ReactNode;
}

const defaultLayout = [16, 84];

export function DynamicLayout({
  navCollapsedSize,
  children,
}: Readonly<DashboardBoardProps>) {
  const pathName = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const ref = useRef<ImperativePanelHandle>(null);
  const isMobile = useMediaQuery("(max-width: 480px)");

  const isNotDashBoardLayout = NOT_DASHBOARD_URL.some(
    (path: string) => path === pathName
  );

  const dynamicLayout = () => {
    if (isNotDashBoardLayout) {
      return <>{children}</>;
    }

    return (
      <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
          className="h-full min-h-screen items-stretch"
          direction="horizontal"
        >
          <ResizablePanel
            className={cn(
              isCollapsed && "min-w-[50px]",
              "relative transition-all duration-300 ease-in-out !overflow-visible border-r"
            )}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            defaultSize={defaultLayout[0]}
            maxSize={20}
            minSize={15}
            onCollapse={() => {
              if (isMobile) {
                return;
              }
              setIsCollapsed(true);
            }}
            onExpand={() => {
              if (isMobile) {
                return;
              }
              setIsCollapsed(false);
            }}
            ref={ref}
          >
            <div
              className={cn(
                "flex h-[52px] items-center",
                isCollapsed ? "h-[52px] justify-center" : "px-2"
              )}
            >
              <Image src={LogoPng} alt="Logo" width={36} />
            </div>
            <Separator />
            <Sidebar
              isCollapsed={isCollapsed}
              links={dashboardNavigation}
              onCollapse={collapsePanel}
            />
            <Separator />
          </ResizablePanel>
          <ResizablePanel
            className="relative p-6 bg-qagoSecondary"
            defaultSize={defaultLayout[1]}
            minSize={30}
          >
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    );
  };

  const collapsePanel = () => {
    const panel = ref.current;

    if (panel) {
      if (isCollapsed) {
        panel.expand();
      } else {
        panel.collapse();
      }
    }
  };

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);

  return dynamicLayout();
}
