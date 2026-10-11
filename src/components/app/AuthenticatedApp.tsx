import { DashboardPage, PlantDetailsPage } from "../../pages";
import { useUser } from "../../hooks/useUser";
import { usePlants } from "../../hooks/usePlants";

export function AuthenticatedApp() {
    const { user } = useUser();
    const {
        plants,
        selectedPlant,
        setSelectedPlantId,
        quickWater,
        addPlant,
        updatePlant,
    } = usePlants(user?.id);

    if (!user) {
        return null;
    }

    if (selectedPlant) {
        return (
            <div className="min-h-screen bg-[#FAF4E8] text-[#3B3A36] flex flex-col selection:bg-[#FFDABC]">
                <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
                    <PlantDetailsPage
                        plant={selectedPlant}
                        onBack={() => setSelectedPlantId(null)}
                        onUpdatePlant={(updated) =>
                            void updatePlant(selectedPlant.id, updated)
                        }
                    />
                </main>
            </div>
        );
    }

    return (
        <DashboardPage
            plants={plants}
            onSelectDetail={setSelectedPlantId}
            onWater={quickWater}
            onAddPlant={addPlant}
        />
    );
}
