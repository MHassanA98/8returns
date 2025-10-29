type Props = {
  isRegistered?: boolean;
  isArrived?: boolean;
  isInspected?: boolean;
  isCompleted?: boolean;
};

function Dot({ active }: { active: boolean }) {
  return (
    <span className={`w-3 h-3 rounded-full ${active ? 'bg-blue-600' : 'bg-gray-300'}`} />
  );
}

export default function Timeline({ isRegistered, isArrived, isInspected, isCompleted }: Props) {
  const steps = [
    { label: 'Registered', active: !!isRegistered },
    { label: 'Received', active: !!isArrived },
    { label: 'Inspected', active: !!isInspected },
    { label: 'Completed', active: !!isCompleted }
  ];

  return (
    <div className="flex items-center gap-4 py-3">
      {steps.map((s, i) => (
        <div key={s.label} className="flex items-center gap-2">
          <Dot active={s.active} />
          <span className={`text-sm ${s.active ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{s.label}</span>
          {i < steps.length - 1 && <span className="mx-2 h-px w-10 bg-gray-200" />}
        </div>
      ))}
    </div>
  );
}


