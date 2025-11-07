import { useIsFetching } from "@tanstack/react-query";
import { cn } from "@/lib/utils.ts";

export default function Title() {
  const isFetching = useIsFetching();
  return (
    <h1 className={cn("text-2xl", isFetching && "animate-pulse")}>Taskify</h1>
  );
}
