import { Icon } from "@gravity-ui/uikit";

const UserStatCard = ({ icon, title, value, text }) => (
  <div className="border border-border bg-surface p-6">
    <Icon data={icon} size={22} className="text-accent" />
    <div className="mt-6 flex items-start justify-between">
      <div>
        <h3 className="font-serif text-4xl">{value}</h3>
        <p className="mt-2 text-xs text-surface-secondary-foreground">{text}</p>
      </div>
      <p className="text-xs font-bold uppercase">{title}</p>
    </div>
  </div>
);

export default UserStatCard;
