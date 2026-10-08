import { useState } from 'react';
import { Header } from './components/Header';
import { PlantCard } from './components/PlantCard';
import { PlantDetails, type PlantDetailData } from './components/PlantDetails';
import { Bell, Search, Plus, X, Sprout } from 'lucide-react';

const INITIAL_PLANTS: PlantDetailData[] = [
  {
    id: 'F199238FN',
    name: 'Aloe Vera',
    status: 'Connected',
    humidity: 50,
    humidityLimit: 80,
    qdp: '240124901',
    schedule: 'Every 2 days at 08:00 AM',
    lastWatered: 'Yesterday at 04:15 PM',
  },
  {
    id: 'M204918LK',
    name: 'Monstera Deliciosa',
    status: 'Connected',
    humidity: 65,
    humidityLimit: 75,
    qdp: '240124902',
    schedule: 'Every 3 days at 09:00 AM',
    lastWatered: 'Today at 08:00 AM',
  },
  {
    id: 'S391024PL',
    name: 'Snake Plant',
    status: 'Disconnected',
    humidity: 30,
    humidityLimit: 60,
    qdp: '240124903',
    schedule: 'Weekly at 10:00 AM',
    lastWatered: '3 days ago',
  },
  {
    id: 'P992015ZX',
    name: 'Peace Lily',
    status: 'Connected',
    humidity: 45,
    humidityLimit: 85,
    qdp: '240124904',
    schedule: 'Every day at 07:30 AM',
    lastWatered: 'Today at 07:30 AM',
  },
  {
    id: 'F881920QA',
    name: 'Fiddle Leaf Fig',
    status: 'Connected',
    humidity: 55,
    humidityLimit: 70,
    qdp: '240124905',
    schedule: 'Every 3 days at 08:30 AM',
    lastWatered: 'Yesterday',
  },
  {
    id: 'G773910BV',
    name: 'Golden Pothos',
    status: 'Connected',
    humidity: 70,
    humidityLimit: 80,
    qdp: '240124906',
    schedule: 'Every 2 days at 09:00 AM',
    lastWatered: 'Today at 06:00 AM',
  },
];

