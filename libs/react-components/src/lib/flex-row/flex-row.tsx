import React, { FC } from "react";

interface WCProps {
  gap?: "small" | "medium" | "large";
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-flex-row": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface Props {
  gap?: "small" | "medium" | "large";
  children?: React.ReactNode;
}

export const GoAFlexRow: FC<Props> = ({ gap, children }) => {
  return <goa-flex-row gap={gap}>{children}</goa-flex-row>;
};

export default GoAFlexRow;
