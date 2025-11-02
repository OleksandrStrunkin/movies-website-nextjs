export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-card rounded-xl overflow-hidden shadow-sm flex flex-col">
      <div className="h-[387px] bg-muted/40"></div>
      <div className="p-3 space-y-2">
        <div className="h-4 bg-muted/40 rounded w-3/4"></div>
        <div className="h-3 bg-muted/30 rounded w-1/2"></div>
      </div>
    </div>
  );
}
