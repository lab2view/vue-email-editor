<script setup lang="ts">
import { inject, ref } from 'vue'
import EIcon from '../internal/EIcon.vue'
import { EMAIL_DOCUMENT_KEY } from '../../injection-keys'
import { STARTER_TEMPLATES, type StarterTemplate } from '../../blocks/starter-templates'

const doc = inject(EMAIL_DOCUMENT_KEY)!

const emit = defineEmits<{
  applied: []
}>()

const pendingTemplate = ref<StarterTemplate | null>(null)

function requestApply(template: StarterTemplate) {
  pendingTemplate.value = template
}

function confirmApply() {
  if (!pendingTemplate.value) return
  const newDoc = pendingTemplate.value.factory()
  doc.replaceDocument(newDoc)
  pendingTemplate.value = null
  emit('applied')
}

function cancelApply() {
  pendingTemplate.value = null
}
</script>

<template>
  <div class="ebb-templates-panel">
    <p class="ebb-templates-panel__hint">
      Choisissez un modèle pour démarrer rapidement.
    </p>
    <div class="ebb-templates-panel__grid">
      <button
        v-for="tpl in STARTER_TEMPLATES"
        :key="tpl.id"
        class="ebb-template-card"
        @click="requestApply(tpl)"
      >
        <div class="ebb-template-card__icon" :style="{ background: tpl.color + '15', color: tpl.color }">
          <EIcon :name="tpl.icon" :size="22" />
        </div>
        <div class="ebb-template-card__info">
          <span class="ebb-template-card__label">{{ tpl.label }}</span>
          <span class="ebb-template-card__desc">{{ tpl.description }}</span>
        </div>
      </button>
    </div>

    <!-- Confirmation dialog -->
    <Teleport to="body">
      <Transition name="ebb-confirm-fade">
        <div v-if="pendingTemplate" class="ebb-confirm-overlay" @click.self="cancelApply">
          <div class="ebb-confirm-dialog">
            <div class="ebb-confirm-dialog__icon" :style="{ background: pendingTemplate.color + '15', color: pendingTemplate.color }">
              <EIcon :name="pendingTemplate.icon" :size="28" />
            </div>
            <h3 class="ebb-confirm-dialog__title">Appliquer « {{ pendingTemplate.label }} » ?</h3>
            <p class="ebb-confirm-dialog__text">
              Le contenu actuel de l'email sera entièrement remplacé par ce modèle. Cette action est irréversible.
            </p>
            <div class="ebb-confirm-dialog__actions">
              <button class="ebb-confirm-dialog__btn ebb-confirm-dialog__btn--cancel" @click="cancelApply">
                Annuler
              </button>
              <button class="ebb-confirm-dialog__btn ebb-confirm-dialog__btn--confirm" @click="confirmApply">
                <EIcon name="Check" :size="14" />
                Appliquer
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style>
.ebb-templates-panel {
  padding: 12px;
}

.ebb-templates-panel__header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
}

html[data-theme='dark'] .ebb-templates-panel__header {
  color: #d1d5db;
}

.ebb-templates-panel__hint {
  font-size: 11px;
  color: #9ca3af;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.ebb-templates-panel__grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ebb-template-card {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
}

html[data-theme='dark'] .ebb-template-card {
  border-color: #374151;
  background: #1f2937;
}

.ebb-template-card:hover {
  border-color: var(--ee-primary);
  background: #f0fdfd;
  box-shadow: 0 2px 8px rgba(1, 168, 171, 0.1);
}

html[data-theme='dark'] .ebb-template-card:hover {
  background: #0d3d3e;
  border-color: var(--ee-primary);
}

.ebb-template-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  flex-shrink: 0;
}

.ebb-template-card__info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.ebb-template-card__label {
  font-size: 13px;
  font-weight: 600;
  color: #333333;
}

html[data-theme='dark'] .ebb-template-card__label {
  color: #e5e7eb;
}

.ebb-template-card__desc {
  font-size: 11px;
  color: #9ca3af;
}

/* ── Confirmation Dialog ── */
.ebb-confirm-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
}

.ebb-confirm-dialog {
  background: #ffffff;
  border-radius: 16px;
  padding: 28px 32px 24px;
  max-width: 380px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

html[data-theme='dark'] .ebb-confirm-dialog {
  background: #1f2937;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.ebb-confirm-dialog__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 14px;
  margin-bottom: 16px;
}

.ebb-confirm-dialog__title {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px;
}

html[data-theme='dark'] .ebb-confirm-dialog__title {
  color: #f3f4f6;
}

.ebb-confirm-dialog__text {
  font-size: 13px;
  color: #6b7280;
  margin: 0 0 24px;
  line-height: 1.5;
}

.ebb-confirm-dialog__actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.ebb-confirm-dialog__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 38px;
  padding: 0 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.15s ease;
}

.ebb-confirm-dialog__btn--cancel {
  background: #f3f4f6;
  color: #374151;
}

html[data-theme='dark'] .ebb-confirm-dialog__btn--cancel {
  background: #374151;
  color: #d1d5db;
}

.ebb-confirm-dialog__btn--cancel:hover {
  background: #e5e7eb;
}

html[data-theme='dark'] .ebb-confirm-dialog__btn--cancel:hover {
  background: #4b5563;
}

.ebb-confirm-dialog__btn--confirm {
  background: var(--ee-primary);
  color: #ffffff;
}

.ebb-confirm-dialog__btn--confirm:hover {
  background: #019193;
}

/* Transition */
.ebb-confirm-fade-enter-active,
.ebb-confirm-fade-leave-active {
  transition: opacity 0.2s ease;
}

.ebb-confirm-fade-enter-active .ebb-confirm-dialog,
.ebb-confirm-fade-leave-active .ebb-confirm-dialog {
  transition: transform 0.2s ease;
}

.ebb-confirm-fade-enter-from,
.ebb-confirm-fade-leave-to {
  opacity: 0;
}

.ebb-confirm-fade-enter-from .ebb-confirm-dialog {
  transform: scale(0.95);
}

.ebb-confirm-fade-leave-to .ebb-confirm-dialog {
  transform: scale(0.95);
}
</style>
