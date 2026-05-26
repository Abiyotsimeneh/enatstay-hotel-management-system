import { useState, useMemo } from 'react'
import { Plus, Search, Filter, LayoutGrid, List, Bed } from 'lucide-react'
import Modal from '../components/ui/Modal'
import RoomTable from '../components/rooms/RoomTable'
import RoomForm from '../components/rooms/RoomForm'
import DeleteConfirm from '../components/rooms/DeleteConfirm'
import StatusBadge from '../components/rooms/StatusBadge'

const SAMPLE_ROOMS = [
  { id: 1, roomNumber: '101', type: 'Single',        price: 85,  capacity: 1, status: 'Available' },
  { id: 2, roomNumber: '102', type: 'Double',        price: 120, capacity: 2, status: 'Occupied' },
  { id: 3, roomNumber: '201', type: 'Twin',          price: 110, capacity: 2, status: 'Available' },
  { id: 4, roomNumber: '202', type: 'Suite',         price: 250, capacity: 3, status: 'Maintenance' },
  { id: 5, roomNumber: '301', type: 'Deluxe',        price: 180, capacity: 2, status: 'Available' },
  { id: 6, roomNumber: '302', type: 'Presidential',  price: 450, capacity: 4, status: 'Occupied' },
  { id: 7, roomNumber: '103', type: 'Single',        price: 85,  capacity: 1, status: 'Occupied' },
  { id: 8, roomNumber: '203', type: 'Double',        price: 130, capacity: 2, status: 'Available' },
]

const STATUS_OPTIONS = ['All', 'Available', 'Occupied', 'Maintenance']

const Rooms = () => {
  // ── State ──────────────────────────────────────────────────────────────
  const [rooms, setRooms] = useState(SAMPLE_ROOMS)
  const [nextId, setNextId] = useState(SAMPLE_ROOMS.length + 1)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [viewMode, setViewMode] = useState('table')
  const [showFilterMenu, setShowFilterMenu] = useState(false)

  // Modal state
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState(null)
  const [deletingRoom, setDeletingRoom] = useState(null)

  // ── Derived / filtered data ────────────────────────────────────────────
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchesSearch =
        room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.type.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus =
        statusFilter === 'All' || room.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [rooms, searchQuery, statusFilter])

  // Summary counts
  const counts = useMemo(() => {
    const map = { Available: 0, Occupied: 0, Maintenance: 0 }
    rooms.forEach((r) => { map[r.status] = (map[r.status] || 0) + 1 })
    return { total: rooms.length, ...map }
  }, [rooms])

  // ── Handlers ───────────────────────────────────────────────────────────
  const handleAdd = (data) => {
    setRooms((prev) => [...prev, { ...data, id: nextId }])
    setNextId((n) => n + 1)
    setIsAddOpen(false)
  }

  const handleEdit = (data) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === editingRoom.id ? { ...data, id: r.id } : r))
    )
    setEditingRoom(null)
  }

  const handleDelete = () => {
    setRooms((prev) => prev.filter((r) => r.id !== deletingRoom.id))
    setDeletingRoom(null)
  }

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rooms</h1>
          <p className="text-gray-600 mt-1">Manage your hotel rooms</p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={20} />
          Add Room
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Rooms', value: counts.total, color: 'bg-emerald-600' },
          { label: 'Available',   value: counts.Available,   color: 'bg-emerald-500' },
          { label: 'Occupied',    value: counts.Occupied,    color: 'bg-gold-500' },
          { label: 'Maintenance', value: counts.Maintenance, color: 'bg-red-500' },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${card.color}`} />
              <span className="text-sm text-gray-500">{card.label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar: Search · Filter · View Toggle */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search */}
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by room number or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <button
            onClick={() => setShowFilterMenu((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center"
          >
            <Filter size={18} />
            <span className="text-sm font-medium">
              {statusFilter === 'All' ? 'All Statuses' : statusFilter}
            </span>
          </button>

          {showFilterMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 z-10 py-1">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setStatusFilter(opt)
                    setShowFilterMenu(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                    statusFilter === opt
                      ? 'text-emerald-600 font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  {opt !== 'All' && <StatusBadge status={opt} />}
                  {opt === 'All' && <span>All Statuses</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex border border-gray-300 rounded-lg overflow-hidden self-center">
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 transition-colors ${
              viewMode === 'table'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
            title="Table view"
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`p-2 transition-colors ${
              viewMode === 'cards'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
            title="Card view"
          >
            <LayoutGrid size={18} />
          </button>
        </div>
      </div>

      {/* Room count label */}
      <p className="text-sm text-gray-500">
        Showing <span className="font-medium text-gray-900">{filteredRooms.length}</span>{' '}
        of {rooms.length} rooms
      </p>

      {/* Room Listing */}
      <RoomTable
        rooms={filteredRooms}
        onEdit={(room) => setEditingRoom(room)}
        onDelete={(id) => setDeletingRoom(rooms.find((r) => r.id === id))}
        viewMode={viewMode}
      />

      {/* ── Modals ──────────────────────────────────────────────────────── */}

      {/* Add Room Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add New Room"
      >
        <RoomForm
          room={null}
          onSubmit={handleAdd}
          onCancel={() => setIsAddOpen(false)}
        />
      </Modal>

      {/* Edit Room Modal */}
      <Modal
        isOpen={Boolean(editingRoom)}
        onClose={() => setEditingRoom(null)}
        title={`Edit Room ${editingRoom?.roomNumber || ''}`}
      >
        <RoomForm
          room={editingRoom}
          onSubmit={handleEdit}
          onCancel={() => setEditingRoom(null)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deletingRoom)}
        onClose={() => setDeletingRoom(null)}
        title="Confirm Deletion"
      >
        <DeleteConfirm
          roomNumber={deletingRoom?.roomNumber}
          onConfirm={handleDelete}
          onCancel={() => setDeletingRoom(null)}
        />
      </Modal>
    </div>
  )
}

export default Rooms
