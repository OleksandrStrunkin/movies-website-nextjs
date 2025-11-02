export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-muted text-foreground z-[9999]">
          <div className="flex flex-col items-center gap-4">
        <div className="animate-spin w-10 h-10 border-4 border-accent border-t-transparent rounded-full" />
        <span className="font-medium text-muted">Loading...</span>
      </div>
    </div>
  );
}