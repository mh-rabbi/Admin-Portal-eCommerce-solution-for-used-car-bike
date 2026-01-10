import { forwardRef } from "react";
import { LucideProps } from "lucide-react";

/**
 * Bangladesh Taka (৳) currency icon
 * Matches the Lucide icon interface for seamless integration
 */
export const BdtIcon = forwardRef<SVGSVGElement, LucideProps>(
  ({ color = "currentColor", size = 24, strokeWidth = 2, className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
      >
        {/* Bangladesh Taka Symbol (৳) */}
        <path d="M6 3v18" />
        <path d="M6 8h6c2 0 4 1 4 4s-2 4-4 4H6" />
        <path d="M18 8v8" />
        <path d="M15 11h6" />
      </svg>
    );
  }
);

BdtIcon.displayName = "BdtIcon";

export default BdtIcon;
