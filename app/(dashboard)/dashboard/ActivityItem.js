import { ChevronRight } from "@gravity-ui/icons";
import { Icon } from "@gravity-ui/uikit";

const ActivityItem = ({ icon, title, text }) => (
  <div className="flex items-center gap-4 px-6 py-5">
    <div className="flex h-10 w-10 items-center justify-center bg-surface-secondary text-accent">
      <Icon data={icon} size={18} />
    </div>

    <div className="flex-1">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-xs text-surface-secondary-foreground">{text}</p>
    </div>

    <Icon data={ChevronRight} size={14} className="text-accent" />
  </div>
);

export default ActivityItem;
