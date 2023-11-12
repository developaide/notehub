"use client";

import EmojiPicker, { Theme } from "emoji-picker-react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useTheme } from "next-themes";

interface IconPickerProps {
  onEmojiChange: (icon: string) => void;
  children: React.ReactNode;
}

export default function IconPicker({
  onEmojiChange,
  children,
}: IconPickerProps) {
  const { resolvedTheme } = useTheme();

  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;

  const themeMap = {
    dark: Theme.DARK,
    light: Theme.DARK,
  };

  const theme = themeMap[currentTheme];

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <EmojiPicker
          theme={theme}
          onEmojiClick={(data) => {
            onEmojiChange(data.emoji);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
