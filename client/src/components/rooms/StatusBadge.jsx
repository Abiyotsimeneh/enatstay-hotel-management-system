const statusConfig = {
  Available: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    dot: 'bg-emerald-500',
  },
  Occupied: {
    bg: 'bg-gold-100',
    text: 'text-gold-800',
    dot: 'bg-gold-500',
  },
  Maintenance: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    dot: 'bg-red-500',
  },
}

const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.Available

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  )
}

export default StatusBadge
