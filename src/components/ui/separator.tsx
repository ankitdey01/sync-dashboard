"use client"

import * as React from "react"
import { cn } from "cn"
import { Separator as SeparatorPrimitive } from "radix-ui"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-[oklch(0.92_0.004_286.32)] data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch dark:bg-[oklch(1_0_0_/_10%)]",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
