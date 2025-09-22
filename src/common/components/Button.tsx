import type { ButtonProps } from "../types/ButtonType";

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button className={`${children}`} {...props}>
      {children}
    </button>
  );
}
