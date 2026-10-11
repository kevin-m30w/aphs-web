import { useCallback, useEffect, useMemo, useState } from "react";
import type { PlantDetailData } from "../pages";
import { plantService, type NewPlant } from "../services/plantService";

export function usePlants(userId: string | null | undefined) {
    const [plants, setPlants] = useState<PlantDetailData[]>([]);
    const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) {
            setPlants([]);
            setSelectedPlantId(null);
            return;
        }

        let isMounted = true;

        plantService
            .getPlants(userId)
            .then((userPlants) => {
                if (!isMounted) return;
                setPlants(userPlants);
            })
            .catch((error) => {
                console.error("Failed to load plants:", error);
            });

        return () => {
            isMounted = false;
        };
    }, [userId]);

    const updatePlant = useCallback(
        async (plantId: string, updatedFields: Partial<PlantDetailData>) => {
            setPlants((prev) =>
                prev.map((plant) =>
                    plant.id === plantId
                        ? { ...plant, ...updatedFields }
                        : plant,
                ),
            );

            try {
                await plantService.updatePlant(plantId, updatedFields);
            } catch (error) {
                console.error(
                    "Failed to sync plant update to Supabase:",
                    error,
                );
            }
        },
        [],
    );

    const quickWater = useCallback(
        (plantId: string) => {
            const targetPlant = plants.find((plant) => plant.id === plantId);
            if (!targetPlant) return;

            const nextHumidity = Math.min(
                targetPlant.humidityLimit || 80,
                targetPlant.humidity + 10,
            );

            void updatePlant(plantId, {
                humidity: nextHumidity,
                lastWatered: new Date().toISOString(),
            });
        },
        [plants, updatePlant],
    );

    const addPlant = useCallback(
        async (plantName: string) => {
            if (!userId) return;

            const newPlant: NewPlant = {
                name: plantName,
                status: "Disconnected",
                humidity: 0,
                humidityLimit: 80,
                lastWatered: "Just added",
            };

            try {
                const savedPlant = await plantService.addPlant(
                    newPlant,
                    userId,
                );
                setPlants((prev) => [savedPlant, ...prev]);
            } catch (error) {
                console.error("Failed to save new plant to Supabase:", error);
                throw error;
            }
        },
        [userId],
    );

    const selectedPlant = useMemo(
        () => plants.find((plant) => plant.id === selectedPlantId) ?? null,
        [plants, selectedPlantId],
    );

    return {
        plants,
        selectedPlantId,
        selectedPlant,
        setSelectedPlantId,
        updatePlant,
        quickWater,
        addPlant,
    };
}
