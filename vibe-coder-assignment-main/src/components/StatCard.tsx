interface StatCardProps {
  label: string;
  value: string | number;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200 dark:border-purple-800 p-4 rounded-xl">
      <div className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-1">{label}</div>
      <div className="text-xl font-bold text-gray-900 dark:text-gray-100">{value}</div>
    </div>
  );
}
