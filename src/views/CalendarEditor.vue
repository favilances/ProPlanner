<template>
  <div 
    class="min-h-screen py-8 px-4 transition-colors duration-300"
    :class="isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div 
        class="rounded-2xl shadow-lg p-6 mb-6 transition-colors duration-300"
        :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
      >
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div class="flex items-center gap-3">
            <button
              @click="goToHome"
              class="p-2 rounded-lg transition-colors duration-200"
              :class="isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'"
              :title="t('backToHome')"
            >
              <ArrowLeftIcon class="w-6 h-6" :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'" />
            </button>
            <div>
              <h1 class="text-2xl md:text-3xl font-bold" :class="isDarkMode ? 'text-white' : 'text-gray-900'">{{ t('calendarEditor') }}</h1>
              <p class="text-sm mt-1" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">{{ t('calendarEditorDesc') }}</p>
            </div>
          </div>

          <div class="flex flex-wrap gap-3">
            <!-- Language Selector -->
            <div class="relative group">
              <button
                class="p-2 rounded-lg transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'"
              >
                <LanguageIcon class="w-5 h-5" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
              </button>
              <div 
                class="absolute right-0 mt-2 w-40 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
              >
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  @click="changeLanguage(lang.code)"
                  class="w-full px-4 py-2 text-left text-sm first:rounded-t-lg last:rounded-b-lg transition-colors"
                  :class="[
                    currentLocale === lang.code 
                      ? (isDarkMode ? 'bg-gray-700 text-primary-400 font-semibold' : 'bg-primary-50 text-primary-600 font-semibold')
                      : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-100')
                  ]"
                >
                  {{ lang.name }}
                </button>
              </div>
            </div>

            <!-- Theme Selector -->
            <div class="relative group">
              <button
                class="p-2 rounded-lg transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'"
              >
                <component :is="isDarkMode ? MoonIcon : SunIcon" class="w-5 h-5" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" />
              </button>
              <div 
                class="absolute right-0 mt-2 w-40 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
              >
                <button
                  @click="changeTheme('light')"
                  class="w-full px-4 py-2 text-left text-sm first:rounded-t-lg transition-colors flex items-center gap-2"
                  :class="[
                    currentTheme === 'light'
                      ? (isDarkMode ? 'bg-gray-700 text-primary-400 font-semibold' : 'bg-primary-50 text-primary-600 font-semibold')
                      : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-100')
                  ]"
                >
                  <SunIcon class="w-4 h-4" />
                  {{ t('light') }}
                </button>
                <button
                  @click="changeTheme('dark')"
                  class="w-full px-4 py-2 text-left text-sm last:rounded-b-lg transition-colors flex items-center gap-2"
                  :class="[
                    currentTheme === 'dark'
                      ? (isDarkMode ? 'bg-gray-700 text-primary-400 font-semibold' : 'bg-primary-50 text-primary-600 font-semibold')
                      : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-100')
                  ]"
                >
                  <MoonIcon class="w-4 h-4" />
                  {{ t('dark') }}
                </button>
              </div>
            </div>

            <button
              @click="showAddEventModal = true"
              class="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors duration-200 shadow-sm bg-primary-600 hover:bg-primary-700"
            >
              <PlusIcon class="w-5 h-5" />
              <span>{{ t('addEvent') }}</span>
            </button>

            <button
              @click="showCalendarDesigns = true"
              class="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors duration-200 shadow-sm"
              :class="isDarkMode ? 'bg-purple-700 hover:bg-purple-800' : 'bg-purple-600 hover:bg-purple-700'"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
              </svg>
              <span>{{ t('calendarDesigns') }}</span>
            </button>

            <div class="relative group">
              <button
                class="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors duration-200 shadow-sm"
                :class="isDarkMode ? 'bg-green-700 hover:bg-green-800' : 'bg-green-600 hover:bg-green-700'"
              >
                <ArrowDownTrayIcon class="w-5 h-5" />
                <span>{{ t('exportCalendar') }}</span>
              </button>
              <div 
                class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10"
                :class="isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'"
              >
                <button
                  @click="exportCalendar"
                  class="w-full px-4 py-2 text-left text-sm first:rounded-t-lg transition-colors flex items-center gap-2"
                  :class="isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'"
                >
                  <CalendarIcon class="w-4 h-4" />
                  {{ t('exportAsICS') }}
                </button>
                <button
                  @click="exportAsPDF"
                  class="w-full px-4 py-2 text-left text-sm transition-colors flex items-center gap-2"
                  :class="isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  {{ t('exportAsPDF') }}
                </button>
                <button
                  @click="exportAsJPG"
                  class="w-full px-4 py-2 text-left text-sm last:rounded-b-lg transition-colors flex items-center gap-2"
                  :class="isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {{ t('exportAsJPG') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Event Count -->
        <div class="mt-4 flex items-center gap-4 text-sm" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">
          <span class="flex items-center gap-1">
            <CalendarIcon class="w-4 h-4" />
            {{ events.length }} {{ events.length !== 1 ? t('eventCountPlural') : t('eventCount') }}
          </span>
        </div>
      </div>

      <!-- Calendar -->
      <div 
        id="calendar-container"
        class="rounded-2xl shadow-2xl p-8 transition-colors duration-300 border calendar-theme" 
        :class="[
          isDarkMode ? 'bg-gray-800 dark-mode border-gray-700' : 'bg-white border-gray-200',
          { 'dark-mode': isDarkMode },
          currentDesign.containerClass
        ]"
        :style="currentDesign.containerStyle"
      >
        <FullCalendar :options="calendarOptions" ref="fullCalendar" />
      </div>
    </div>

    <!-- Add/Edit Event Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showAddEventModal || editingEvent" class="modal-backdrop" @click.self="closeModal">
          <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              class="rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slide-up transition-colors duration-300" 
              :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
              @click.stop
            >
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
                  {{ editingEvent ? t('editEvent') : t('addNewEvent') }}
                </h2>
                <button
                  @click="closeModal"
                  class="p-2 rounded-lg transition-colors duration-200"
                  :class="isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'"
                >
                  <XMarkIcon class="w-6 h-6" :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'" />
                </button>
              </div>

              <form @submit.prevent="saveEvent" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">{{ t('eventTitle') }} *</label>
                  <input
                    v-model="eventForm.title"
                    type="text"
                    required
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    :class="isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'"
                    :placeholder="t('eventTitlePlaceholder')"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">{{ t('description') }}</label>
                  <textarea
                    v-model="eventForm.description"
                    rows="3"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                    :class="isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'"
                    :placeholder="t('descriptionPlaceholder')"
                  ></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">{{ t('startDate') }} *</label>
                    <input
                      v-model="eventForm.start"
                      type="datetime-local"
                      required
                      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                      :class="isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">{{ t('endDate') }} *</label>
                    <input
                      v-model="eventForm.end"
                      type="datetime-local"
                      required
                      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                      :class="isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">{{ t('startTime') }}</label>
                    <select
                      v-model="eventForm.startTime"
                      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                      :class="isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'"
                    >
                      <option value="">{{ t('selectTime') }}</option>
                      <option v-for="time in timeOptions" :key="time.value" :value="time.value">
                        {{ time.label }}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">{{ t('endTime') }}</label>
                    <select
                      v-model="eventForm.endTime"
                      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                      :class="isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'"
                    >
                      <option value="">{{ t('selectTime') }}</option>
                      <option v-for="time in timeOptions" :key="time.value" :value="time.value">
                        {{ time.label }}
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-2" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">{{ t('color') }}</label>
                  <div class="flex gap-2">
                    <button
                      v-for="color in colorOptions"
                      :key="color"
                      type="button"
                      @click="eventForm.color = color"
                      class="w-10 h-10 rounded-lg border-2 transition-all duration-200"
                      :class="eventForm.color === color ? 'border-gray-800 scale-110' : 'border-gray-200'"
                      :style="{ backgroundColor: color }"
                    ></button>
                  </div>
                </div>

                <div class="flex gap-3 pt-4">
                  <button
                    v-if="editingEvent"
                    @click.prevent="deleteEvent"
                    type="button"
                    class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                  >
                    {{ t('delete') }}
                  </button>
                  <button
                    type="button"
                    @click="closeModal"
                    class="flex-1 px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                    :class="isDarkMode 
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'"
                  >
                    {{ t('cancel') }}
                  </button>
                  <button
                    type="submit"
                    class="flex-1 px-4 py-2 text-white rounded-lg transition-colors duration-200 font-medium bg-primary-600 hover:bg-primary-700"
                  >
                    {{ editingEvent ? t('update') : t('add') }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Calendar Designs Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showCalendarDesigns" class="modal-backdrop" @click.self="closeDesignModal">
          <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              class="rounded-2xl shadow-2xl max-w-4xl w-full p-6 animate-slide-up transition-colors duration-300 max-h-[90vh] overflow-y-auto" 
              :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
              @click.stop
            >
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
                  {{ t('selectCalendarDesign') }}
                </h2>
                <button
                  @click="closeDesignModal"
                  class="p-2 rounded-lg transition-colors duration-200"
                  :class="isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'"
                >
                  <XMarkIcon class="w-6 h-6" :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'" />
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  v-for="design in calendarDesigns"
                  :key="design.id"
                  @click="selectDesign(design)"
                  class="border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:scale-105"
                  :class="[
                    selectedDesign === design.id 
                      ? 'border-primary-500 bg-primary-50 shadow-lg' 
                      : (isDarkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'),
                    isDarkMode && selectedDesign !== design.id ? 'bg-gray-700' : ''
                  ]"
                >
                  <div class="text-center">
                    <div class="text-4xl mb-3">{{ design.icon }}</div>
                    <h3 class="font-semibold text-lg mb-2" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
                      {{ t(design.name) }}
                    </h3>
                    <p class="text-sm" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">
                      {{ t(design.description) }}
                    </p>
                    <div class="mt-3 h-20 rounded-lg flex items-center justify-center text-xs"
                         :class="design.previewClass"
                         :style="design.previewStyle">
                      {{ t('preview') }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex gap-3 pt-6 border-t mt-6" :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'">
                <button
                  type="button"
                  @click="closeDesignModal"
                  class="flex-1 px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
                  :class="isDarkMode 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'"
                >
                  {{ t('cancel') }}
                </button>
                <button
                  @click="applyDesign"
                  class="flex-1 px-4 py-2 text-white rounded-lg transition-colors duration-200 font-medium bg-primary-600 hover:bg-primary-700"
                >
                  {{ t('applyDesign') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Export Success Toast RA -->
    <Transition name="toast">
      <div
        v-if="showExportToast"
        class="fixed bottom-8 right-8 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50 bg-green-600 text-white"
      >
        <CheckCircleIcon class="w-6 h-6" />
        <span class="font-medium">{{ t('exportSuccess') }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import trLocale from '@fullcalendar/core/locales/tr'
import esLocale from '@fullcalendar/core/locales/es'
import { createEvents } from 'ics'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import {
  CalendarIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  XMarkIcon,
  CheckCircleIcon,
  MoonIcon,
  SunIcon,
  LanguageIcon
} from '@heroicons/vue/24/outline'
import { t, i18n, setLocale, setTheme } from '../i18n'

const router = useRouter()

// Language options
const languages = [
  { code: 'en', name: 'English' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'es', name: 'Español' }
]

// State
const events = ref([])
const showAddEventModal = ref(false)
const editingEvent = ref(null)
const showExportToast = ref(false)
const showCalendarDesigns = ref(false)
const selectedDesign = ref('classic')
const fullCalendar = ref(null)

const currentLocale = computed(() => i18n.locale)
const currentTheme = computed(() => i18n.theme)
const isDarkMode = computed(() => currentTheme.value === 'dark')

const eventForm = reactive({
  title: '',
  description: '',
  start: '',
  end: '',
  startTime: '',
  endTime: '',
  color: '#3b82f6'
})

// Time options for hour selection
const timeOptions = [
  { value: '00:00', label: '00:00' },
  { value: '01:00', label: '01:00' },
  { value: '02:00', label: '02:00' },
  { value: '03:00', label: '03:00' },
  { value: '04:00', label: '04:00' },
  { value: '05:00', label: '05:00' },
  { value: '06:00', label: '06:00' },
  { value: '07:00', label: '07:00' },
  { value: '08:00', label: '08:00' },
  { value: '09:00', label: '09:00' },
  { value: '10:00', label: '10:00' },
  { value: '11:00', label: '11:00' },
  { value: '12:00', label: '12:00' },
  { value: '13:00', label: '13:00' },
  { value: '14:00', label: '14:00' },
  { value: '15:00', label: '15:00' },
  { value: '16:00', label: '16:00' },
  { value: '17:00', label: '17:00' },
  { value: '18:00', label: '18:00' },
  { value: '19:00', label: '19:00' },
  { value: '20:00', label: '20:00' },
  { value: '21:00', label: '21:00' },
  { value: '22:00', label: '22:00' },
  { value: '23:00', label: '23:00' },
  { value: '23:59', label: '23:59' }
]

const colorOptions = [
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#f59e0b', // amber
  '#10b981', // green
  '#ef4444', // red
  '#06b6d4', // cyan
  '#6366f1', // indigo
]

// Calendar designs
const calendarDesigns = [
  {
    id: 'classic',
    name: 'classicDesign',
    description: 'classicDesignDesc',
    icon: '📅',
    containerClass: 'classic-design',
    containerStyle: {},
    previewClass: 'bg-white border border-gray-200 text-gray-600',
    previewStyle: {}
  },
  {
    id: 'elegant',
    name: 'elegantDesign',
    description: 'elegantDesignDesc',
    icon: '✨',
    containerClass: 'elegant-design',
    containerStyle: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    },
    previewClass: 'text-white',
    previewStyle: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }
  },
  {
    id: 'nature',
    name: 'natureDesign',
    description: 'natureDesignDesc',
    icon: '🌿',
    containerClass: 'nature-design',
    containerStyle: {
      background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
      borderRadius: '20px'
    },
    previewClass: 'text-green-800',
    previewStyle: {
      background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)'
    }
  },
  {
    id: 'modern',
    name: 'modernDesign',
    description: 'modernDesignDesc',
    icon: '🔥',
    containerClass: 'modern-design',
    containerStyle: {
      background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
      boxShadow: '0 20px 40px rgba(255, 107, 107, 0.3)'
    },
    previewClass: 'text-white',
    previewStyle: {
      background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)'
    }
  },
  {
    id: 'minimal',
    name: 'minimalDesign',
    description: 'minimalDesignDesc',
    icon: '⚪',
    containerClass: 'minimal-design',
    containerStyle: {
      background: '#f8f9fa',
      border: '1px solid #e9ecef',
      boxShadow: 'none'
    },
    previewClass: 'bg-gray-50 border border-gray-200 text-gray-500',
    previewStyle: {}
  }
]

const currentDesign = computed(() => {
  return calendarDesigns.find(d => d.id === selectedDesign.value) || calendarDesigns[0]
})

// Calendar options
const calendarOptions = computed(() => {
  const locales = {
    en: undefined, // English is default
    tr: trLocale,
    es: esLocale
  }
  
  return {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: locales[currentLocale.value],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    buttonText: {
      today: t('today'),
      month: t('month'),
      week: t('week'),
      day: t('day')
    },
    events: events.value,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: false,
    weekends: true,
    select: handleDateSelect,
    eventClick: handleEventClick,
    eventDrop: handleEventDrop,
    eventResize: handleEventResize,
    height: 'auto',
    firstDay: 1,
    slotMinTime: '06:00:00',
    slotMaxTime: '23:00:00',
    allDaySlot: true,
    navLinks: true,
    nowIndicator: true,
    eventMaxStack: false,
    moreLinkClick: 'popover',
    dayGridDayMaxEventRows: false,
    dayCellContent: function(info) {
      return { html: info.dayNumberText }
    },
    eventContent: function(info) {
      const time = info.event.start ? 
        info.event.start.toLocaleTimeString('tr-TR', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }) : ''
      
      return {
        html: `
          <div class="fc-event-main-frame">
            <div class="fc-event-time">${time}</div>
            <div class="fc-event-title-container">
              <div class="fc-event-title fc-sticky">${info.event.title || ''}</div>
            </div>
          </div>
        `
      }
    }
  }
})

