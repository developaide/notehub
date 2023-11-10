import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";

export function CreateNote() {
  return (
    <Card
      className="w-[350px] cursor-pointer"
      title="create new note"
      aria-label="create new note"
    >
      <CardHeader className="text-center">
        <CardTitle className="text-neutral-400 text-2xl">
          Create new Note
        </CardTitle>
        <CardDescription className="text-neutral-400 text-lg">
          Click to create new Note
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <PlusIcon className="text-neutral-400 w-12 h-12" />
      </CardContent>
    </Card>
  );
}
