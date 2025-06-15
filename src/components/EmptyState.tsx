import { Inbox } from "lucide-react";

export default function EmptyState({
  message = "No repositories found.",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center text-muted-foreground py-12">
      <Inbox className="h-10 w-10 mb-2" aria-hidden />
      <span className="text-lg font-medium">{message}</span>
    </div>
  );
}
