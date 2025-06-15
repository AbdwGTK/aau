import { AlertTriangle } from "lucide-react";

export default function ErrorState({
  message = "Something went wrong.",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center text-red-600 py-8">
      <AlertTriangle className="h-8 w-8 mb-2" aria-hidden />
      <span>{message}</span>
    </div>
  );
}
