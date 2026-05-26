import { Edit, Trash2, Bed, Users, DollarSign } from 'lucide-react'
import StatusBadge from './StatusBadge'

const RoomTable = ({ rooms, onEdit, onDelete, viewMode }) => {
  if (rooms.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bed className="text-emerald-600" size={28} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">No rooms found</h3>
        <p className="text-gray-500 text-sm">
          Add your first room to get started.
        </p>
      </div>
    )
  }

  if (viewMode === 'cards') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
          >
            {/* Card Header */}
            <div className="bg-emerald-900 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bed size={18} className="text-gold-300" />
                <span className="text-white font-semibold text-lg">
                  Room {room.roomNumber}
                </span>
              </div>
              <StatusBadge status={room.status} />
            </div>

            {/* Card Body */}
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-1.5">
                  <Bed size={14} /> Type
                </span>
                <span className="font-medium text-gray-900">{room.type}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-1.5">
                  <DollarSign size={14} /> Price
                </span>
                <span className="font-medium text-gray-900">
                  ${room.price}/night
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-1.5">
                  <Users size={14} /> Capacity
                </span>
                <span className="font-medium text-gray-900">
                  {room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}
                </span>
              </div>
            </div>

            {/* Card Actions */}
            <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-end gap-2">
              <button
                onClick={() => onEdit(room)}
                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                title="Edit room"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => onDelete(room.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete room"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Table view (default)
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rooms.map((room) => (
              <tr
                key={room.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Bed size={14} className="text-emerald-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {room.roomNumber}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {room.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${room.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={room.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(room)}
                      className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="Edit room"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(room.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete room"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RoomTable
