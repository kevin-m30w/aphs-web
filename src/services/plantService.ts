import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { PlantDetailData } from '../pages';

export const plantService = {
  /**
   * Fetch all plants belonging to the logged-in user
   */
  async getPlants(userId: string): Promise<PlantDetailData[]> {
    if (!isSupabaseConfigured()) {
      console.info('ℹ️ Supabase not configured. Using local state.');
      return [];
    }

    const { data, error } = await supabase
      .from('plants')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching plants from Supabase:', error);
      throw error;
    }

    return (data || []).map((p) => ({
      id: p.id,
      name: p.name,
      status: p.status || 'Connected',
      humidity: p.humidity ?? 50,
      humidityLimit: p.humidity_limit ?? 80,
      qdp: p.qdp || p.id,
      schedule: p.schedule || 'Every 2 days',
      imageUrl: p.image_url,
      lastWatered: p.last_watered || 'Never',
    }));
  },

  /**
   * Add a new plant for the current user
   */
  async addPlant(plant: Omit<PlantDetailData, 'id'> & { id?: string }, userId: string): Promise<PlantDetailData> {
    const id = plant.id || `PLT-${Math.floor(100000 + Math.random() * 900000)}`;

    if (!isSupabaseConfigured()) {
      return { ...plant, id };
    }

    const { data, error } = await supabase
      .from('plants')
      .insert([
        {
          id,
          user_id: userId,
          name: plant.name,
          status: plant.status || 'Connected',
          humidity: plant.humidity ?? 50,
          humidity_limit: plant.humidityLimit ?? 80,
          qdp: plant.qdp || id,
          schedule: plant.schedule,
          image_url: plant.imageUrl,
          last_watered: plant.lastWatered,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error adding plant to Supabase:', error);
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      status: data.status,
      humidity: data.humidity,
      humidityLimit: data.humidity_limit,
      qdp: data.qdp,
      schedule: data.schedule,
      imageUrl: data.image_url,
      lastWatered: data.last_watered,
    };
  },

  /**
   * Update plant fields (name, limit, humidity, etc.)
   */
  async updatePlant(plantId: string, updates: Partial<PlantDetailData>): Promise<void> {
    if (!isSupabaseConfigured()) return;

    const dbPayload: Record<string, unknown> = {};
    if (updates.name !== undefined) dbPayload.name = updates.name;
    if (updates.status !== undefined) dbPayload.status = updates.status;
    if (updates.humidity !== undefined) dbPayload.humidity = updates.humidity;
    if (updates.humidityLimit !== undefined) dbPayload.humidity_limit = updates.humidityLimit;
    if (updates.schedule !== undefined) dbPayload.schedule = updates.schedule;
    if (updates.lastWatered !== undefined) dbPayload.last_watered = updates.lastWatered;

    const { error } = await supabase
      .from('plants')
      .update(dbPayload)
      .eq('id', plantId);

    if (error) {
      console.error('Error updating plant in Supabase:', error);
      throw error;
    }
  },

  /**
   * Delete a plant
   */
  async deletePlant(plantId: string): Promise<void> {
    if (!isSupabaseConfigured()) return;

    const { error } = await supabase
      .from('plants')
      .delete()
      .eq('id', plantId);

    if (error) {
      console.error('Error deleting plant from Supabase:', error);
      throw error;
    }
  },
};
