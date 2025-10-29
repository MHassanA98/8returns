"use client";

type Props = {
  onMarkAllReceived?: () => void;
  onMarkAllInspected?: () => void;
  onReset?: () => void;
  disabledReceived?: boolean;
  disabledInspected?: boolean;
};

export default function FooterActions({ onMarkAllReceived, onMarkAllInspected, onReset, disabledReceived, disabledInspected }: Props) {
  return (
    <div className="sticky bottom-0 inset-x-0 bg-white border-t p-4 flex gap-3">
      <div className="flex gap-3 w-full">
        <button
          onClick={onMarkAllReceived}
          disabled={disabledReceived}
          className="flex-1 py-4 rounded-md bg-blue-600 text-white text-lg disabled:bg-gray-400"
        >
          Mark all received
        </button>
        <button
          onClick={onMarkAllInspected}
          disabled={disabledInspected}
          className="flex-1 py-4 rounded-md bg-emerald-600 text-white text-lg disabled:bg-gray-400"
        >
          Mark all inspected
        </button>
      </div>
      <button
        onClick={onReset}
        className="px-4 py-4 rounded-md border text-lg"
      >
        Reset
      </button>
    </div>
  );
}


