import { Skeleton } from "@/components/ui/skeleton";

export default function Loader() {
  return (
    <div className="flex flex-col gap-2 py-8">
      <Skeleton className="h-8 w-1/2 mx-auto" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}
