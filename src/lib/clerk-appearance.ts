import { dark } from "@clerk/themes";

/**
 * Single Clerk appearance for the whole app, drawn from globals.css tokens.
 * Applied on ClerkProvider, so SignIn, SignUp, the UserButton popover and
 * the UserProfile modal all render as native site UI. Page background stays
 * #0a0a0a — only Clerk's own surfaces are themed.
 */
export const clerkAppearance = {
  theme: dark,
  variables: {
    colorBackground: "#0a0a0a",
    colorInputBackground: "#101010",
    colorInputText: "#ffffff",
    colorText: "#ffffff",
    colorTextSecondary: "#a1a1aa",
    colorPrimary: "#ffffff",
    colorTextOnPrimaryBackground: "#0a0a0a",
    borderRadius: "0.625rem",
    fontFamily: '"Nebula Sans", ui-sans-serif, system-ui, sans-serif',
  },
  options: {
    logoImageUrl: "/sync-logo.svg",
    socialButtonsVariant: "blockButton" as const,
  },
  elements: {
    card: "border border-[#262626] bg-[#0a0a0a] shadow-none",
    cardBox: "shadow-none",
    modalBackdrop: "bg-black/70",
    headerTitle: "text-white",
    headerSubtitle: "text-[#a1a1aa]",
    socialButtonsBlockButton:
      "border-[#262626] bg-transparent text-white hover:bg-[#161616] hover:text-white",
    dividerLine: "bg-[#262626]",
    dividerText: "text-[#71717a]",
    formFieldLabel: "text-[#e7e7e7]",
    formFieldInput:
      "border-[#262626] bg-[#101010] text-white placeholder:text-[#52525b]",
    formFieldInputShowPasswordButton: "text-[#a1a1aa] hover:text-white",
    formFieldHintText: "text-[#71717a]",
    formButtonPrimary:
      "rounded-full bg-white text-[#0a0a0a] shadow-none hover:bg-zinc-200",
    footerActionText: "text-[#a1a1aa]",
    footerActionLink: "text-white hover:text-zinc-300",
    identityPreviewEditButton: "text-white hover:text-zinc-300",
    userButtonPopoverCard: "border-[#262626] bg-[#0a0a0a] shadow-none",
    userButtonPopoverActionButton: "text-white hover:bg-[#161616]",
    userButtonPopoverActionButtonText: "text-white",
  },
};
