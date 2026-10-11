import { useState } from "react";
import {
    AddPlantModal,
    DashboardControls,
    WelcomeBanner,
} from "../components/dashboard";
import { Header } from "../components/Header";
import { PlantCard } from "../components/PlantCard";
import type { PlantDetailData } from "../pages/PlantDetailsPage";
import { useUser } from "../hooks/useUser";

export interface DashboardPageProps {
    plants: PlantDetailData[];
    onSelectDetail: (plantId: string) => void;
    onWater: (plantId: string) => void;
    onAddPlant: (plantName: string) => Promise<void>;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
    plants,
    onSelectDetail,
    onWater,
    onAddPlant,
}) => {
    const { user, logout } = useUser();
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddPlantModal, setShowAddPlantModal] = useState(false);

    const filteredPlants = plants.filter(
        (plant) =>
            plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            plant.id.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <div className="min-h-screen bg-[#FAF4E8] text-[#3B3A36] flex flex-col selection:bg-[#FFDABC]">
            {/* Top Header */}
            <Header />

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 flex flex-col gap-5 sm:gap-6">
                {/* Top Control Bar: Responsive for Mobile & Desktop */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-3.5 sm:gap-4">
                    {/* Welcome Banner */}
                    <WelcomeBanner
                        userName={
                            user?.user_metadata?.display_name ||
                            user?.email?.split("@")[0] ||
                            "Plant Parent"
                        }
                        onLogout={logout}
                    />

                    {/* Search & New Plant Controls */}
                    <DashboardControls
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        onOpenAddModal={() => setShowAddPlantModal(true)}
                        plantCount={filteredPlants.length}
                    />
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
                                onSelectDetail={onSelectDetail}
                                onWater={onWater}
                            />
                        ))
                    ) : (
                        <div className="col-span-full bg-[#FFF8E7] border-2 border-dashed border-[#FFDABC] rounded-2xl p-8 text-center">
                            <p className="text-sm font-bold text-amber-900/60">
                                No plants found
                            </p>
                            <p className="text-xs text-amber-900/40 mt-1">
                                Try searching another plant name or ID
                            </p>
                        </div>
                    )}
                </div>
            </main>

            {/* Add New Plant Modal */}
            <AddPlantModal
                isOpen={showAddPlantModal}
                onClose={() => setShowAddPlantModal(false)}
                onAddPlant={onAddPlant}
            />
        </div>
    );
};
