interface StatusPillProps {
  color: string;
  label: string;
}

export const StatusPill = ({ color, label }: StatusPillProps) => (
  <span
    style={{
      backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
      color
    }}
    className='inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium'
  >
    <span className='size-1.5 rounded-full' style={{ backgroundColor: color }} />
    {label}
  </span>
);
