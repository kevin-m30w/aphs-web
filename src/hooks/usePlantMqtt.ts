import { useEffect } from 'react';
import { mqttService, type MoisturePayload, type WaterStatusPayload } from '../services/mqttService';

export interface UsePlantMqttOptions {
  plantId: string;
  onMoistureReceived?: (data: MoisturePayload) => void;
  onStatusReceived?: (data: WaterStatusPayload) => void;
}

export function usePlantMqtt({ plantId, onMoistureReceived, onStatusReceived }: UsePlantMqttOptions) {
  useEffect(() => {
    if (!plantId) return;

    // Connect and subscribe to topics
    const unsubscribe = mqttService.subscribeToPlant(
      plantId,
      (moisture) => {
        if (onMoistureReceived) onMoistureReceived(moisture);
      },
      (status) => {
        if (onStatusReceived) onStatusReceived(status);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [plantId, onMoistureReceived, onStatusReceived]);

  const waterPlant = (targetLimit: number = 80) => {
    mqttService.sendWaterCommand(plantId, targetLimit);
  };

  return {
    waterPlant,
  };
}
