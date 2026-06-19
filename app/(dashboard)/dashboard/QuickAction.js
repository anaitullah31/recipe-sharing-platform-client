import { Icon } from "@gravity-ui/uikit";
import Link from "next/link";

const QuickAction = ({ title, text, href, icon }) => (
  <Link
    href={href}
    className="flex items-center justify-between border border-border bg-surface p-6 transition hover:bg-surface-hover"
  >
    <div>
      <h3 className="font-serif text-2xl">{title}</h3>
      <p className="mt-1 text-xs text-surface-secondary-foreground">{text}</p>
    </div>

    <span className="flex h-10 w-10 items-center justify-center border border-border">
      <Icon data={icon} size={16} />
    </span>
  </Link>
);

export default QuickAction;
