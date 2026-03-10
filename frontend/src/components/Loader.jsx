export default function Loader() {
  return (
    <div className="fixed inset-0 bg-dark flex items-center justify-center z-50">
      <div className="font-mono text-sm text-gray-600 flex items-center gap-2">
        <span className="text-primary animate-blink">▋</span>
        <span>initializing...</span>
      </div>
    </div>
  )
}
