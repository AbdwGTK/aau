import { Skeleton } from "@/Components/ui/skeleton";
import { nanoid } from "nanoid";

export default function Loader() {
  return (
    <div className="flex flex-col gap-8 py-10">
      {[...Array(3)].map(() => (
        <div
          key={nanoid()}
          className="rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800/40
            bg-white/80 dark:bg-zinc-900/60 w-full max-w-2xl mx-auto p-6 flex flex-col gap-4 transition-colors"
        >
          <div className="flex items-center gap-4 mb-1">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-5 w-32 rounded" />
            <Skeleton className="h-5 w-20 rounded ml-auto" />
          </div>
          <Skeleton className="h-6 w-1/2 rounded mb-1" />
          <Skeleton className="h-4 w-full rounded mb-1" />
          <Skeleton className="h-4 w-2/3 rounded" />
          <div className="flex gap-2 mt-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
