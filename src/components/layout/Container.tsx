import type { PropsWithChildren } from "react";
import { cn } from "../../helpers/cn";

export const Container = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cn("container", className ? className : "")}>
      {children}
    </div>
  );
};
