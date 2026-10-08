import { useState } from 'react';

type Project = {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'Легко' | 'Средне' | 'Сложно';
  githubUrl?: string;
  features: string[];
  icon: string;
  techStack: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Home Assistant Dashboard',
    description: 'Панель управления умным домом с тач-интерфейсом. Отображает состояние датчиков, управление освещением, климатом и безопасностью. Использует ESPHome + LVGL для красивого UI.',
    category: 'Умный дом',
    difficulty: 'Средне',
    githubUrl: 'https://github.com/ultramcu/guition-jc4880p4-bsp',
    features: ['Управление освещением', 'Мониторинг датчиков', 'Климат-контроль', 'Сцены и автоматизации', 'Голосовое управление'],
    icon: '🏠',
    techStack: ['ESPHome', 'LVGL', 'Home Assistant', 'WiFi', 'MQTT']
  },
  {
    id: 2,
    title: 'Интернет-радио MiniWebRadio',
    description: 'Полноценное интернет-радио с тач-управлением, отображением информации о станции, эквалайзером, MP3-плеером, будильником и FTP-сервером для загрузки треков.',
    category: 'Мультимедиа',
    difficulty: 'Средне',
    githubUrl: 'https://github.com/schreibfaul1/ESP32-MiniWebRadio',
    features: ['WiFi радио', 'MP3 плеер', 'Будильник', 'Эквалайзер', 'Таймер сна'],
    icon: '📻',
    techStack: ['ESP-IDF', 'I2S Audio', 'LVGL', 'WiFi', 'FTP']
  },
  {
    id: 3,
    title: 'AI Голосовой Ассистент (XiaoZhi)',
    description: 'Открытый AI-чатбот для ESP32 с голосовым взаимодействием. Поддержка больших языковых моделей (Qwen/DeepSeek), распознавание речи и синтез голоса.',
    category: 'AI / IoT',
    difficulty: 'Сложно',
    githubUrl: 'https://github.com/78/xiaozhi-esp32',
    features: ['Распознавание речи', 'Синтез голоса', 'AI диалоги', 'Эмоциональные реакции', 'IoT интеграция'],
    icon: '🤖',
    techStack: ['ESP-IDF', 'I2S', 'WiFi', 'LLM API', 'LVGL']
  },
  {
    id: 4,
    title: 'Метеостанция + Монитор качества воздуха',
    description: 'Продвинутая метеостанция с прогнозом погоды, мониторингом качества воздуха, подключением к LoRa и ESP-NOW сенсорам. Поддержка различных Weather API.',
    category: 'Мониторинг',
    difficulty: 'Средне',
    githubUrl: 'https://embeddednerd.com/esp32-p4-weather-station/',
    features: ['Прогноз погоды', 'Качество воздуха', 'LoRa сенсоры', 'ESP-NOW', 'Графики данных'],
    icon: '🌤️',
    techStack: ['ESP-IDF', 'LVGL', 'LoRa', 'ESP-NOW', 'Weather API']
  },
  {
    id: 5,
    title: 'Пульт дистанционного управления',
    description: 'Универсальный пульт для управления ИК/RF устройствами, медиа-плеерами, телевизорами и другой техникой. Красивый тач-интерфейс с настраиваемыми кнопками.',
    category: 'Умный дом',
    difficulty: 'Легко',
    githubUrl: 'https://github.com/elik745i/ESP32-2432S024C-Remote',
    features: ['ИК управление', 'RF команды', 'Настраиваемые кнопки', 'Макросы', 'WiFi команды'],
    icon: '🎮',
    techStack: ['Arduino', 'IR Remote', 'RF 433MHz', 'WiFi', 'LVGL']
  },
  {
    id: 6,
    title: 'Веб-радио с визуализатором спектра',
    description: 'Сенсорное интернет-радио с живым 32-полосным визуализатором спектра. Стримит MP3 станции из каталога Radio Browser с красивыми анимациями.',
    category: 'Мультимедиа',
    difficulty: 'Средне',
    githubUrl: 'https://github.com/dmatking/esp32-p4-webradio',
    features: ['Спектр-визуализатор', 'Radio Browser', 'Избранное', 'Громкость', 'Инфо о станции'],
    icon: '🎵',
    techStack: ['ESP-IDF', 'FFT', 'I2S', 'LVGL', 'HTTP Streaming']
  },
  {
    id: 7,
    title: 'Камера + Видеодомофон',
    description: 'Использует встроенную камеру для видеонаблюдения или видеодомофона. Поддержка esp_video в ESPHome, стриминг видео на дисплей и запись на SD-карту.',
    category: 'Безопасность',
    difficulty: 'Сложно',
    githubUrl: 'https://community.home-assistant.io/t/guition-esp32-p4-jc4880p443-working-config/999211',
    features: ['Видеостриминг', 'Запись на SD', 'Детекция движения', 'Двусторонняя связь', 'HA интеграция'],
    icon: '📹',
    techStack: ['ESPHome', 'esp_video', 'Camera', 'SD Card', 'I2S Audio']
  },
  {
    id: 8,
    title: 'Часы + Информационная панель',
    description: 'Настольные часы с отображением времени, даты, погоды, календаря событий, напоминаний и другой полезной информации. Стильный минималистичный дизайн.',
    category: 'Информация',
    difficulty: 'Легко',
    features: ['Часы с секундами', 'Погода', 'Календарь', 'Напоминания', 'Ночной режим'],
    icon: '⏰',
    techStack: ['Arduino', 'LVGL', 'NTP', 'Weather API', 'WiFi']
  },
  {
    id: 9,
    title: 'Мониторинг энергии (Solar Dashboard)',
    description: 'Модульный проект для визуализации распределения энергии: солнечная генерация, потребление из сети, возврат в сеть. Данные в реальном времени.',
    category: 'Мониторинг',
    difficulty: 'Средне',
    features: ['Солнечная генерация', 'Потребление сети', 'Визуализация потоков', 'История данных', 'HA интеграция'],
    icon: '⚡',
    techStack: ['ESPHome', 'LVGL', 'Modbus', 'MQTT', 'Home Assistant']
  },
  {
    id: 10,
    title: 'ESP32-P4 ↔ C6 Коммуникация + SD',
    description: 'Демонстрационный проект связи между ESP32-P4 и ESP32-C6 через RS232 + работа с SD-картой. Базовый проект для понимания архитектуры платы.',
    category: 'Обучение',
    difficulty: 'Легко',
    githubUrl: 'https://github.com/buccaneer-jak/JC4880P443C-P4-to-C6-RS232-communication-and-SD-Card-connection',
    features: ['RS232 связь P4↔C6', 'SD карта', 'WiFi через C6', 'Диагностика', 'Hello World'],
    icon: '🔌',
    techStack: ['ESP-IDF', 'UART/RS232', 'SD SPI', 'Arduino']
  },
  {
    id: 11,
    title: 'NINA Astrophotography Dashboard',
    description: 'Тач-панель для астрофотографии: отображение 3D карты неба, погода, состояние оборудования, таймеры экспозиции. Для телескопов и камер.',
    category: 'Специализированный',
    difficulty: 'Сложно',
    githubUrl: 'https://github.com/chvvkumar/ESP32-P4-NINA-Display',
    features: ['3D карта неба', 'Погода для астро', 'Таймер экспозиции', 'Статус оборудования', 'Фокусировка'],
    icon: '🔭',
    techStack: ['ESP-IDF', 'LVGL', 'NINA API', 'WiFi', '3D Graphics']
  },
  {
    id: 12,
    title: 'Медиа-плеер с ESPHome',
    description: 'Полноценный медиа-плеер на базе ESPHome: потоковое аудио, управление через Home Assistant, отображение обложек, управление очередью воспроизведения.',
    category: 'Мультимедиа',
    difficulty: 'Средне',
    githubUrl: 'https://jtenniswood.github.io/esphome-media-player/devices/esp32-p4-jc8012p4a1.html',
    features: ['Стриминг аудио', 'Обложки треков', 'HA интеграция', 'Очередь', 'Управление'],
    icon: '🎧',
    techStack: ['ESPHome', 'I2S', 'WiFi', 'Home Assistant', 'LVGL']
  }
];

