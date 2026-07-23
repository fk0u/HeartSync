# Chapter 38: Service & Utility API Documentation

## 38.1 Utility API Specifications

### `classifyBP(systolic: number, diastolic: number): BPCategoryInfo`
- **Parameters**: `systolic` (number, 50-250), `diastolic` (number, 40-150).
- **Return Value**: `{ category: BPCategory, label: string, color: string, badgeBg: string, textColor: string, description: string }`.
- **Classification Rules**:
  - `Crisis`: Systolic $> 180$ OR Diastolic $> 120$.
  - `Stage 2`: Systolic $\ge 140$ OR Diastolic $\ge 90$.
  - `Stage 1`: Systolic 130–139 OR Diastolic 80–89.
  - `Elevated`: Systolic 120–129 AND Diastolic $< 80$.
  - `Normal`: Systolic $< 120$ AND Diastolic $< 80$.

### `playClickSound()`, `playSuccessChime()`, `playAlertSound()`
- Web Audio API sound synthesizer functions generating custom frequency tones (440Hz, 880Hz, 1000Hz) with gain node decay. Wrapped in try-catch to ensure failure to initialize AudioContext on restricted browsers does not block click handlers.
