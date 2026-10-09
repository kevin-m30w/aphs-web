import { useState, useEffect } from 'react';
import { AuthPage, DashboardPage, PlantDetailsPage, type PlantDetailData } from './pages';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { plantService } from './services/plantService';

interface CurrentUser {
  id: string;
  email: string;
  name: string;
}

// Default mock user so you can develop on the main page immediately without logging in
const DEFAULT_DEV_USER: CurrentUser = {
  id: 'dev_user_123',
  email: 'user@aphs.local',
  name: 'User',
};

const DEFAULT_SAMPLE_PLANTS: PlantDetailData[] = [
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
];

function App() {
  // Start with default user so you directly land on the Main Page
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(DEFAULT_DEV_USER);
  const [plants, setPlants] = useState<PlantDetailData[]>(DEFAULT_SAMPLE_PLANTS);
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);

  // Sync Supabase Auth session if configured
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const u = session.user;
        setCurrentUser({
          id: u.id,
          email: u.email || '',
          name: u.user_metadata?.display_name || u.email?.split('@')[0] || 'User',
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const u = session.user;
        setCurrentUser({
          id: u.id,
          email: u.email || '',
          name: u.user_metadata?.display_name || u.email?.split('@')[0] || 'User',
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch plants from Supabase when user logs in with a real account
  useEffect(() => {
    if (currentUser?.id && currentUser.id !== 'dev_user_123') {
      plantService
        .getPlants(currentUser.id)
        .then((userPlants) => {
          if (userPlants.length > 0) {
            setPlants(userPlants);
          } else {
            setPlants(DEFAULT_SAMPLE_PLANTS);
          }
        })
        .catch(() => {
          setPlants(DEFAULT_SAMPLE_PLANTS);
        });
    }
  }, [currentUser]);

  // Update specific plant properties
  const handleUpdatePlant = async (plantId: string, updatedFields: Partial<PlantDetailData>) => {
    setPlants((prev) =>
      prev.map((p) => (p.id === plantId ? { ...p, ...updatedFields } : p))
    );

    if (currentUser?.id && currentUser.id !== 'dev_user_123') {
      try {
        await plantService.updatePlant(plantId, updatedFields);
      } catch (err) {
        console.error('Failed to sync plant update to Supabase:', err);
      }
    }
  };

  // Quick water from plant card
  const handleQuickWater = (plantId: string) => {
    const targetPlant = plants.find((p) => p.id === plantId);
    if (!targetPlant) return;

    const newHumidity = Math.min(targetPlant.humidityLimit || 80, targetPlant.humidity + 10);
    handleUpdatePlant(plantId, {
      humidity: newHumidity,
      lastWatered: 'Just now',
    });
  };

  // Add new plant handler
  const handleAddNewPlant = async (plantName: string) => {
    const newId = `PLT-${Math.floor(100000 + Math.random() * 900000)}`;
    const newPlant: PlantDetailData = {
      id: newId,
      name: plantName,
      status: 'Connected',
      humidity: 50,
      humidityLimit: 80,
      qdp: `${Math.floor(200000000 + Math.random() * 900000000)}`,
      schedule: 'Every 2 days at 08:00 AM',
      lastWatered: 'Just added',
    };

    setPlants((prev) => [newPlant, ...prev]);

    if (currentUser?.id && currentUser.id !== 'dev_user_123') {
      try {
        await plantService.addPlant(newPlant, currentUser.id);
      } catch (err) {
        console.error('Failed to save new plant to Supabase:', err);
      }
    }
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    setCurrentUser(null);
  };

  // 1. If not logged in, render the Auth Page
  if (!currentUser) {
    return (
      <AuthPage
        onAuthSuccess={(user) => setCurrentUser(user)}
        onSkip={() => setCurrentUser(DEFAULT_DEV_USER)}
      />
    );
  }

  // Find selected plant object for detail view
  const selectedPlant = plants.find((p) => p.id === selectedPlantId);

  // 2. If a plant is selected, render the Plant Details Page
  if (selectedPlant) {
    return (
      <div className="min-h-screen bg-[#FAF4E8] text-[#3B3A36] flex flex-col selection:bg-[#FFDABC]">
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
          <PlantDetailsPage
            plant={selectedPlant}
            onBack={() => setSelectedPlantId(null)}
            onUpdatePlant={(updated) => handleUpdatePlant(selectedPlant.id, updated)}
          />
        </main>
      </div>
    );
  }

  // 3. Default: Render the Dashboard Page
  return (
    <DashboardPage
      userName={currentUser.name}
      onLogout={handleLogout}
      plants={plants}
      onSelectDetail={(id) => setSelectedPlantId(id)}
      onWater={(id) => handleQuickWater(id)}
      onAddPlant={handleAddNewPlant}
    />
  );
}

export default App;