const boardSpecs = {
  model: 'JC4880P443C_I_W_Y',
  screen: '4.3" IPS TFT',
  resolution: '480 × 800 px',
  touch: 'GT911 Capacitive',
  mainMCU: 'ESP32-P4 (RISC-V, 400MHz)',
  wifiMCU: 'ESP32-C6 (WiFi 6 + BLE 5)',
  display: 'MIPI-DSI (ST7701S)',
  camera: 'Поддержка (OV2640/OV5640)',
  audio: 'I2S + Speaker',
  storage: 'MicroSD Card',
  power: '5V USB-C',
  price: '~$35'
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Все', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = projects.filter(p => {
    const matchesCategory = selectedCategory === 'Все' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Легко': return 'bg-green-100 text-green-800 border-green-200';
      case 'Средне': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Сложно': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Умный дом': return 'bg-blue-500';
      case 'Мультимедиа': return 'bg-purple-500';
      case 'AI / IoT': return 'bg-pink-500';
      case 'Мониторинг': return 'bg-emerald-500';
      case 'Безопасность': return 'bg-orange-500';
      case 'Информация': return 'bg-cyan-500';
      case 'Обучение': return 'bg-indigo-500';
      case 'Специализированный': return 'bg-rose-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300">Исследование проектов для ESP32-P4</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              GUITION JC4880P443C
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Исследование интересных open-source проектов на GitHub, которые можно реализовать на плате с 4.3" IPS дисплеем, ESP32-P4 + ESP32-C6
            </p>
          </div>
        </div>
      </header>

      {/* Board Specs */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 lg:p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">📋</span>
            Характеристики платы
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.entries(boardSpecs).map(([key, value]) => (
              <div key={key} className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-blue-500/30 transition-colors">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  {key === 'mainMCU' ? 'Основной MCU' :
                   key === 'wifiMCU' ? 'WiFi/BLE MCU' :
                   key === 'screen' ? 'Экран' :
                   key === 'resolution' ? 'Разрешение' :
                   key === 'touch' ? 'Тачскрин' :
                   key === 'display' ? 'Интерфейс дисплея' :
                   key === 'camera' ? 'Камера' :
                   key === 'audio' ? 'Аудио' :
                   key === 'storage' ? 'Хранилище' :
                   key === 'power' ? 'Питание' :
                   key === 'price' ? 'Цена' :
                   key === 'model' ? 'Модель' : key}
                </div>
                <div className="text-sm font-semibold text-white">{value}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <p className="text-sm text-blue-200">
              <strong>💡 Особенности:</strong> Двухчиповая архитектура — ESP32-P4 отвечает за дисплей и вычисления (MIPI-DSI, PPA, USB), 
              а ESP32-C6 обеспечивает WiFi 6 / BLE 5 / Thread/Zigbee связь. Связь между чипами по UART/RS232.
              Поддержка камеры, динамика, SD-карты и тачскрина GT911.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-7xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <span className="text-3xl">🚀</span>
          Проекты для реализации
        </h2>
        <p className="text-gray-400 mb-8">Найдено {projects.length} интересных проектов на GitHub и в сообществе</p>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Поиск проектов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
            />
            <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-blue-500/30 hover:bg-white/8 transition-all cursor-pointer hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{project.icon}</span>
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-4">
                {project.techStack.slice(0, 3).map(tech => (
                  <span key={tech} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-md">
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-xs text-gray-500 px-2 py-1">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${getCategoryColor(project.category)}`}></span>
                <span className="text-xs text-gray-400">{project.category}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-gray-400 text-lg">Проекты не найдены. Попробуйте изменить фильтры.</p>
          </div>
        )}
      </section>

      {/* Key Resources */}
      <section className="max-w-7xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="text-3xl">📚</span>
          Ключевые ресурсы
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a href="https://github.com/ultramcu/guition-jc4880p4-bsp" target="_blank" rel="noopener noreferrer"
            className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-green-500/30 transition-all hover:bg-white/8 group">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📦</span>
              <h3 className="font-bold text-white group-hover:text-green-300">guition-jc4880p4-bsp</h3>
            </div>
            <p className="text-sm text-gray-400">Board Support Package для Arduino/PlatformIO. Ручная инициализация ST7701S MIPI-DSI, PPA hardware-rotate, GT911 touch.</p>
            <div className="mt-3 text-xs text-green-400">github.com/ultramcu/guition-jc4880p4-bsp</div>
          </a>
          <a href="https://github.com/topics/esp32p4" target="_blank" rel="noopener noreferrer"
            className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-green-500/30 transition-all hover:bg-white/8 group">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🏷️</span>
              <h3 className="font-bold text-white group-hover:text-green-300">GitHub Topic: esp32p4</h3>
            </div>
            <p className="text-sm text-gray-400">Все проекты с тегом ESP32-P4 на GitHub. Новые репозитории появляются каждый день.</p>
            <div className="mt-3 text-xs text-green-400">github.com/topics/esp32p4</div>
          </a>
          <a href="https://community.home-assistant.io/t/guition-esp32-p4-jc4880p443-working-config/999211" target="_blank" rel="noopener noreferrer"
            className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-blue-500/30 transition-all hover:bg-white/8 group">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🏠</span>
              <h3 className="font-bold text-white group-hover:text-blue-300">HA Working Config</h3>
            </div>
            <p className="text-sm text-gray-400">Рабочая конфигурация ESPHome для JC4880P443. Дисплей, тач, камера, аудио — всё проверено.</p>
            <div className="mt-3 text-xs text-blue-400">community.home-assistant.io</div>
          </a>
          <a href="https://www.guition.com/esp32p4-display-module/esp32p4-screen-module" target="_blank" rel="noopener noreferrer"
            className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-purple-500/30 transition-all hover:bg-white/8 group">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🌐</span>
              <h3 className="font-bold text-white group-hover:text-purple-300">Официальная страница GUITION</h3>
            </div>
            <p className="text-sm text-gray-400">Полная спецификация, даташиты, примеры кода и документация от производителя.</p>
            <div className="mt-3 text-xs text-purple-400">guition.com</div>
          </a>
          <a href="https://www.reddit.com/r/esp32/comments/1nml6fm/guition_jc4880p433_43_capacitive_touch_display/" target="_blank" rel="noopener noreferrer"
            className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-orange-500/30 transition-all hover:bg-white/8 group">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">💬</span>
              <h3 className="font-bold text-white group-hover:text-orange-300">Reddit r/esp32</h3>
            </div>
            <p className="text-sm text-gray-400">Обсуждение платы, советы по прошивке, опыт сообщества и ссылки на полезные ресурсы.</p>
            <div className="mt-3 text-xs text-orange-400">reddit.com/r/esp32</div>
          </a>
          <a href="https://www.cnx-software.com/2025/08/12/4-3-inch-touch-display-board-features-single-esp32-p4-esp32-c6-module-supports-camera-and-speakers/" target="_blank" rel="noopener noreferrer"
            className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-cyan-500/30 transition-all hover:bg-white/8 group">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📰</span>
              <h3 className="font-bold text-white group-hover:text-cyan-300">CNX Software обзор</h3>
            </div>
            <p className="text-sm text-gray-400">Подробный обзор платы с фото, распиновкой и анализом возможностей.</p>
            <div className="mt-3 text-xs text-cyan-400">cnx-software.com</div>
          </a>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="max-w-7xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <span className="text-3xl">🏗️</span>
          Архитектура платы
        </h2>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ESP32-P4 */}
            <div className="bg-blue-500/10 rounded-xl border border-blue-500/20 p-5">
              <h3 className="text-lg font-bold text-blue-300 mb-3">ESP32-P4 (Основной)</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><span className="text-blue-400">▸</span> RISC-V 400MHz dual-core</li>
                <li className="flex items-center gap-2"><span className="text-blue-400">▸</span> 768KB SRAM + PSRAM</li>
                <li className="flex items-center gap-2"><span className="text-blue-400">▸</span> MIPI-DSI дисплей</li>
                <li className="flex items-center gap-2"><span className="text-blue-400">▸</span> PPA (2D графика)</li>
                <li className="flex items-center gap-2"><span className="text-blue-400">▸</span> USB OTG</li>
                <li className="flex items-center gap-2"><span className="text-blue-400">▸</span> SD/MMC контроллер</li>
                <li className="flex items-center gap-2"><span className="text-blue-400">▸</span> Камерный интерфейс</li>
                <li className="flex items-center gap-2"><span className="text-blue-400">▸</span> I2S аудио</li>
              </ul>
            </div>
            {/* Connection */}
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="bg-white/10 rounded-xl p-4 border border-white/10">
                  <div className="text-2xl mb-2">🔗</div>
                  <p className="text-sm text-gray-300 font-medium">UART / RS232</p>
                  <p className="text-xs text-gray-500 mt-1">Связь между чипами</p>
                  <div className="mt-3 flex flex-col gap-1">
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">WiFi 6</span>
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">BLE 5</span>
                    <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">Thread/Zigbee</span>
                  </div>
                </div>
              </div>
            </div>
            {/* ESP32-C6 */}
            <div className="bg-green-500/10 rounded-xl border border-green-500/20 p-5">
              <h3 className="text-lg font-bold text-green-300 mb-3">ESP32-C6 (Связь)</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2"><span className="text-green-400">▸</span> RISC-V 160MHz</li>
                <li className="flex items-center gap-2"><span className="text-green-400">▸</span> WiFi 6 (802.11ax)</li>
                <li className="flex items-center gap-2"><span className="text-green-400">▸</span> Bluetooth 5 (LE)</li>
                <li className="flex items-center gap-2"><span className="text-green-400">▸</span> IEEE 802.15.4</li>
                <li className="flex items-center gap-2"><span className="text-green-400">▸</span> Thread / Zigbee</li>
                <li className="flex items-center gap-2"><span className="text-green-400">▸</span> WiFi ↔ P4 мост</li>
                <li className="flex items-center gap-2"><span className="text-green-400">▸</span> Mesh networking</li>
                <li className="flex items-center gap-2"><span className="text-green-400">▸</span> Low power modes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400 text-sm">
            <p>Исследование проектов для платы GUITION JC4880P443C-I-W-Y (ESP32-P4 + ESP32-C6)</p>
            <p className="mt-2">Данные собраны из GitHub, Reddit, Home Assistant Community и CNX Software • 2025</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div
            className="relative bg-slate-800 rounded-2xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 lg:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">{selectedProject.icon}</span>
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-2 h-2 rounded-full ${getCategoryColor(selectedProject.category)}`}></span>
                  <span className="text-sm text-gray-400">{selectedProject.category}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${getDifficultyColor(selectedProject.difficulty)}`}>
                    {selectedProject.difficulty}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 mb-6">{selectedProject.description}</p>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Возможности</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProject.features.map(feature => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-green-400">✓</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Технологии</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map(tech => (
                  <span key={tech} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-lg text-sm border border-blue-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-lg border border-green-500/20 hover:bg-green-500/30 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Открыть на GitHub
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
