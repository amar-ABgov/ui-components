import React, { FC, ReactNode } from "react";
import { Margins } from "../../common/styling";

interface WCProps extends Margins {
  maxwidth?: string;
  padded?: boolean;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-popover": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface Props extends Margins {
  target?: ReactNode;
  testId?: string;
  maxWidth?: string;
  padded?: boolean;
}

export const GoAPopover: FC<Props> = ({
  target,
  testId,
  maxWidth,
  padded,
  children,
  mt,
  mr,
  mb,
  ml,
}) => {
  return (
    <goa-popover
      data-testid={testId}
      maxwidth={maxWidth}
      padded={padded}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {children}
      {target && <div slot="target">{target}</div>}
    </goa-popover>
  );
};

export default GoAPopover;