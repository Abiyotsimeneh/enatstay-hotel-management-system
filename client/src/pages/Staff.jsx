import { Plus, Search, Users } from 'lucide-react'

const Staff = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff</h1>
          <p className="text-gray-600 mt-1">Manage hotel staff members</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2">
          <Plus size={20} />
          Add Staff
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search staff..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Users size={20} />
          Department
        </button>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-blue-600 text-2xl font-bold">👥</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Staff Management</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          This module will allow you to add, edit, and manage hotel staff. 
          Features coming soon: staff roles, schedules, performance tracking, and more.
        </p>
      </div>
    </div>
  )
}

export default Staff
