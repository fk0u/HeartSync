# Chapter 48: Future Engineering Improvements

## 48.1 Architecture Expansion Goals

1. **Web Bluetooth API Service (`src/services/bluetooth/`)**: Auto-pair with OMRON and Beurer BLE blood pressure monitors using standard GATT profile `0x1810` (Blood Pressure Service).
2. **TensorFlow.js Predictive Analytics (`src/ml/stroke-risk.ts`)**: Train an in-browser neural network on multi-month blood pressure variability, pulse pressure trends, and sleep logs to calculate a 10-year stroke risk score without sending data off-device.
3. **Multi-Language Internationalization (i18n)**: Expand language support beyond Indonesian to include English, Sundanese, and Javanese.
