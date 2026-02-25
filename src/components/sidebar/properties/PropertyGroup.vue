<script setup lang="ts">
import { inject, ref } from 'vue'
import type { PropertyDefinition, EmailNode } from '../../../types'
import { EMAIL_LABELS_KEY, DEFAULT_LABELS, type EditorLabels } from '../../../labels'
import EIcon from '../../internal/EIcon.vue'

const props = defineProps<{
  label: string
  properties: PropertyDefinition[]
  node: EmailNode
}>()

const emit = defineEmits<{
  update: [key: string, value: string]
}>()

const labels = inject(EMAIL_LABELS_KEY, DEFAULT_LABELS)
const isExpanded = ref(true)

function resolveLabel(key: string): string {
  return (labels as EditorLabels)[key as keyof EditorLabels] ?? key
}

function getValue(key: string): string {
  return props.node.attributes[key] || ''
}
</script>

<template>
  <div class="ebb-prop-group">
    <button class="ebb-prop-group__header" @click="isExpanded = !isExpanded">
      <span>{{ label }}</span>
      <EIcon :name="isExpanded ? 'ChevronDown' : 'ChevronRight'" :size="14" />
    </button>
    <div v-show="isExpanded" class="ebb-prop-group__body">
      <div v-for="prop in properties" :key="prop.key" class="ebb-prop-group__field">
        <label class="ebb-prop-group__label">{{ resolveLabel(prop.label) }}</label>

        <!-- Color picker -->
        <div v-if="prop.type === 'color'" class="ebb-prop-group__color">
          <input
            type="color"
            :value="getValue(prop.key) || prop.defaultValue || '#000000'"
            class="ebb-prop-group__color-input"
            :aria-label="resolveLabel(prop.label)"
            @input="emit('update', prop.key, ($event.target as HTMLInputElement).value)"
          />
          <input
            type="text"
            :value="getValue(prop.key)"
            :placeholder="prop.defaultValue"
            class="ebb-prop-group__text-input"
            @change="emit('update', prop.key, ($event.target as HTMLInputElement).value)"
          />
        </div>

        <!-- Select -->
        <select
          v-else-if="prop.type === 'select'"
          :value="getValue(prop.key)"
          class="ebb-prop-group__select"
          @change="emit('update', prop.key, ($event.target as HTMLSelectElement).value)"
        >
          <option value="">—</option>
          <option
            v-for="opt in prop.options"
            :key="opt.value"
            :value="opt.value"
          >
            {{ resolveLabel(opt.label) }}
          </option>
        </select>

        <!-- Number -->
        <div v-else-if="prop.type === 'number'" class="ebb-prop-group__number">
          <input
            type="number"
            :value="parseInt(getValue(prop.key)) || ''"
            :min="prop.min"
            :max="prop.max"
            :step="prop.step || 1"
            :placeholder="prop.defaultValue"
            class="ebb-prop-group__text-input"
            @change="emit('update', prop.key, ($event.target as HTMLInputElement).value + (prop.unit || ''))"
          />
          <span v-if="prop.unit" class="ebb-prop-group__unit">{{ prop.unit }}</span>
        </div>

        <!-- Alignment -->
        <div v-else-if="prop.type === 'alignment'" class="ebb-prop-group__alignment">
          <button
            v-for="al in ['left', 'center', 'right']"
            :key="al"
            class="ebb-prop-group__align-btn"
            :class="{ 'ebb-prop-group__align-btn--active': getValue(prop.key) === al }"
            @click="emit('update', prop.key, al)"
          >
            <EIcon
              :name="al === 'left' ? 'AlignLeft' : al === 'center' ? 'AlignCenter' : 'AlignRight'"
              :size="14"
            />
          </button>
        </div>

        <!-- Toggle -->
        <div v-else-if="prop.type === 'toggle'" class="ebb-prop-group__toggle">
          <button
            class="ebb-prop-group__toggle-btn"
            :class="{ 'ebb-prop-group__toggle-btn--active': getValue(prop.key) === 'full-width' }"
            @click="emit('update', prop.key, getValue(prop.key) ? '' : 'full-width')"
          >
            {{ getValue(prop.key) ? resolveLabel('toggle_yes') : resolveLabel('toggle_no') }}
          </button>
        </div>

        <!-- Padding (simplified: single text input) -->
        <input
          v-else-if="prop.type === 'padding'"
          type="text"
          :value="getValue(prop.key)"
          placeholder="ex: 10px 20px"
          class="ebb-prop-group__text-input"
          @change="emit('update', prop.key, ($event.target as HTMLInputElement).value)"
        />

        <!-- Text / URL / Image (all render as text input for now) -->
        <input
          v-else
          type="text"
          :value="getValue(prop.key)"
          :placeholder="prop.defaultValue || ''"
          class="ebb-prop-group__text-input"
          @change="emit('update', prop.key, ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
  </div>
