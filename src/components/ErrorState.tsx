import { AlertTriangle } from "lucide-react";

export default function ErrorState({
  message = "Something went wrong.",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center text-red-600 dark:text-red-400 py-12">
      <AlertTriangle className="h-10 w-10 mb-2" aria-hidden />
      <span className="text-lg font-semibold">{message}</span>
    </div>
  );
}