// Methods
const goToHome = () => {
  router.push('/')
}

const changeLanguage = (locale) => {
  setLocale(locale)
}

const changeTheme = (theme) => {
  setTheme(theme)
}

const handleDateSelect = (selectInfo) => {
  const startDate = new Date(selectInfo.start)
  const endDate = new Date(selectInfo.end)
  
  eventForm.start = formatDateTimeLocal(startDate)
  eventForm.end = formatDateTimeLocal(endDate)
  eventForm.title = ''
  eventForm.description = ''
  eventForm.color = '#3b82f6'
  
  showAddEventModal.value = true
}

const handleEventClick = (clickInfo) => {
  const event = clickInfo.event
  editingEvent.value = event
  
  eventForm.title = event.title
  eventForm.description = event.extendedProps.description || ''
  eventForm.start = formatDateTimeLocal(event.start)
  eventForm.end = formatDateTimeLocal(event.end || event.start)
  eventForm.color = event.backgroundColor || '#3b82f6'
}

const handleEventDrop = (info) => {
  const event = events.value.find(e => e.id === info.event.id)
  if (event) {
    event.start = info.event.start.toISOString()
    event.end = info.event.end ? info.event.end.toISOString() : info.event.start.toISOString()
  }
}

const handleEventResize = (info) => {
  const event = events.value.find(e => e.id === info.event.id)
  if (event) {
    event.start = info.event.start.toISOString()
    event.end = info.event.end ? info.event.end.toISOString() : info.event.start.toISOString()
  }
}

