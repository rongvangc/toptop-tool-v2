/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { NavProps } from "@/navigation";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../ui/drawer";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Sidebar({
  links,
  isCollapsed,
  onCollapse,
}: Readonly<NavProps>) {
  const pathname = usePathname();

  const navigation = (isFullText?: boolean) => {
    return (
      <div className="relative">
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link) =>
            !isFullText && isCollapsed ? (
              <Tooltip key={link.url} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.url}
                    className={cn(
                      buttonVariants({
                        variant: link.url === pathname ? "default" : "ghost",
                        size: "icon",
                      }),
                      "h-9 w-9",
                      link.url === pathname &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={link.url}
                href={link.url}
                className={cn(
                  buttonVariants({
                    variant: link.url === pathname ? "default" : "ghost",
                    size: "sm",
                  }),
                  link.url === pathname &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "justify-start"
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
                {link.label && (
                  <span
                    className={cn(
                      "ml-auto",
                      link.url === pathname && "text-background dark:text-white"
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
            )
          )}
        </nav>
      </div>
    );
  };

  return (
    <>
      <div className="md:hidden visible">
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <div className="rounded-full w-8 h-8 border md:hidden flex items-center justify-center absolute top-4 -right-4 z-10 bg-white cursor-pointer">
              <ChevronRight className="w-5" color="#1F6BDA" />
            </div>
          </DrawerTrigger>
          <DrawerContent className="w-[80%] h-full rounded-none">
            <DrawerClose>
              <div className="rounded-full w-8 h-8 border md:hidden flex items-center justify-center absolute top-4 -right-4 z-10 bg-white cursor-pointer">
                <ChevronLeft className="w-5" color="#1F6BDA" />
              </div>
            </DrawerClose>

            <div className="mx-3 max-w-sm">{navigation(true)}</div>
          </DrawerContent>
        </Drawer>
      </div>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-2 py-2 data-[collapsed=true]:py-2"
      >
        {navigation()}
      </div>
    </>
  );
}
