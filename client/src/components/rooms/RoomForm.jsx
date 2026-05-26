import { useState, useEffect } from 'react'

const ROOM_TYPES = ['Single', 'Double', 'Twin', 'Suite', 'Deluxe', 'Presidential']
const STATUSES = ['Available', 'Occupied', 'Maintenance']

const emptyRoom = {
  roomNumber: '',
  type: 'Single',
  price: '',
  capacity: '',
  status: 'Available',
}

const RoomForm = ({ room, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(emptyRoom)
  const [errors, setErrors] = useState({})

  const isEditing = Boolean(room)

  useEffect(() => {
    if (room) {
      setFormData({
        roomNumber: room.roomNumber,
        type: room.type,
        price: String(room.price),
        capacity: String(room.capacity),
        status: room.status,
      })
    } else {
      setFormData(emptyRoom)
    }
    setErrors({})
  }, [room])

  const validate = () => {
    const newErrors = {}
    if (!formData.roomNumber.trim()) newErrors.roomNumber = 'Room number is required'
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Valid price is required'
    if (!formData.capacity || Number(formData.capacity) <= 0) newErrors.capacity = 'Valid capacity is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      ...formData,
      price: Number(formData.price),
      capacity: Number(formData.capacity),
    })
  }

  const inputClass = (field) =>
    `w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-300'
    }`

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Room Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Room Number
        </label>
        <input
          type="text"
          name="roomNumber"
          value={formData.roomNumber}
          onChange={handleChange}
          placeholder="e.g. 101"
          className={inputClass('roomNumber')}
        />
        {errors.roomNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.roomNumber}</p>
        )}
      </div>

      {/* Room Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Room Type
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className={inputClass('type')}
        >
          {ROOM_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Price & Capacity row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Price ($/night)
          </label>
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 120"
            className={inputClass('price')}
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Capacity
          </label>
          <input
            type="number"
            name="capacity"
            min="1"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="e.g. 2"
            className={inputClass('capacity')}
          />
          {errors.capacity && (
            <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>
          )}
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={inputClass('status')}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
        >
          {isEditing ? 'Update Room' : 'Add Room'}
        </button>
      </div>
    </form>
  )
}

export default RoomForm