const saveEvent = () => {
  let startDate = new Date(eventForm.start)
  let endDate = new Date(eventForm.end)

  // Saat seçimi varsa, tarihle birleştir
  if (eventForm.startTime) {
    const [hours, minutes] = eventForm.startTime.split(':')
    startDate.setHours(parseInt(hours), parseInt(minutes), 0, 0)
  }

  if (eventForm.endTime) {
    const [hours, minutes] = eventForm.endTime.split(':')
    endDate.setHours(parseInt(hours), parseInt(minutes), 0, 0)
  }

  if (endDate < startDate) {
    alert(t('endDateError'))
    return
  }

  if (editingEvent.value) {
    // Update existing event
    const event = events.value.find(e => e.id === editingEvent.value.id)
    if (event) {
      event.title = eventForm.title
      event.start = startDate.toISOString()
      event.end = endDate.toISOString()
      event.backgroundColor = eventForm.color
      event.borderColor = eventForm.color
      event.description = eventForm.description
    }
    editingEvent.value.remove()
    events.value = [...events.value]
  } else {
    // Add new event
    const newEvent = {
      id: Date.now().toString(),
      title: eventForm.title,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      backgroundColor: eventForm.color,
      borderColor: eventForm.color,
      description: eventForm.description
    }
    events.value.push(newEvent)
  }

  closeModal()
}

