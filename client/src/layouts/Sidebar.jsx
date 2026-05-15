import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Bed, 
  Calendar, 
  Users, 
  Package, 
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

const Sidebar = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/rooms', icon: Bed, label: 'Rooms' },
    { path: '/bookings', icon: Calendar, label: 'Bookings' },
    { path: '/staff', icon: Users, label: 'Staff' },
    { path: '/inventory', icon: Package, label: 'Inventory' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-emerald-700 text-white rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full w-64 bg-emerald-900 text-white z-40
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Logo Section */}
        <div className="p-6 border-b border-emerald-800">
          <div className="flex items-center gap-3">
            {/* Logo Icon Placeholder */}
            <div className="w-10 h-10 bg-gold-400 rounded-lg flex items-center justify-center">
              <span className="text-emerald-900 font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-semibold">EnatStay</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${isActive(item.path)
                        ? 'bg-emerald-700 text-gold-300'
                        : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Logout Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-emerald-800">
          <Link
            to="/login"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-emerald-100 hover:bg-emerald-800 hover:text-white transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar
