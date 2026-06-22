const SummaryCard = ({ title, value, note, danger }) => {
  return (
    <div className="border border-border bg-surface-secondary p-6">
      <p className="text-[10px] font-bold uppercase tracking-widest text-surface-secondary-foreground">
        {title}
      </p>
      <h3 className={`mt-3 font-serif text-3xl ${danger ? "text-danger" : ""}`}>
        {value}
      </h3>
      <p className="mt-3 text-xs text-surface-secondary-foreground">{note}</p>
    </div>
  );
};

export default SummaryCard;
