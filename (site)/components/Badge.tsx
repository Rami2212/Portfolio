interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'tertiary';
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: "bg-white/10 border-white/20 text-white/80 hover:bg-white/15",
    primary: "bg-gradient-to-r from-purple-500/20 to-purple-500/10 border-purple-400/30 text-purple-200 hover:from-purple-500/30 hover:to-purple-500/20",
    secondary: "bg-gradient-to-r from-blue-500/20 to-blue-500/10 border-blue-400/30 text-blue-200 hover:from-blue-500/30 hover:to-blue-500/20",
    tertiary: "bg-gradient-to-r from-purple-500/15 to-blue-500/15 border-purple-400/20 text-white/80 hover:from-purple-500/25 hover:to-blue-500/25"
  };

  return (
    <span
      className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-medium backdrop-blur-sm transition-all duration-200 ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
