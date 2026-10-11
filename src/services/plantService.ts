import { supabase } from "../lib/supabase";
import type { PlantDetailData } from "../pages";

export type NewPlant = Omit<PlantDetailData, "id" | "qdp">;

export type DbPlantRow = {
    id: string;
    user_id: string;
    name: string;
    photo_url?: string | null;
    status?: "Connected" | "Disconnected" | null;
    humidity?: number | null;
    humidity_limit?: number | null;
    qdp?: string | null;
    last_watered?: string | null;
    created_at?: string;
    updated_at?: string;
};

const toDbTimestamp = (value?: string): string | null => {
    if (!value) return null;

    const timestamp = Date.parse(value);
    return Number.isNaN(timestamp)
        ? new Date().toISOString()
        : new Date(timestamp).toISOString();
};

const mapDbRowToPlant = (row: DbPlantRow): PlantDetailData => ({
    id: row.id,
    name: row.name,
    status: row.status ?? "Connected",
    humidity: row.humidity ?? 50,
    humidityLimit: row.humidity_limit ?? 80,
    qdp: row.qdp ?? "Not paired",
    imageUrl: row.photo_url ?? undefined,
    lastWatered: row.last_watered ?? "Never",
});

const mapPlantToDbInsert = (plant: NewPlant & { userId: string }) => ({
    user_id: plant.userId,
    name: plant.name,
    photo_url: plant.imageUrl,
    status: plant.status,
    humidity: plant.humidity,
    humidity_limit: plant.humidityLimit,
    last_watered: toDbTimestamp(plant.lastWatered),
});

export const plantService = {
    /**
     * Fetch all plants belonging to the logged-in user.
     */
    async getPlants(userId: string): Promise<PlantDetailData[]> {
        const { data, error } = await supabase
            .from("plants")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching plants from Supabase:", error);
            throw error;
        }

        return (data ?? []).map(mapDbRowToPlant);
    },

    /**
     * Add a new plant for the current user.
     */
    async addPlant(plant: NewPlant, userId: string): Promise<PlantDetailData> {
        const insertPayload = mapPlantToDbInsert({
            ...plant,
            userId,
        });

        const { data, error } = await supabase
            .from("plants")
            .insert([insertPayload])
            .select()
            .single();

        if (error) {
            console.error("Error adding plant to Supabase:", error);
            throw error;
        }

        return mapDbRowToPlant(data as DbPlantRow);
    },

    /**
     * Update plant fields (name, status, limit, humidity, etc.).
     */
    async updatePlant(
        plantId: string,
        updates: Partial<PlantDetailData>,
    ): Promise<void> {
        const dbPayload: Record<string, unknown> = {};

        if (updates.name !== undefined) dbPayload.name = updates.name;
        if (updates.status !== undefined) dbPayload.status = updates.status;
        if (updates.humidity !== undefined)
            dbPayload.humidity = updates.humidity;
        if (updates.humidityLimit !== undefined)
            dbPayload.humidity_limit = updates.humidityLimit;
        if (updates.qdp !== undefined) dbPayload.qdp = updates.qdp;
        if (updates.schedule !== undefined)
            dbPayload.schedule = updates.schedule;
        if (updates.imageUrl !== undefined)
            dbPayload.photo_url = updates.imageUrl;
        if (updates.lastWatered !== undefined)
            dbPayload.last_watered = toDbTimestamp(updates.lastWatered);

        const { error } = await supabase
            .from("plants")
            .update(dbPayload)
            .eq("id", plantId);

        if (error) {
            console.error("Error updating plant in Supabase:", error);
            throw error;
        }
    },

    /**
     * Delete a plant.
     */
    async deletePlant(plantId: string): Promise<void> {
        const { error } = await supabase
            .from("plants")
            .delete()
            .eq("id", plantId);

        if (error) {
            console.error("Error deleting plant from Supabase:", error);
            throw error;
        }
    },
};
