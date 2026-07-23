/**
 * TypeScript declarations for Web Bluetooth API.
 * Extends the global navigator with Bluetooth support
 * and defines GATT-related interfaces.
 */

interface BluetoothRequestDeviceFilter {
  services?: BluetoothServiceUUID[];
  name?: string;
  namePrefix?: string;
  manufacturerId?: number;
  serviceDataUUID?: BluetoothServiceUUID;
}

interface RequestDeviceOptions {
  filters: BluetoothRequestDeviceFilter[];
  optionalServices?: BluetoothServiceUUID[];
  acceptAllDevices?: boolean;
}

type BluetoothServiceUUID = number | string;

interface BluetoothManufacturerDataFilter {
  companyIdentifier: number;
  dataPrefix?: BufferSource;
  mask?: BufferSource;
}

interface BluetoothManufacturerDataMap {
  [key: string]: DataView;
}

interface BluetoothServiceDataMap {
  [key: string]: DataView;
}

interface BluetoothCharacteristicProperties {
  broadcast: boolean;
  read: boolean;
  writeWithoutResponse: boolean;
  write: boolean;
  notify: boolean;
  indicate: boolean;
  authenticatedSignedWrites: boolean;
  reliableWrite: boolean;
  writableAuxiliaries: boolean;
}

interface BluetoothRemoteGATTCharacteristic extends EventTarget {
  service: BluetoothRemoteGATTService;
  uuid: string;
  properties: BluetoothCharacteristicProperties;
  value?: DataView;
  readValue(): Promise<DataView>;
  writeValue(value: BufferSource): Promise<void>;
  startNotifications(): Promise<BluetoothRemoteGATTCharacteristic>;
  stopNotifications(): Promise<BluetoothRemoteGATTCharacteristic>;
  addEventListener(
    type: 'characteristicvaluechanged',
    listener: (event: Event) => void
  ): void;
  removeEventListener(
    type: 'characteristicvaluechanged',
    listener: (event: Event) => void
  ): void;
}

interface BluetoothRemoteGATTService {
  device: BluetoothDevice;
  uuid: string;
  isPrimary: boolean;
  getCharacteristic(uuid: BluetoothServiceUUID): Promise<BluetoothRemoteGATTCharacteristic>;
  getCharacteristics(uuid?: BluetoothServiceUUID): Promise<BluetoothRemoteGATTCharacteristic[]>;
  getIncludedService(uuid: BluetoothServiceUUID): Promise<BluetoothRemoteGATTService>;
  getIncludedServices(uuid?: BluetoothServiceUUID): Promise<BluetoothRemoteGATTService[]>;
}

interface BluetoothRemoteGATTServer {
  device: BluetoothDevice;
  connected: boolean;
  connect(): Promise<BluetoothRemoteGATTServer>;
  disconnect(): void;
  getPrimaryService(uuid: BluetoothServiceUUID): Promise<BluetoothRemoteGATTService>;
  getPrimaryServices(uuid?: BluetoothServiceUUID): Promise<BluetoothRemoteGATTService[]>;
}

interface BluetoothDevice extends EventTarget {
  id: string;
  name?: string;
  gatt?: BluetoothRemoteGATTServer;
  watchingAdvertisements?: boolean;
  watchAdvertisements(options?: { signal?: AbortSignal }): Promise<void>;
  addEventListener(
    type: 'advertisementreceived',
    listener: (event: Event) => void
  ): void;
  addEventListener(
    type: 'gattserverdisconnected',
    listener: (event: Event) => void
  ): void;
  removeEventListener(
    type: 'advertisementreceived',
    listener: (event: Event) => void
  ): void;
  removeEventListener(
    type: 'gattserverdisconnected',
    listener: (event: Event) => void
  ): void;
}

interface Bluetooth extends EventTarget {
  getDevices(): Promise<BluetoothDevice[]>;
  getAvailability(): Promise<boolean>;
  requestDevice(options?: RequestDeviceOptions): Promise<BluetoothDevice>;
  addEventListener(
    type: 'availabilitychanged',
    listener: (event: Event) => void
  ): void;
}

interface Navigator {
  bluetooth: Bluetooth;
}
