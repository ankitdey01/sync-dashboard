import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-[oklch(0.92_0.004_286.32)] border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-[oklch(0.705_0.015_286.067)] focus-visible:ring-3 focus-visible:ring-[oklch(0.705_0.015_286.067)]/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-[oklch(0.577_0.245_27.325)] aria-invalid:ring-3 aria-invalid:ring-[oklch(0.577_0.245_27.325)]/20 dark:aria-invalid:border-[oklch(0.577_0.245_27.325)]/50 dark:aria-invalid:ring-[oklch(0.577_0.245_27.325)]/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 dark:border-[oklch(1_0_0_/_10%)] dark:focus-visible:border-[oklch(0.552_0.016_285.938)] dark:focus-visible:ring-[oklch(0.552_0.016_285.938)]/50 dark:aria-invalid:border-[oklch(0.704_0.191_22.216)] dark:aria-invalid:ring-[oklch(0.704_0.191_22.216)]/20 dark:dark:aria-invalid:border-[oklch(0.704_0.191_22.216)]/50 dark:dark:aria-invalid:ring-[oklch(0.704_0.191_22.216)]/40",
  {
    variants: {
      variant: {
        default: "bg-[oklch(0.21_0.006_285.885)] text-[oklch(0.985_0_0)] hover:bg-[oklch(0.21_0.006_285.885)]/80 dark:bg-[oklch(0.92_0.004_286.32)] dark:text-[oklch(0.21_0.006_285.885)] dark:hover:bg-[oklch(0.92_0.004_286.32)]/80",
        outline:
          "border-[oklch(0.92_0.004_286.32)] bg-[oklch(1_0_0)] hover:bg-[oklch(0.967_0.001_286.375)] hover:text-[oklch(0.141_0.005_285.823)] aria-expanded:bg-[oklch(0.967_0.001_286.375)] aria-expanded:text-[oklch(0.141_0.005_285.823)] dark:border-[oklch(0.92_0.004_286.32)] dark:bg-[oklch(0.92_0.004_286.32)]/30 dark:hover:bg-[oklch(0.92_0.004_286.32)]/50 dark:border-[oklch(1_0_0_/_10%)] dark:bg-[oklch(0.141_0.005_285.823)] dark:hover:bg-[oklch(0.274_0.006_286.033)] dark:hover:text-[oklch(0.985_0_0)] dark:aria-expanded:bg-[oklch(0.274_0.006_286.033)] dark:aria-expanded:text-[oklch(0.985_0_0)] dark:dark:border-[oklch(1_0_0_/_15%)] dark:dark:bg-[oklch(1_0_0_/_15%)]/30 dark:dark:hover:bg-[oklch(1_0_0_/_15%)]/50",
        secondary:
          "bg-[oklch(0.967_0.001_286.375)] text-[oklch(0.21_0.006_285.885)] hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-[oklch(0.967_0.001_286.375)] aria-expanded:text-[oklch(0.21_0.006_285.885)] dark:bg-[oklch(0.274_0.006_286.033)] dark:text-[oklch(0.985_0_0)] dark:aria-expanded:bg-[oklch(0.274_0.006_286.033)] dark:aria-expanded:text-[oklch(0.985_0_0)]",
        ghost:
          "hover:bg-[oklch(0.967_0.001_286.375)] hover:text-[oklch(0.141_0.005_285.823)] aria-expanded:bg-[oklch(0.967_0.001_286.375)] aria-expanded:text-[oklch(0.141_0.005_285.823)] dark:hover:bg-[oklch(0.967_0.001_286.375)]/50 dark:hover:bg-[oklch(0.274_0.006_286.033)] dark:hover:text-[oklch(0.985_0_0)] dark:aria-expanded:bg-[oklch(0.274_0.006_286.033)] dark:aria-expanded:text-[oklch(0.985_0_0)] dark:dark:hover:bg-[oklch(0.274_0.006_286.033)]/50",
        destructive:
          "bg-[oklch(0.577_0.245_27.325)]/10 text-[oklch(0.577_0.245_27.325)] hover:bg-[oklch(0.577_0.245_27.325)]/20 focus-visible:border-[oklch(0.577_0.245_27.325)]/40 focus-visible:ring-[oklch(0.577_0.245_27.325)]/20 dark:bg-[oklch(0.577_0.245_27.325)]/20 dark:hover:bg-[oklch(0.577_0.245_27.325)]/30 dark:focus-visible:ring-[oklch(0.577_0.245_27.325)]/40 dark:bg-[oklch(0.704_0.191_22.216)]/10 dark:text-[oklch(0.704_0.191_22.216)] dark:hover:bg-[oklch(0.704_0.191_22.216)]/20 dark:focus-visible:border-[oklch(0.704_0.191_22.216)]/40 dark:focus-visible:ring-[oklch(0.704_0.191_22.216)]/20 dark:dark:bg-[oklch(0.704_0.191_22.216)]/20 dark:dark:hover:bg-[oklch(0.704_0.191_22.216)]/30 dark:dark:focus-visible:ring-[oklch(0.704_0.191_22.216)]/40",
        link: "text-[oklch(0.21_0.006_285.885)] underline-offset-4 hover:underline dark:text-[oklch(0.92_0.004_286.32)]",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