const deleteEvent = () => {
  if (confirm(t('confirmDelete'))) {
    events.value = events.value.filter(e => e.id !== editingEvent.value.id)
    editingEvent.value.remove()
    closeModal()
  }
}

const closeModal = () => {
  showAddEventModal.value = false
  editingEvent.value = null
  eventForm.title = ''
  eventForm.description = ''
  eventForm.start = ''
  eventForm.end = ''
  eventForm.color = '#3b82f6'
}

const exportCalendar = () => {
  if (events.value.length === 0) {
    alert(t('noEventsToExport'))
    return
  }

  const icsEvents = events.value.map(event => {
    const start = new Date(event.start)
    const end = new Date(event.end)

    return {
      start: [start.getFullYear(), start.getMonth() + 1, start.getDate(), start.getHours(), start.getMinutes()],
      end: [end.getFullYear(), end.getMonth() + 1, end.getDate(), end.getHours(), end.getMinutes()],
      title: event.title,
      description: event.description || '',
      status: 'CONFIRMED',
      busyStatus: 'BUSY',
    }
  })

  createEvents(icsEvents, (error, value) => {
    if (error) {
      console.error('Error creating ICS file:', error)
      alert('Error exporting calendar. Please try again.')
      return
    }

    // Create download link
    const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `proplanner-calendar-${Date.now()}.ics`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Show success toast
    showExportToast.value = true
    setTimeout(() => {
      showExportToast.value = false
    }, 3000)
  })
}

