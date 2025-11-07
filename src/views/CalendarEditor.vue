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
              @click="exportCalendar"
              class="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors duration-200 shadow-sm"
              :class="isDarkMode ? 'bg-green-700 hover:bg-green-800' : 'bg-green-600 hover:bg-green-700'"
            >
              <ArrowDownTrayIcon class="w-5 h-5" />
              <span>{{ t('exportCalendar') }}</span>
            </button>
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
        class="rounded-2xl shadow-2xl p-8 transition-colors duration-300 border" 
        :class="[
          isDarkMode ? 'bg-gray-800 dark-mode border-gray-700' : 'bg-white border-gray-200',
          { 'dark-mode': isDarkMode }
        ]"
      >
        <FullCalendar :options="calendarOptions" />
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

                <div class="grid grid-cols-2 gap-4">
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

const currentLocale = computed(() => i18n.locale)
const currentTheme = computed(() => i18n.theme)
const isDarkMode = computed(() => currentTheme.value === 'dark')

const eventForm = reactive({
  title: '',
  description: '',
  start: '',
  end: '',
  color: '#3b82f6'
})

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
    dayMaxEvents: true,
    weekends: true,
    select: handleDateSelect,
    eventClick: handleEventClick,
    eventDrop: handleEventDrop,
    eventResize: handleEventResize,
    height: 'auto',
    firstDay: 1, // Start week on Monday
    slotMinTime: '06:00:00',
    slotMaxTime: '23:00:00',
    allDaySlot: true,
    navLinks: true,
    nowIndicator: true,
    eventMaxStack: 3,
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
  const startDate = new Date(eventForm.start)
  const endDate = new Date(eventForm.end)

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
</style>
