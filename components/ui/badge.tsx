import * as React from "react"
import { cn } from "../../lib/utils"

const badgeVariants: Record<string, string> = {
    default: "border-transparent bg-gray-900 text-gray-50 hover:bg-gray-900/80",
    secondary: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80",
    destructive: "border-transparent bg-red-500 text-gray-50 hover:bg-red-500/80",
    outline: "text-gray-950",
    completed: "border-transparent bg-green-100 text-green-800",
    weighing: "border-transparent bg-blue-100 text-blue-800",
    waiting: "border-transparent bg-yellow-100 text-yellow-800",
    inProgress: "border-transparent bg-purple-100 text-purple-800",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants;
}

// FIX: Refactored Badge to use React.forwardRef for consistency and to fix props typing issue.
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        className={cn(
          "inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2",
          badgeVariants[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";


export { Badge }
