/**
 * ============================================================================
 * 🌿 APHS MQTT SERVICE MODULE (For IoT Integration)
 * ============================================================================
 * Hi friend! 👋 This file handles all MQTT communication between the web browser
 * and the IoT device (ESP32 / Arduino / Raspberry Pi).
 * 
 * Instructions:
 * 1. Update the `MQTT_CONFIG` below with your broker details (e.g. HiveMQ, EMQX, Mosquitto).
 *    Note: Web browsers MUST connect using WebSocket URLs (wss:// or ws://).
 * 2. If your device uses different topic names, just adjust `MQTT_TOPICS` below.
 * ============================================================================
 */

import mqtt, { type MqttClient } from 'mqtt';

// --- 1. BROKER CONFIGURATION ---
export const MQTT_CONFIG = {
  // Free public test broker (change to your own broker host & port when ready):
  brokerUrl: 'wss://broker.hivemq.com:8884/mqtt',
  options: {
    clean: true,
    connectTimeout: 4000,
    clientId: `aphs_web_${Math.random().toString(16).substring(2, 8)}`,
    // username: 'your_username', // Uncomment if broker requires auth
    // password: 'your_password',
  },
};

// --- 2. TOPIC FORMATTERS ---
export const MQTT_TOPICS = {
  // IoT publishes sensor readings here -> Web listens:
  moisture: (plantId: string) => `aphs/plants/${plantId}/moisture`,

  // Web sends watering commands here -> IoT listens:
  control: (plantId: string) => `aphs/plants/${plantId}/control`,

  // IoT confirms watering status/finished here -> Web listens:
  status: (plantId: string) => `aphs/plants/${plantId}/status`,
};

// --- 3. PAYLOAD INTERFACES ---
export interface MoisturePayload {
  humidity: number;
  timestamp?: string | number;
}

export interface WaterCommandPayload {
  command: 'WATER' | 'STOP';
  targetLimit: number; // e.g. 80
  plantId: string;
}

export interface WaterStatusPayload {
  status: 'Watering' | 'Watered' | 'Connected' | 'Error';
  humidity?: number;
  message?: string;
}

// --- 4. MQTT CLIENT CLASS HELPER ---
class MqttManager {
  private client: MqttClient | null = null;
  private isConnecting: boolean = false;

  public connect(): MqttClient {
    if (this.client) return this.client;
    if (this.isConnecting) return this.client!;

    this.isConnecting = true;
    console.log('🌱 [MQTT] Connecting to broker:', MQTT_CONFIG.brokerUrl);

    try {
      this.client = mqtt.connect(MQTT_CONFIG.brokerUrl, MQTT_CONFIG.options);

      this.client.on('connect', () => {
        console.log('✅ [MQTT] Connected successfully to broker!');
        this.isConnecting = false;
      });

      this.client.on('error', (err) => {
        console.error('❌ [MQTT] Connection error:', err);
      });

      this.client.on('reconnect', () => {
        console.log('🔄 [MQTT] Reconnecting...');
      });
    } catch (err) {
      console.error('❌ [MQTT] Failed to initialize client:', err);
      this.isConnecting = false;
    }

    return this.client!;
  }

  public getClient(): MqttClient | null {
    if (!this.client) {
      return this.connect();
    }
    return this.client;
  }

  /**
   * Send the "Go Water" command to the IoT device
   * @param plantId The unique plant identifier
   * @param targetLimit The humidity limit percentage (e.g. 80)
   */
  public sendWaterCommand(plantId: string, targetLimit: number = 80) {
    const client = this.getClient();
    if (!client) {
      console.warn('⚠️ [MQTT] Cannot send command: Client not connected');
      return;
    }

    const topic = MQTT_TOPICS.control(plantId);
    const payload: WaterCommandPayload = {
      command: 'WATER',
      targetLimit,
      plantId,
    };

    client.publish(topic, JSON.stringify(payload), { qos: 1 }, (err) => {
      if (err) {
        console.error('❌ [MQTT] Error sending water command:', err);
      } else {
        console.log(`💧 [MQTT] Sent water command to [${topic}]:`, payload);
      }
    });
  }

  /**
   * Subscribe to plant sensor telemetry
   */
  public subscribeToPlant(
    plantId: string,
    onMoisture: (data: MoisturePayload) => void,
    onStatus?: (data: WaterStatusPayload) => void
  ) {
    const client = this.getClient();
    if (!client) return () => {};

    const moistureTopic = MQTT_TOPICS.moisture(plantId);
    const statusTopic = MQTT_TOPICS.status(plantId);

    client.subscribe([moistureTopic, statusTopic], (err) => {
      if (err) console.error(`❌ [MQTT] Failed to subscribe to plant ${plantId}:`, err);
      else console.log(`📡 [MQTT] Subscribed to topics for plant ${plantId}`);
    });

    const handleMessage = (topic: string, message: Buffer) => {
      try {
        const text = message.toString();
        const parsed = JSON.parse(text);

        if (topic === moistureTopic) {
          onMoisture(parsed);
        } else if (topic === statusTopic && onStatus) {
          onStatus(parsed);
        }
      } catch {
        // In case payload is raw number or string
        if (topic === moistureTopic) {
          const num = Number(message.toString());
          if (!isNaN(num)) onMoisture({ humidity: num });
        }
      }
    };

    client.on('message', handleMessage);

    // Return cleanup function to unsubscribe
    return () => {
      client.removeListener('message', handleMessage);
      client.unsubscribe([moistureTopic, statusTopic]);
    };
  }
}

export const mqttService = new MqttManager();
