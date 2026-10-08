import { useState } from 'react';
import { Header } from './components/Header';
import { PlantCard } from './components/PlantCard';
import { Bell, Search, Plus } from 'lucide-react';

interface PlantItem {
  id: string;
  name: string;
  status: 'Connected' | 'Disconnected';
  humidity: number;
}

const INITIAL_PLANTS: PlantItem[] = [
  { id: 'F199238FN', name: 'Aloevera', status: 'Connected', humidity: 30 },
  { id: 'F199238FN', name: 'Aloevera', status: 'Connected', humidity: 50 },
  { id: 'F199238FN', name: 'Aloevera', status: 'Connected', humidity: 50 },
  { id: 'F199238FN', name: 'Aloevera', status: 'Connected', humidity: 50 },
  { id: 'F199238FN', name: 'Aloevera', status: 'Connected', humidity: 50 },
  { id: 'F199238FN', name: 'Aloevera', status: 'Connected', humidity: 50 },
  { id: 'F199238FN', name: 'Aloevera', status: 'Connected', humidity: 50 },
  { id: 'F199238FN', name: 'Aloevera', status: 'Connected', humidity: 50 },
  { id: 'F199238FN', name: 'Aloevera', status: 'Connected', humidity: 50 },
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlants = INITIAL_PLANTS.filter(
    (plant) =>
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF4E8] text-[#3B3A36] flex flex-col selection:bg-[#FFDABC]">
      {/* Top Header */}
      <Header />

      {/* Main Content Area - Responsive Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 flex flex-col gap-5 sm:gap-6">

        {/* Top Control Bar: Responsive for Mobile & Desktop */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3.5 sm:gap-4">

          {/* Welcome Card & Mobile Bell Wrapper */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* User Welcome Card */}
            <div className="flex-1 lg:w-72 xl:w-80 bg-[#F7A503] text-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-xs flex items-center gap-3 sm:gap-4 border border-[#F7A503]">
              {/* Pure Blank Avatar Placeholder */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#D4D8DC] shrink-0 border-2 border-white/50" />

              <div className="min-w-0">
                <p className="text-sm sm:text-base font-bold text-white tracking-wide leading-tight">
                  Welcome back!
                </p>
                <p className="text-xs sm:text-sm font-semibold text-white/90 mt-0.5">
                  User
                </p>
              </div>
            </div>

            {/* Notification Bell (Visible on Mobile here, hidden on Desktop) */}
            <button
              type="button"
              aria-label="Notifications"
              className="lg:hidden w-12 h-12 rounded-full bg-[#FFE8BC] border-2 border-[#F7A503] flex items-center justify-center text-[#F7A503] shadow-xs shrink-0 cursor-default"
            >
              <Bell className="w-6 h-6 fill-[#F7A503]/20" />
            </button>
          </div>

          {/* Search Bar & Action Area (Stretches across right side on Desktop) */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-900/50">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="w-full pl-9 pr-4 py-2 sm:py-2.5 bg-[#FFF8E7] border-2 border-[#F7A503] rounded-xl sm:rounded-2xl text-sm font-medium text-[#3B3A36] placeholder-amber-900/40 outline-none transition-all"
                />
              </div>

              {/* Notification Bell (Visible on Desktop here) */}
              <button
                type="button"
                aria-label="Notifications"
                className="hidden lg:flex w-11 h-11 rounded-full bg-[#FFE8BC] border-2 border-[#F7A503] items-center justify-center text-[#F7A503] shadow-xs shrink-0 cursor-default"
              >
                <Bell className="w-5 h-5 fill-[#F7A503]/20" />
              </button>
            </div>

            {/* Action Bar: New Plant Button */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 bg-[#FFF8E7] text-[#768C3A] font-bold text-xs px-3 py-1.5 rounded-lg sm:rounded-xl border-2 border-[#F7A503] shadow-xs cursor-default"
              >
                <span className="w-3.5 h-3.5 rounded-full bg-[#F7A503] text-white flex items-center justify-center">
                  <Plus className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                New plant
              </button>

              <span className="text-xs font-semibold text-amber-950/50">
                {filteredPlants.length} plants monitored
              </span>
            </div>
          </div>

        </div>

        {/* Plant Cards Responsive Grid: 1 col on mobile, 2 col on tablet, 3 col on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 pb-10">
          {filteredPlants.length > 0 ? (
            filteredPlants.map((plant, index) => (
              <PlantCard
                key={`${plant.id}-${index}`}
                id={plant.id}
                name={plant.name}
                status={plant.status}
                humidity={plant.humidity}
              />
            ))
          ) : (
            <div className="col-span-full bg-[#FFF8E7] border-2 border-dashed border-[#FFDABC] rounded-3xl p-8 text-center">
              <p className="text-sm font-bold text-amber-900/60">No plants found</p>
              <p className="text-xs text-amber-900/40 mt-1">Try searching another plant name or ID</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

export default App;
