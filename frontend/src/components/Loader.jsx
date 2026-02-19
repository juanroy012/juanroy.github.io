export default function Loader() {
  return (
    <div className="fixed inset-0 bg-dark flex items-center justify-center z-50">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-accent font-mono text-xs">&lt;/&gt;</span>
        </div>
      </div>
    </div>
  )
}
