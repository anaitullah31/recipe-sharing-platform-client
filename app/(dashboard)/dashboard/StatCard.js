const StatCard = ({ title, value, growth, danger }) => (
  <div className="border border-border bg-surface p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-surface-secondary-foreground">
          {title}
        </p>
        <h3 className="mt-5 font-serif text-4xl">{value}</h3>
      </div>

      <span
        className={`text-xs font-bold ${danger ? "text-danger" : "text-accent"}`}
      >
        {growth}
      </span>
    </div>
  </div>
);

export default StatCard;
