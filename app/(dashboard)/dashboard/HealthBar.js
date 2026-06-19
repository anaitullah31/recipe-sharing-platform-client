const HealthBar = ({ label, value, percent }) => (
  <div>
    <div className="mb-3 flex items-center justify-between">
      <p className="text-xs font-bold uppercase text-surface-secondary-foreground">
        {label}
      </p>
      <p className="text-sm font-semibold">{value}</p>
    </div>

    <div className="h-2 bg-surface-secondary">
      <div className="h-full bg-accent" style={{ width: `${percent}%` }} />
    </div>
  </div>
);

export default HealthBar;