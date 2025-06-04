import { Spinner } from "@heroui/react";

export default function Loading({
  label,
  size = "md",
  variant = "default",
}: {
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "simple" | "gradient" | "spinner" | "wave" | "dots";
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Spinner size={size} variant={variant} label={label} />
      </div>
    </div>
  );
}
