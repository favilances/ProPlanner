<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12 relative transition-colors duration-300" :class="currentTheme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'">
    <!-- Language and Theme Switcher -->
    <div class="absolute top-4 right-4 flex gap-2">
      <!-- Language Selector -->
      <div class="relative group">
        <button
          class="p-2 backdrop-blur-sm rounded-lg shadow-md transition-all duration-200 flex items-center gap-2"
          :class="currentTheme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white/80 hover:bg-white'"
        >
          <LanguageIcon class="w-5 h-5" :class="currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'" />
          <span class="text-sm font-medium" :class="currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'">{{ getCurrentLanguageName() }}</span>
        </button>
        <div 
          class="absolute right-0 mt-2 w-40 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10"
          :class="currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'"
        >
          <button
            v-for="lang in languages"
            :key="lang.code"
            @click="changeLanguage(lang.code)"
            class="w-full px-4 py-2 text-left text-sm first:rounded-t-lg last:rounded-b-lg transition-colors"
            :class="[
              currentLocale === lang.code 
                ? (currentTheme === 'dark' ? 'bg-gray-700 text-primary-400 font-semibold' : 'bg-primary-50 text-primary-600 font-semibold')
                : (currentTheme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-100')
            ]"
          >
            {{ lang.name }}
          </button>
        </div>
      </div>

      <!-- Theme Selector -->
      <div class="relative group">
        <button
          class="p-2 backdrop-blur-sm rounded-lg shadow-md transition-all duration-200 flex items-center gap-2"
          :class="currentTheme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white/80 hover:bg-white'"
        >
          <component :is="currentTheme === 'dark' ? MoonIcon : SunIcon" class="w-5 h-5" :class="currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'" />
        </button>
        <div 
          class="absolute right-0 mt-2 w-40 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10"
          :class="currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'"
        >
          <button
            @click="changeTheme('light')"
            class="w-full px-4 py-2 text-left text-sm first:rounded-t-lg transition-colors flex items-center gap-2"
            :class="[
              currentTheme === 'light'
                ? (currentTheme === 'dark' ? 'bg-gray-700 text-primary-400 font-semibold' : 'bg-primary-50 text-primary-600 font-semibold')
                : (currentTheme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-100')
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
                ? 'bg-gray-700 text-primary-400 font-semibold'
                : 'hover:bg-gray-100'
            ]"
          >
            <MoonIcon class="w-4 h-4" />
            {{ t('dark') }}
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-4xl w-full text-center">
      <!-- Animated Logo/Icon -->
      <div class="mb-8 animate-fade-in">
        <div 
          class="inline-flex items-center justify-center w-24 h-24 rounded-3xl shadow-2xl mb-6 animate-pulse bg-gradient-to-br from-primary-500 to-purple-600"
        >
          <CalendarIcon class="w-14 h-14 text-white" />
        </div>
      </div>

      <!-- Main Heading -->
      <h1 class="text-5xl md:text-6xl font-bold mb-4 animate-slide-up" :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-900'">
        {{ t('welcomeTitle') }} <span 
          class="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-purple-600"
        >{{ t('appName') }}</span>
      </h1>

      <!-- Tagline -->
      <p class="text-xl md:text-2xl mb-12 animate-slide-up" :class="currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'" style="animation-delay: 0.1s;">
        {{ t('tagline') }}
      </p>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-3 gap-6 mb-12 animate-slide-up" style="animation-delay: 0.2s;">
        <div class="backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300" :class="currentTheme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'">
          <PlusCircleIcon 
            class="w-10 h-10 mx-auto mb-3 text-primary-500"
          />
          <h3 class="font-semibold mb-2" :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-800'">{{ t('createEvents') }}</h3>
          <p class="text-sm" :class="currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'">{{ t('createEventsDesc') }}</p>
        </div>

        <div class="backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300" :class="currentTheme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'">
          <PencilIcon 
            class="w-10 h-10 mx-auto mb-3 text-purple-500"
          />
          <h3 class="font-semibold mb-2" :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-800'">{{ t('editFreely') }}</h3>
          <p class="text-sm" :class="currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'">{{ t('editFreelyDesc') }}</p>
        </div>

        <div class="backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300" :class="currentTheme === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'">
          <ArrowDownTrayIcon 
            class="w-10 h-10 mx-auto mb-3 text-green-500"
          />
          <h3 class="font-semibold mb-2" :class="currentTheme === 'dark' ? 'text-white' : 'text-gray-800'">{{ t('exportShare') }}</h3>
          <p class="text-sm" :class="currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'">{{ t('exportShareDesc') }}</p>
        </div>
      </div>

      <!-- CTA Button -->
      <div class="animate-slide-up" style="animation-delay: 0.3s;">
        <button
          @click="goToApp"
          class="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary-600 to-purple-600"
        >
          <span class="mr-2">{{ t('startEditing') }}</span>
          <ArrowRightIcon class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

      <!-- Additional Info -->
      <div class="mt-12 text-sm animate-fade-in" :class="currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'" style="animation-delay: 0.4s;">
        <p class="flex items-center justify-center gap-2">
          <ShieldCheckIcon 
            class="w-5 h-5 text-green-500"
          />
          {{ t('privacyNote') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  CalendarIcon,
  PlusCircleIcon,
  PencilIcon,
  ArrowDownTrayIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  LanguageIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/vue/24/outline'
import { t, i18n, setLocale, setTheme } from '../i18n'

const router = useRouter()

const languages = [
  { code: 'en', name: 'English' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'es', name: 'Español' }
]

const currentLocale = computed(() => i18n.locale)
const currentTheme = computed(() => i18n.theme)

const getCurrentLanguageName = () => {
  const lang = languages.find(l => l.code === i18n.locale)
  return lang ? lang.name : 'English'
}

const changeLanguage = (locale) => {
  setLocale(locale)
}

const changeTheme = (theme) => {
  setTheme(theme)
}

const goToApp = () => {
  router.push('/app')
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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

.animate-fade-in {
  animation: fadeIn 1s ease-in;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out;
}
</style>