const exportAsPDF = async () => {
  try {
    const calendarElement = document.getElementById('calendar-container')
    if (!calendarElement) {
      alert('Takvim bulunamadı')
      return
    }

    // Sayfa scroll pozisyonunu kaydet
    const originalScrollTop = window.pageYOffset
    const originalScrollLeft = window.pageXOffset

    // En üste scroll et
    window.scrollTo(0, 0)

    // Kısa bir bekleme
    await new Promise(resolve => setTimeout(resolve, 300))

    // Canvas oluştur - HİÇ STYLE DEĞİŞİKLİĞİ YAPMADAN
    const canvas = await html2canvas(calendarElement, {
      scale: 1,
      useCORS: true,
      allowTaint: true,
      backgroundColor: window.getComputedStyle(calendarElement).backgroundColor || '#ffffff',
      logging: false,
      width: calendarElement.offsetWidth,
      height: calendarElement.offsetHeight,
      x: 0,
      y: 0
    })

    // Orijinal scroll pozisyonuna geri dön
    window.scrollTo(originalScrollLeft, originalScrollTop)

    // PDF oluştur
    const imgData = canvas.toDataURL('image/png', 1.0)
    
    // A4 formatında PDF
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    
    const imgWidth = pdfWidth
    const imgHeight = (canvas.height * pdfWidth) / canvas.width

    if (imgHeight <= pdfHeight) {
      // Tek sayfaya sığıyor
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
    } else {
      // Birden fazla sayfa gerekiyor
      let remainingHeight = imgHeight
      let position = 0
      
      while (remainingHeight > 0) {
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        remainingHeight -= pdfHeight
        position -= pdfHeight
        
        if (remainingHeight > 0) {
          pdf.addPage()
        }
      }
    }

    pdf.save(`proplanner-takvim-${new Date().toLocaleDateString('tr-TR')}.pdf`)

    showExportToast.value = true
    setTimeout(() => {
      showExportToast.value = false
    }, 3000)

  } catch (error) {
    console.error('PDF dışa aktarma hatası:', error)
    alert('PDF dışa aktarma hatası. Lütfen tekrar deneyin.')
  }
}

