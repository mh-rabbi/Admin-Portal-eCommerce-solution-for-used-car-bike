import { forwardRef } from "react";
import { LucideProps } from "lucide-react";

/**
 * Bangladesh Taka (৳) currency icon
 * Matches the Lucide icon interface for seamless integration
 */
export const BdtIcon = forwardRef<SVGSVGElement, LucideProps>(
  ({ color = "currentColor", size = 24, strokeWidth = 2, className, ...props }, ref) => {
    return (
      <div>
        <h4>৳</h4>
      </div>
    );
  }
);

BdtIcon.displayName = "BdtIcon";

export default BdtIcon;