</template>

<style>
.ebb-prop-group {
  border-bottom: 1px solid #f3f4f6;
}

html[data-theme='dark'] .ebb-prop-group {
  border-bottom-color: #374151;
}

.ebb-prop-group__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 16px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9ca3af;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.15s;
}

.ebb-prop-group__header:hover {
  color: #374151;
}

html[data-theme='dark'] .ebb-prop-group__header:hover {
  color: #d1d5db;
}

.ebb-prop-group__body {
  padding: 0 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ebb-prop-group__field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ebb-prop-group__label {
  font-size: 11px;
  font-weight: 500;
  color: #6b7280;
}

html[data-theme='dark'] .ebb-prop-group__label {
  color: #9ca3af;
}

.ebb-prop-group__text-input {
  width: 100%;
  padding: 6px 8px;
  font-size: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  color: #374151;
  box-sizing: border-box;
  transition: border-color 0.15s;
}

html[data-theme='dark'] .ebb-prop-group__text-input {
  background: #1f2937;
  border-color: #374151;
  color: #d1d5db;
}

.ebb-prop-group__text-input:focus {
  outline: none;
  border-color: var(--ee-primary);
  box-shadow: 0 0 0 2px rgba(1, 168, 171, 0.1);
}

.ebb-prop-group__select {
  width: 100%;
  padding: 6px 8px;
  font-size: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  color: #374151;
  box-sizing: border-box;
  cursor: pointer;
}

html[data-theme='dark'] .ebb-prop-group__select {
  background: #1f2937;
  border-color: #374151;
  color: #d1d5db;
}

.ebb-prop-group__select:focus {
  outline: none;
  border-color: var(--ee-primary);
}

.ebb-prop-group__color {
  display: flex;
  gap: 6px;
  align-items: center;
}

.ebb-prop-group__color-input {
  width: 32px;
  height: 32px;
  padding: 2px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  background: none;
  flex-shrink: 0;
}

.ebb-prop-group__number {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ebb-prop-group__unit {
  font-size: 11px;
  color: #9ca3af;
  flex-shrink: 0;
}

.ebb-prop-group__alignment {
  display: flex;
  gap: 2px;
}

.ebb-prop-group__align-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 28px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.15s;
}

.ebb-prop-group__align-btn:first-child {
  border-radius: 6px 0 0 6px;
}

.ebb-prop-group__align-btn:last-child {
  border-radius: 0 6px 6px 0;
}

.ebb-prop-group__align-btn--active {
  background: rgba(1, 168, 171, 0.1);
  border-color: var(--ee-primary);
  color: var(--ee-primary);
}

html[data-theme='dark'] .ebb-prop-group__align-btn {
  background: #1f2937;
  border-color: #374151;
}

html[data-theme='dark'] .ebb-prop-group__align-btn--active {
  background: rgba(1, 168, 171, 0.15);
  border-color: var(--ee-primary);
  color: var(--ee-primary);
}

.ebb-prop-group__toggle-btn {
  padding: 4px 12px;
  font-size: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #ffffff;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.15s;
}

.ebb-prop-group__toggle-btn--active {
  background: rgba(1, 168, 171, 0.1);
  border-color: var(--ee-primary);
  color: var(--ee-primary);
}
</style>
