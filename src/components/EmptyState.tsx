import { Inbox } from "lucide-react";

export default function EmptyState({
  message = "No repositories found.",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center text-gray-500 py-8">
      <Inbox className="h-8 w-8 mb-2" aria-hidden />
      <span>{message}</span>
    </div>
  );
}
