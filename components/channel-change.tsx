"use client";

import * as React from "react";
import { Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import channels from "@/utils/channels.json"
import type { Channel } from "@/utils/types/channels";

export function ChannelSwitch({ setChannel }: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Newspaper className="absolute h-[1.2rem] w-[1.2rem] text-current transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {channels.map((channel: Channel) => (
          <DropdownMenuItem
            key={channel.url}
          onClick={() =>
            setChannel(
              channel.url,
            )
          }
        >
            {channel.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
