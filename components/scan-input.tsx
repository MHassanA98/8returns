"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Props = {
  placeholder?: string;
  onSubmit: (code: string) => void;
};

export default function ScanInput({ placeholder = "Scan or type order number", onSubmit }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    const i = inputRef.current;
    if (i) i.focus();
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const code = value.trim();
    if (!code) return;
    onSubmit(code);
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 sticky top-0 z-10 bg-white border-b">
      <label className="block text-sm font-medium mb-2">Order number / RMA</label>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputMode="numeric"
        className="w-full text-2xl p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        aria-label="Scan order number"
      />
      <div className="mt-3 flex gap-3">
        <button type="submit" className="flex-1 py-3 rounded-md bg-blue-600 text-white text-lg">Search</button>
        <button type="button" className="px-4 rounded-md border text-lg" onClick={() => { setValue(""); inputRef.current?.focus(); }}>Clear</button>
      </div>
    </form>
  );
}