const exportAsJPG = async () => {
  try {
    const calendarElement = document.getElementById('calendar-container')
    if (!calendarElement) {
      alert('Takvim bulunamadı')
      return
    }

    // Sayfa scroll pozisyonunu kaydet
    const originalScrollTop = window.pageYOffset
    const originalScrollLeft = window.pageXOffset

    // En üste scroll et
    window.scrollTo(0, 0)

    // Kısa bir bekleme
    await new Promise(resolve => setTimeout(resolve, 300))

    // Canvas oluştur - HİÇ STYLE DEĞİŞİKLİĞİ YAPMADAN
    const canvas = await html2canvas(calendarElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: window.getComputedStyle(calendarElement).backgroundColor || '#ffffff',
      logging: false,
      width: calendarElement.offsetWidth,
      height: calendarElement.offsetHeight,
      x: 0,
      y: 0
    })

    // Orijinal scroll pozisyonuna geri dön
    window.scrollTo(originalScrollLeft, originalScrollTop)

    // JPG olarak indir
    canvas.toBlob((blob) => {
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `proplanner-takvim-${new Date().toLocaleDateString('tr-TR')}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)

      showExportToast.value = true
      setTimeout(() => {
        showExportToast.value = false
      }, 3000)
    }, 'image/jpeg', 0.9)

  } catch (error) {
    console.error('JPG dışa aktarma hatası:', error)
    alert('JPG dışa aktarma hatası. Lütfen tekrar deneyin.')
  }
}

const closeDesignModal = () => {
  showCalendarDesigns.value = false
}

const selectDesign = (design) => {
  selectedDesign.value = design.id
}

const applyDesign = () => {
  closeDesignModal()
  // Force calendar re-render with new design
  setTimeout(() => {
    if (fullCalendar.value) {
      fullCalendar.value.getApi().render()
    }
  }, 100)
}

const formatDateTimeLocal = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

/* Calendar Design Styles */
.calendar-theme.classic-design .fc {
  font-family: 'Georgia', serif;
}

.calendar-theme.classic-design .fc-toolbar-title {
  font-weight: 600;
  font-size: 1.5em;
}

.calendar-theme.elegant-design .fc {
  color: white;
}

.calendar-theme.elegant-design .fc-toolbar-title {
  color: white;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.calendar-theme.elegant-design .fc-button {
  background: rgba(255,255,255,0.2) !important;
  border: 1px solid rgba(255,255,255,0.3) !important;
  color: white !important;
}

.calendar-theme.elegant-design .fc-button:hover {
  background: rgba(255,255,255,0.3) !important;
}

.calendar-theme.elegant-design .fc-daygrid-day {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.2);
}

.calendar-theme.nature-design .fc-toolbar-title {
  color: #065f46;
  font-weight: 700;
}

.calendar-theme.nature-design .fc-button {
  background: #059669 !important;
  border-color: #059669 !important;
}

.calendar-theme.nature-design .fc-button:hover {
  background: #047857 !important;
}

.calendar-theme.nature-design .fc-daygrid-day {
  background: rgba(255,255,255,0.8);
  border-color: rgba(16, 185, 129, 0.2);
}

.calendar-theme.modern-design .fc-toolbar-title {
  color: white;
  font-weight: 800;
  text-shadow: 0 2px 4px rgba(0,0,0,0.4);
}

.calendar-theme.modern-design .fc-button {
  background: rgba(255,255,255,0.2) !important;
  border: 1px solid rgba(255,255,255,0.4) !important;
  color: white !important;
  font-weight: 600;
}

.calendar-theme.modern-design .fc-button:hover {
  background: rgba(255,255,255,0.3) !important;
}

.calendar-theme.modern-design .fc-daygrid-day {
  background: rgba(255,255,255,0.9);
  border-color: rgba(255,255,255,0.3);
}

.calendar-theme.minimal-design .fc {
  font-family: 'Inter', sans-serif;
}

.calendar-theme.minimal-design .fc-toolbar-title {
  color: #374151;
  font-weight: 400;
  font-size: 1.3em;
}

.calendar-theme.minimal-design .fc-button {
  background: #f9fafb !important;
  border: 1px solid #d1d5db !important;
  color: #374151 !important;
  box-shadow: none !important;
}

.calendar-theme.minimal-design .fc-button:hover {
  background: #f3f4f6 !important;
}

.calendar-theme.minimal-design .fc-daygrid-day {
  border-color: #e5e7eb;
}

/* Export-safe styles - no gradients */
.calendar-theme.export-mode {
  background: none !important;
}

.calendar-theme.export-mode.classic-design {
  background-color: #ffffff !important;
}

.calendar-theme.export-mode.elegant-design {
  background-color: #667eea !important;
  color: white !important;
}

.calendar-theme.export-mode.nature-design {
  background-color: #84fab0 !important;
  color: #065f46 !important;
}

.calendar-theme.export-mode.modern-design {
  background-color: #ff6b6b !important;
  color: white !important;
}

.calendar-theme.export-mode.minimal-design {
  background-color: #f8f9fa !important;
  color: #374151 !important;
}

/* Export için daha okunaklı stiller */
@media print, screen {
  .calendar-theme .fc-toolbar-title {
    font-size: 2.5em !important;
    font-weight: 700 !important;
    text-align: center !important;
    margin: 20px 0 !important;
    letter-spacing: 1px !important;
  }

  .calendar-theme .fc-col-header-cell {
    font-size: 1.1em !important;
    font-weight: 600 !important;
    padding: 15px 5px !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
  }

  .calendar-theme .fc-daygrid-day-number {
    font-size: 1.2em !important;
    font-weight: 600 !important;
    padding: 8px !important;
  }

  .calendar-theme .fc-daygrid-day {
    min-height: 140px !important;
    border: 1px solid rgba(255,255,255,0.2) !important;
  }

  .calendar-theme .fc-daygrid-day-events {
    min-height: 120px !important;
  }

  .calendar-theme .fc-event {
    font-size: 11px !important;
    padding: 2px 4px !important;
    margin: 1px 0 !important;
    border-radius: 3px !important;
    line-height: 1.2 !important;
  }

  .calendar-theme .fc-event-title {
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }

  /* Export sırasında toolbar butonlarını gizle */
  .calendar-theme .fc-toolbar-chunk:not(:nth-child(2)) {
    visibility: hidden !important;
  }

  .calendar-theme .fc-button-group,
  .calendar-theme .fc-button {
    display: none !important;
  }

  /* Sadece başlığı göster */
  .calendar-theme .fc-toolbar {
    justify-content: center !important;
    margin-bottom: 30px !important;
  }

  .calendar-theme .fc-toolbar-title {
    display: block !important;
    width: 100% !important;
    text-align: center !important;
  }
}

/* Daha iyi okunabilirlik için font iyileştirmeleri */
.calendar-theme .fc {
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
}

.calendar-theme.classic-design .fc-toolbar-title {
  color: #1f2937 !important;
  text-shadow: none !important;
}

.calendar-theme.classic-design .fc-col-header-cell {
  background-color: #f8fafc !important;
  color: #374151 !important;
  border-bottom: 2px solid #e5e7eb !important;
}

.calendar-theme.elegant-design .fc-col-header-cell {
  background-color: rgba(255,255,255,0.1) !important;
  color: white !important;
  border-bottom: 2px solid rgba(255,255,255,0.3) !important;
}

.calendar-theme.nature-design .fc-col-header-cell {
  background-color: rgba(16, 185, 129, 0.1) !important;
  color: #065f46 !important;
  border-bottom: 2px solid #10b981 !important;
}

.calendar-theme.modern-design .fc-col-header-cell {
  background-color: rgba(255,255,255,0.1) !important;
  color: white !important;
  border-bottom: 2px solid rgba(255,255,255,0.3) !important;
}

.calendar-theme.minimal-design .fc-col-header-cell {
  background-color: #f9fafb !important;
  color: #6b7280 !important;
  border-bottom: 1px solid #d1d5db !important;
}

/* Modal backdrop */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 50;
}
</style>
