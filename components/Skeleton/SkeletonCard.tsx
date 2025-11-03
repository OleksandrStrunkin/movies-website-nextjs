export default function SkeletonCard() {
  return (
    <li
      className="group mt-2 relative bg-card border border-border rounded-xl overflow-hidden
                 flex flex-col items-center text-center shadow-sm"
    >
      <div className="relative w-full overflow-hidden rounded-t-xl bg-muted/40 aspect-[2/3]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-muted/30"></div>
        </div>
      </div>
      <div className="p-2 flex flex-col text-start gap-1 w-full bg-card/90">
        <div className="h-3.5 bg-muted/40 rounded w-3/4 animate-pulse"></div>
        <div className="h-3 bg-muted/30 rounded w-1/2 animate-pulse"></div>
      </div>
      <div
        className="absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-md
                   bg-muted/40 text-transparent shadow-md animate-pulse"
      >
        ⭐
      </div>
    </li>
  );
}
