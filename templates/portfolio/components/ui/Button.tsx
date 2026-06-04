import { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type AsAnchor = CommonProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
type AsButton = CommonProps & { href?: never } & ButtonHTMLAttributes<HTMLButtonElement>;
type Props = AsAnchor | AsButton;

const base =
  "inline-flex items-center justify-center px-6 h-[50px] rounded-full text-base font-medium transition-all cursor-pointer select-none active:scale-95 active:duration-75";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#6B5CE7] text-white hover:opacity-85 active:opacity-100 active:brightness-75 transition-opacity duration-200",
  secondary:
    "bg-transparent text-cobalt border border-cobalt hover:bg-cobalt hover:text-cream active:bg-cobalt-light active:text-cream active:border-cobalt-light transition-[background-color,color] duration-200",
};

export function Button({ variant = "primary", children, className = "", ...rest }: Props) {
  const classes = [base, variants[variant], className].filter(Boolean).join(" ");

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
