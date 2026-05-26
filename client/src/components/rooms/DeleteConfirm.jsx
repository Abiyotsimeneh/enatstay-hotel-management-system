import { AlertTriangle } from 'lucide-react'

const DeleteConfirm = ({ roomNumber, onConfirm, onCancel }) => {
  return (
    <div className="text-center space-y-4">
      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto">
        <AlertTriangle className="text-red-600" size={28} />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Delete Room {roomNumber}?</h3>
        <p className="text-gray-500 text-sm mt-1">
          This action cannot be undone. The room will be permanently removed.
        </p>
      </div>
      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={onCancel}
          className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-5 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          Delete Room
        </button>
      </div>
    </div>
  )
}

export default DeleteConfirm
