import { reactive } from 'vue'

export const translations = {
  en: {
    welcomeTitle: 'Welcome to',
    appName: 'ProPlanner',
    tagline: 'Create and customize your calendar instantly',
    startEditing: 'Start Editing',
    
    createEvents: 'Create Events',
    createEventsDesc: 'Add custom events with title, description, and dates',
    editFreely: 'Edit Freely',
    editFreelyDesc: 'Modify and remove events anytime you want',
    exportShare: 'Export & Share',
    exportShareDesc: 'Download as .ics file for any calendar app',
    
    privacyNote: 'No server storage • Fully client-side • Your data stays private',
    
    calendarEditor: 'Calendar Editor',
    calendarEditorDesc: 'Create and manage your events',
    addEvent: 'Add Event',
    exportCalendar: 'Export Calendar',
    darkMode: 'Dark mode',
    lightMode: 'Light mode',
    backToHome: 'Back to home',
    
    addNewEvent: 'Add New Event',
    editEvent: 'Edit Event',
    eventTitle: 'Event Title',
    eventTitlePlaceholder: 'Enter event title',
    description: 'Description',
    descriptionPlaceholder: 'Enter event description',
    startDate: 'Start Date',
    endDate: 'End Date',
    color: 'Color',
    delete: 'Delete',
    cancel: 'Cancel',
    add: 'Add',
    update: 'Update',
    
    eventCount: 'event',
    eventCountPlural: 'events',
    exportSuccess: 'Calendar exported successfully!',
    noEventsToExport: 'No events to export. Please add some events first.',
    confirmDelete: 'Are you sure you want to delete this event?',
    endDateError: 'End date must be after start date',
    
    language: 'Language',
    english: 'English',
    turkish: 'Turkish',
    spanish: 'Spanish',
    
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    
    today: 'Today',
    month: 'Month',
    week: 'Week',
    day: 'Day',
    
    calendarDesigns: 'Calendar Designs',
    selectCalendarDesign: 'Select Calendar Design',
    applyDesign: 'Apply Design',
    preview: 'Preview',
    
    classicDesign: 'Classic',
    classicDesignDesc: 'Traditional and timeless design',
    elegantDesign: 'Elegant',
    elegantDesignDesc: 'Sophisticated gradient design',
    natureDesign: 'Nature',
    natureDesignDesc: 'Fresh and natural colors',
    modernDesign: 'Modern',
    modernDesignDesc: 'Bold and vibrant style',
    minimalDesign: 'Minimal',
    minimalDesignDesc: 'Clean and simple layout',
    
    exportAsICS: 'Export as ICS',
    exportAsPDF: 'Export as PDF',
    exportAsJPG: 'Export as JPG',
    
    startTime: 'Start Time',
    endTime: 'End Time',
    selectTime: 'Select Time',
  },
  
  tr: {
    welcomeTitle: 'Hoş geldiniz',
    appName: 'ProPlanner',
    tagline: 'Takvimini anında oluştur ve özelleştir',
    startEditing: 'Düzenlemeye Başla',
    
    createEvents: 'Etkinlik Oluştur',
    createEventsDesc: 'Başlık, açıklama ve tarihlerle özel etkinlikler ekle',
    editFreely: 'Özgürce Düzenle',
    editFreelyDesc: 'İstediğiniz zaman etkinlikleri değiştirin ve kaldırın',
    exportShare: 'Dışa Aktar ve Paylaş',
    exportShareDesc: 'Herhangi bir takvim uygulaması için .ics dosyası olarak indir',
    
    privacyNote: 'Sunucu depolama yok • Tamamen istemci tarafı • Verileriniz gizli kalır',
    
    calendarEditor: 'Takvim Düzenleyici',
    calendarEditorDesc: 'Etkinliklerinizi oluşturun ve yönetin',
    addEvent: 'Etkinlik Ekle',
    exportCalendar: 'Takvimi Dışa Aktar',
    darkMode: 'Karanlık mod',
    lightMode: 'Aydınlık mod',
    backToHome: 'Ana sayfaya dön',
    
    addNewEvent: 'Yeni Etkinlik Ekle',
    editEvent: 'Etkinliği Düzenle',
    eventTitle: 'Etkinlik Başlığı',
    eventTitlePlaceholder: 'Etkinlik başlığını girin',
    description: 'Açıklama',
    descriptionPlaceholder: 'Etkinlik açıklamasını girin',
    startDate: 'Başlangıç Tarihi',
    endDate: 'Bitiş Tarihi',
    color: 'Renk',
    delete: 'Sil',
    cancel: 'İptal',
    add: 'Ekle',
    update: 'Güncelle',
    
    eventCount: 'etkinlik',
    eventCountPlural: 'etkinlik',
    exportSuccess: 'Takvim başarıyla dışa aktarıldı!',
    noEventsToExport: 'Dışa aktarılacak etkinlik yok. Lütfen önce birkaç etkinlik ekleyin.',
    confirmDelete: 'Bu etkinliği silmek istediğinizden emin misiniz?',
    endDateError: 'Bitiş tarihi başlangıç tarihinden sonra olmalıdır',
    
    language: 'Dil',
    english: 'İngilizce',
    turkish: 'Türkçe',
    spanish: 'İspanyolca',
    
    theme: 'Tema',
    light: 'Aydınlık',
    dark: 'Karanlık',
    
    today: 'Bugün',
    month: 'Ay',
    week: 'Hafta',
    day: 'Gün',
    
    calendarDesigns: 'Takvim Tasarımları',
    selectCalendarDesign: 'Takvim Tasarımı Seçin',
    applyDesign: 'Tasarımı Uygula',
    preview: 'Önizleme',
    
    classicDesign: 'Klasik',
    classicDesignDesc: 'Geleneksel ve zamansız tasarım',
    elegantDesign: 'Zarif',
    elegantDesignDesc: 'Sofistike gradyan tasarım',
    natureDesign: 'Doğa',
    natureDesignDesc: 'Taze ve doğal renkler',
    modernDesign: 'Modern',
    modernDesignDesc: 'Cesur ve canlı stil',
    minimalDesign: 'Minimal',
    minimalDesignDesc: 'Temiz ve basit düzen',
    
    exportAsICS: 'ICS olarak dışa aktar',
    exportAsPDF: 'PDF olarak dışa aktar',
    exportAsJPG: 'JPG olarak dışa aktar',
    
    startTime: 'Başlangıç Saati',
    endTime: 'Bitiş Saati',
    selectTime: 'Saat Seçin',
  },
  
  es: {
    welcomeTitle: 'Bienvenido a',
    appName: 'ProPlanner',
    tagline: 'Crea y personaliza tu calendario al instante',
    startEditing: 'Comenzar a Editar',
    
    createEvents: 'Crear Eventos',
    createEventsDesc: 'Añade eventos personalizados con título, descripción y fechas',
    editFreely: 'Editar Libremente',
    editFreelyDesc: 'Modifica y elimina eventos cuando quieras',
    exportShare: 'Exportar y Compartir',
    exportShareDesc: 'Descarga como archivo .ics para cualquier aplicación de calendario',
    
    privacyNote: 'Sin almacenamiento en servidor • Completamente del lado del cliente • Tus datos permanecen privados',
    
    calendarEditor: 'Editor de Calendario',
    calendarEditorDesc: 'Crea y gestiona tus eventos',
    addEvent: 'Añadir Evento',
    exportCalendar: 'Exportar Calendario',
    darkMode: 'Modo oscuro',
    lightMode: 'Modo claro',
    backToHome: 'Volver al inicio',
    
    addNewEvent: 'Añadir Nuevo Evento',
    editEvent: 'Editar Evento',
    eventTitle: 'Título del Evento',
    eventTitlePlaceholder: 'Ingresa el título del evento',
    description: 'Descripción',
    descriptionPlaceholder: 'Ingresa la descripción del evento',
    startDate: 'Fecha de Inicio',
    endDate: 'Fecha de Fin',
    color: 'Color',
    delete: 'Eliminar',
    cancel: 'Cancelar',
    add: 'Añadir',
    update: 'Actualizar',
    
    eventCount: 'evento',
    eventCountPlural: 'eventos',
    exportSuccess: '¡Calendario exportado exitosamente!',
    noEventsToExport: 'No hay eventos para exportar. Por favor añade algunos eventos primero.',
    confirmDelete: '¿Estás seguro de que quieres eliminar este evento?',
    endDateError: 'La fecha de fin debe ser posterior a la fecha de inicio',
    
    language: 'Idioma',
    english: 'Inglés',
    turkish: 'Turco',
    spanish: 'Español',
    
    theme: 'Tema',
    light: 'Claro',
    dark: 'Oscuro',
    
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    
    calendarDesigns: 'Diseños de Calendario',
    selectCalendarDesign: 'Seleccionar Diseño de Calendario',
    applyDesign: 'Aplicar Diseño',
    preview: 'Vista previa',
    
    classicDesign: 'Clásico',
    classicDesignDesc: 'Diseño tradicional y atemporal',
    elegantDesign: 'Elegante',
    elegantDesignDesc: 'Diseño sofisticado con gradientes',
    natureDesign: 'Naturaleza',
    natureDesignDesc: 'Colores frescos y naturales',
    modernDesign: 'Moderno',
    modernDesignDesc: 'Estilo audaz y vibrante',
    minimalDesign: 'Minimalista',
    minimalDesignDesc: 'Diseño limpio y simple',
    
    exportAsICS: 'Exportar como ICS',
    exportAsPDF: 'Exportar como PDF',
    exportAsJPG: 'Exportar como JPG',
    
    startTime: 'Hora de Inicio',
    endTime: 'Hora de Fin',
    selectTime: 'Seleccionar Hora',
  }
}

export const i18n = reactive({
  locale: localStorage.getItem('proplanner-locale') || 'en',
  theme: localStorage.getItem('proplanner-theme') || 'light',
})

export function t(key) {
  return translations[i18n.locale]?.[key] || translations.en[key] || key
}

export function setLocale(locale) {
  if (translations[locale]) {
    i18n.locale = locale
    localStorage.setItem('proplanner-locale', locale)
  }
}

export function setTheme(theme) {
  i18n.theme = theme
  localStorage.setItem('proplanner-theme', theme)
}

export function getLocale() {
  return i18n.locale
}

export function getTheme() {
  return i18n.theme
}
