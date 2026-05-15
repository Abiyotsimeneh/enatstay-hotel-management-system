import { 
  Bed, 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  ArrowRight
} from 'lucide-react'

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Rooms',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: Bed,
      color: 'emerald'
    },
    {
      title: 'Active Bookings',
      value: '89',
      change: '+8%',
      trend: 'up',
      icon: Calendar,
      color: 'gold'
    },
    {
      title: 'Staff Members',
      value: '42',
      change: '+3%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Monthly Revenue',
      value: '$45,230',
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'purple'
    }
  ]

  const recentBookings = [
    { id: 1, guest: 'John Doe', room: '101', checkIn: '2024-05-15', status: 'Active' },
    { id: 2, guest: 'Jane Smith', room: '205', checkIn: '2024-05-14', status: 'Active' },
    { id: 3, guest: 'Michael Johnson', room: '302', checkIn: '2024-05-13', status: 'Completed' },
    { id: 4, guest: 'Sarah Williams', room: '108', checkIn: '2024-05-12', status: 'Active' },
    { id: 5, guest: 'David Brown', room: '215', checkIn: '2024-05-11', status: 'Completed' },
  ]

  const getStatusColor = (status) => {
    return status === 'Active' 
      ? 'bg-emerald-100 text-emerald-800' 
      : 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening at EnatStay.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          const colorClasses = {
            emerald: 'bg-emerald-500',
            gold: 'bg-gold-500',
            blue: 'bg-blue-500',
            purple: 'bg-purple-500'
          }
          
          return (
            <div key={stat.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${colorClasses[stat.color]} bg-opacity-10`}>
                  <Icon className={`${colorClasses[stat.color]}`} size={24} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Bookings Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
            <button className="text-emerald-600 hover:text-emerald-700 flex items-center gap-2 text-sm font-medium">
              View All
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.guest}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {booking.room}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {booking.checkIn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">New Booking</h3>
          <p className="text-emerald-100 text-sm mb-4">Create a new room reservation</p>
          <button className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors">
            Create Booking
          </button>
        </div>
        <div className="bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Check-in Guest</h3>
          <p className="text-gold-100 text-sm mb-4">Process guest check-in</p>
          <button className="bg-white text-gold-600 px-4 py-2 rounded-lg font-medium hover:bg-gold-50 transition-colors">
            Check-in Now
          </button>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">View Reports</h3>
          <p className="text-purple-100 text-sm mb-4">Analyze hotel performance</p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