function App() {
  const [plants, setPlants] = useState<PlantDetailData[]>(INITIAL_PLANTS);
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddPlantModal, setShowAddPlantModal] = useState(false);
  const [newPlantName, setNewPlantName] = useState('');

  // Find selected plant object
  const selectedPlant = plants.find((p) => p.id === selectedPlantId);

  // Update specific plant properties
  const handleUpdatePlant = (plantId: string, updatedFields: Partial<PlantDetailData>) => {
    setPlants((prev) =>
      prev.map((p) => (p.id === plantId ? { ...p, ...updatedFields } : p))
    );
  };

  // Quick water from plant card
  const handleQuickWater = (plantId: string) => {
    setPlants((prev) =>
      prev.map((p) => {
        if (p.id === plantId) {
          const newHumidity = Math.min(100, p.humidity + 10);
          return { ...p, humidity: newHumidity, lastWatered: 'Just now' };
        }
        return p;
      })
    );
  };

  // Add new plant handler
  const handleAddNewPlant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlantName.trim()) return;

    const newId = `PLT-${Math.floor(100000 + Math.random() * 900000)}`;
    const newPlant: PlantDetailData = {
      id: newId,
      name: newPlantName.trim(),
      status: 'Connected',
      humidity: 50,
      humidityLimit: 80,
      qdp: `${Math.floor(200000000 + Math.random() * 900000000)}`,
      schedule: 'Every 2 days at 08:00 AM',
      lastWatered: 'Just added',
    };

    setPlants((prev) => [newPlant, ...prev]);
    setNewPlantName('');
    setShowAddPlantModal(false);
  };

  const filteredPlants = plants.filter(
    (plant) =>
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF4E8] text-[#3B3A36] flex flex-col selection:bg-[#FFDABC]">
      {/* Top Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 flex flex-col gap-5 sm:gap-6">
        
        {/* If a plant is selected, show the Plant Details View */}
        {selectedPlant ? (
          <PlantDetails
            plant={selectedPlant}
            onBack={() => setSelectedPlantId(null)}
            onUpdatePlant={(updated) => handleUpdatePlant(selectedPlant.id, updated)}
          />
        ) : (
          /* Otherwise show Dashboard & Plant Cards Grid */
          <>
            {/* Top Control Bar: Responsive for Mobile & Desktop */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-3.5 sm:gap-4">
              {/* Welcome Card & Mobile Bell Wrapper */}
              <div className="flex items-center gap-3 w-full lg:w-auto">
                {/* User Welcome Card */}
                <div className="flex-1 lg:w-72 xl:w-80 bg-[#F7A503] text-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-xs flex items-center gap-3 sm:gap-4 border border-[#F7A503]">
                  {/* Avatar Placeholder */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#D4D8DC] shrink-0 border-2 border-white/50 flex items-center justify-center text-xl">
                    🌱
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm sm:text-base font-bold text-white tracking-wide leading-tight">
                      Welcome back!
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-white/90 mt-0.5">
                      User
                    </p>
                  </div>
                </div>

                {/* Notification Bell (Visible on Mobile here) */}
                <button
                  type="button"
                  aria-label="Notifications"
                  className="lg:hidden w-12 h-12 rounded-full bg-[#FFE8BC] border-2 border-[#F7A503] flex items-center justify-center text-[#F7A503] shadow-xs shrink-0 cursor-pointer hover:bg-[#ffdabc] transition-colors"
                >
                  <Bell className="w-6 h-6 fill-[#F7A503]/20" />
                </button>
              </div>

              {/* Search Bar & Action Area */}
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
                      placeholder="Search plants by name or ID..."
                      className="w-full pl-9 pr-4 py-2 sm:py-2.5 bg-[#FFF8E7] border-2 border-[#F7A503] rounded-xl sm:rounded-2xl text-sm font-medium text-[#3B3A36] placeholder-amber-900/40 outline-none transition-all focus:ring-2 focus:ring-[#F7A503]/30"
                    />
                  </div>

                  {/* Notification Bell (Visible on Desktop here) */}
                  <button
                    type="button"
                    aria-label="Notifications"
                    className="hidden lg:flex w-11 h-11 rounded-full bg-[#FFE8BC] border-2 border-[#F7A503] items-center justify-center text-[#F7A503] shadow-xs shrink-0 cursor-pointer hover:bg-[#ffdabc] transition-colors"
                  >
                    <Bell className="w-5 h-5 fill-[#F7A503]/20" />
                  </button>
                </div>

                {/* Action Bar: New Plant Button */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowAddPlantModal(true)}
                    className="inline-flex items-center gap-1.5 bg-[#FFF8E7] hover:bg-white text-[#768C3A] font-bold text-xs px-3.5 py-1.5 rounded-lg sm:rounded-xl border-2 border-[#F7A503] shadow-xs cursor-pointer active:scale-95 transition-all"
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#F7A503] text-white flex items-center justify-center">
                      <Plus className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    New plant
                  </button>

                  <span className="text-xs font-semibold text-amber-950/60">
                    {filteredPlants.length} {filteredPlants.length === 1 ? 'plant' : 'plants'} monitored
                  </span>
                </div>
              </div>
            </div>

            {/* Plant Cards Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 pb-10">
              {filteredPlants.length > 0 ? (
                filteredPlants.map((plant) => (
                  <PlantCard
                    key={plant.id}
                    id={plant.id}
                    name={plant.name}
                    status={plant.status}
                    humidity={plant.humidity}
                    imageUrl={plant.imageUrl}
                    onSelectDetail={(id) => setSelectedPlantId(id)}
                    onWater={(id) => handleQuickWater(id)}
                  />
                ))
              ) : (
                <div className="col-span-full bg-[#FFF8E7] border-2 border-dashed border-[#FFDABC] rounded-3xl p-8 text-center">
                  <p className="text-sm font-bold text-amber-900/60">No plants found</p>
                  <p className="text-xs text-amber-900/40 mt-1">
                    Try searching another plant name or ID
                  </p>
                </div>
              )}
            </div>
          </>
        )}

      </main>

      {/* --- Add New Plant Modal --- */}
      {showAddPlantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FAF4E8] border-3 border-[#F7A503] rounded-3xl p-5 sm:p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#556925]">
                <Sprout className="w-5 h-5 text-[#768C3A]" />
                <h3 className="text-lg font-bold">Add New Plant</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddPlantModal(false)}
                className="text-amber-900/50 hover:text-amber-950 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewPlant} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-amber-950/70 mb-1">
                  Plant Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Monstera Deliciosa"
                  value={newPlantName}
                  onChange={(e) => setNewPlantName(e.target.value)}
                  autoFocus
                  className="w-full bg-[#FFF8E7] border-2 border-[#F7A503] rounded-xl px-3 py-2 text-sm font-semibold text-[#556925] outline-none placeholder-amber-900/40"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPlantModal(false)}
                  className="flex-1 bg-white border border-amber-900/20 text-amber-950 font-bold py-2 rounded-xl text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newPlantName.trim()}
                  className="flex-1 bg-[#F7A503] hover:bg-[#d69f30] disabled:opacity-50 text-white font-bold py-2 rounded-xl text-sm shadow-xs cursor-pointer"
                >
                  Add Plant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
