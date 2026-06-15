import { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";
type Size = "md" | "sm";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type AsAnchor = CommonProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
type AsButton = CommonProps & { href?: never } & ButtonHTMLAttributes<HTMLButtonElement>;
type Props = AsAnchor | AsButton;

const base =
  "inline-flex items-center justify-center rounded-full font-medium transition-all cursor-pointer select-none active:scale-95 active:duration-75";

const sizes: Record<Size, string> = {
  md: "px-6 h-[50px] text-base",
  sm: "px-4 h-9 text-sm",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[#6B5CE7] text-white hover:opacity-85 active:opacity-100 active:brightness-75 transition-opacity duration-200",
  secondary:
    "bg-transparent text-[#6B5CE7] border border-[#6B5CE7] hover:bg-[#6B5CE7] hover:text-white active:brightness-75 transition-[background-color,color] duration-200",
};

export function Button({ variant = "primary", size = "md", children, className = "", ...rest }: Props) {
  const classes = [base, sizes[size], variants[variant], className].filter(Boolean).join(" ");

  if ("href" in rest && rest.href) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
