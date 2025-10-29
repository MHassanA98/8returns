export default function Spinner({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="p-8 flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin" aria-hidden="true" />
        <span className="text-gray-700">{label}</span>
      </div>
    </div>
  );
}


