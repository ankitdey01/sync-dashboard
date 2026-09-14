"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Tabs as TabsPrimitive } from "radix-ui"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-[oklch(0.552_0.016_285.938)] group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none dark:text-[oklch(0.705_0.015_286.067)]",
  {
    variants: {
      variant: {
        default: "bg-[oklch(0.967_0.001_286.375)] dark:bg-[oklch(0.274_0.006_286.033)]",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-[oklch(0.92_0.004_286.32)] border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-[oklch(0.141_0.005_285.823)]/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-[oklch(0.141_0.005_285.823)] focus-visible:border-[oklch(0.705_0.015_286.067)] focus-visible:ring-[3px] focus-visible:ring-[oklch(0.705_0.015_286.067)]/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 dark:text-[oklch(0.552_0.016_285.938)] dark:hover:text-[oklch(0.141_0.005_285.823)] group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 dark:border-[oklch(1_0_0_/_10%)] dark:text-[oklch(0.985_0_0)]/60 dark:hover:text-[oklch(0.985_0_0)] dark:focus-visible:border-[oklch(0.552_0.016_285.938)] dark:focus-visible:ring-[oklch(0.552_0.016_285.938)]/50 dark:dark:text-[oklch(0.705_0.015_286.067)] dark:dark:hover:text-[oklch(0.985_0_0)]",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-[oklch(1_0_0)] data-active:text-[oklch(0.141_0.005_285.823)] dark:data-active:border-[oklch(0.92_0.004_286.32)] dark:data-active:bg-[oklch(0.92_0.004_286.32)]/30 dark:data-active:text-[oklch(0.141_0.005_285.823)] dark:data-active:bg-[oklch(0.141_0.005_285.823)] dark:data-active:text-[oklch(0.985_0_0)] dark:dark:data-active:border-[oklch(1_0_0_/_15%)] dark:dark:data-active:bg-[oklch(1_0_0_/_15%)]/30 dark:dark:data-active:text-[oklch(0.985_0_0)]",
        "after:absolute after:bg-[oklch(0.141_0.005_285.823)] after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100 dark:after:bg-[oklch(0.985_0_0)]",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
