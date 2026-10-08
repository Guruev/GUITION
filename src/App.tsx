import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'Home Assistant Dashboard',
    description: 'Панель управления умным домом с тач-интерфейсом. Отображает состояние датчиков, управление освещением, климатом и безопасностью.',
    category: 'Умный дом',
    difficulty: 'Средне',
    url: 'https://github.com/ultramcu/guition-jc4880p4-bsp',
    features: ['Управление освещением', 'Мониторинг датчиков', 'Климат-контроль', 'Сцены'],
    icon: '🏠',
    tech: ['ESPHome', 'LVGL', 'WiFi', 'MQTT']
  },
  {
    id: 2,
    title: 'Интернет-радио MiniWebRadio',
    description: 'Интернет-радио с тач-управлением, эквалайзером, MP3-плеером, будильником и FTP-сервером.',
    category: 'Мультимедиа',
    difficulty: 'Средне',
    url: 'https://github.com/schreibfaul1/ESP32-MiniWebRadio',
    features: ['WiFi радио', 'MP3 плеер', 'Будильник', 'Эквалайзер'],
    icon: '📻',
    tech: ['ESP-IDF', 'I2S', 'LVGL', 'WiFi']
  },
  {
    id: 3,
    title: 'AI Голосовой Ассистент XiaoZhi',
    description: 'Открытый AI-чатбот для ESP32 с голосовым взаимодействием. Поддержка LLM (Qwen/DeepSeek).',
    category: 'AI / IoT',
    difficulty: 'Сложно',
    url: 'https://github.com/78/xiaozhi-esp32',
    features: ['Распознавание речи', 'Синтез голоса', 'AI диалоги', 'IoT'],
    icon: '🤖',
    tech: ['ESP-IDF', 'I2S', 'WiFi', 'LLM API']
  },
  {
    id: 4,
    title: 'Метеостанция + Монитор воздуха',
    description: 'Метеостанция с прогнозом, мониторингом качества воздуха, LoRa и ESP-NOW сенсорами.',
    category: 'Мониторинг',
    difficulty: 'Средне',
    url: 'https://embeddednerd.com/esp32-p4-weather-station/',
    features: ['Прогноз погоды', 'Качество воздуха', 'LoRa', 'Графики'],
    icon: '🌤️',
    tech: ['ESP-IDF', 'LVGL', 'LoRa', 'ESP-NOW']
  },
  {
    id: 5,
    title: 'Пульт дистанционного управления',
    description: 'Универсальный пульт для ИК/RF устройств с настраиваемым тач-интерфейсом.',
    category: 'Умный дом',
    difficulty: 'Легко',
    url: 'https://github.com/elik745i/ESP32-2432S024C-Remote',
    features: ['ИК управление', 'RF команды', 'Макросы', 'WiFi'],
    icon: '🎮',
    tech: ['Arduino', 'IR', 'RF 433', 'WiFi']
  },
  {
    id: 6,
    title: 'Веб-радио с визуализатором',
    description: 'Интернет-радио с 32-полосным визуализатором спектра и каталогом станций.',
    category: 'Мультимедиа',
    difficulty: 'Средне',
    url: 'https://github.com/dmatking/esp32-p4-webradio',
    features: ['Спектр-визуализатор', 'Radio Browser', 'Избранное'],
    icon: '🎵',
    tech: ['ESP-IDF', 'FFT', 'I2S', 'LVGL']
  },
  {
    id: 7,
    title: 'Камера + Видеодомофон',
    description: 'Видеонаблюдение или видеодомофон с esp_video, стримингом и записью на SD.',
    category: 'Безопасность',
    difficulty: 'Сложно',
    url: 'https://community.home-assistant.io/t/guition-esp32-p4-jc4880p443-working-config/999211',
    features: ['Видеостриминг', 'Запись SD', 'Детекция движения'],
    icon: '📹',
    tech: ['ESPHome', 'Camera', 'SD Card', 'I2S']
  },
  {
    id: 8,
    title: 'Часы + Инфо-панель',
    description: 'Настольные часы с погодой, календарём, напоминаниями и ночным режимом.',
    category: 'Информация',
    difficulty: 'Легко',
    url: '',
    features: ['Часы', 'Погода', 'Календарь', 'Ночной режим'],
    icon: '⏰',
    tech: ['Arduino', 'LVGL', 'NTP', 'WiFi']
  },
  {
    id: 9,
    title: 'Мониторинг энергии',
    description: 'Визуализация солнечной генерации, потребления и возврата энергии в сеть.',
    category: 'Мониторинг',
    difficulty: 'Средне',
    url: '',
    features: ['Солнечная генерация', 'Потребление', 'Графики', 'HA'],
    icon: '⚡',
    tech: ['ESPHome', 'LVGL', 'Modbus', 'MQTT']
  },
  {
    id: 10,
    title: 'P4 ↔ C6 Коммуникация + SD',
    description: 'Демо связи ESP32-P4 и C6 через RS232 + работа с SD-картой.',
    category: 'Обучение',
    difficulty: 'Легко',
    url: 'https://github.com/buccaneer-jak/JC4880P443C-P4-to-C6-RS232-communication-and-SD-Card-connection',
    features: ['RS232 P4↔C6', 'SD карта', 'WiFi через C6'],
    icon: '🔌',
    tech: ['ESP-IDF', 'UART', 'SD SPI']
  },
  {
    id: 11,
    title: 'NINA Astrophotography',
    description: 'Тач-панель для астрофотографии: карта неба, погода, таймеры экспозиции.',
    category: 'Специализированный',
    difficulty: 'Сложно',
    url: 'https://github.com/chvvkumar/ESP32-P4-NINA-Display',
    features: ['3D карта неба', 'Таймер экспозиции', 'Статус'],
    icon: '🔭',
    tech: ['ESP-IDF', 'LVGL', 'NINA API', '3D']
  },
  {
    id: 12,
    title: 'Медиа-плеер ESPHome',
    description: 'Медиа-плеер на ESPHome: стриминг аудио, обложки, управление через HA.',
    category: 'Мультимедиа',
    difficulty: 'Средне',
    url: 'https://jtenniswood.github.io/esphome-media-player/',
    features: ['Стриминг', 'Обложки', 'HA', 'Очередь'],
    icon: '🎧',
    tech: ['ESPHome', 'I2S', 'WiFi', 'HA']
  }
];

const specs = [
  { label: 'Модель', value: 'JC4880P443C_I_W_Y' },
  { label: 'Экран', value: '4.3" IPS TFT' },
  { label: 'Разрешение', value: '480 × 800 px' },
  { label: 'Тачскрин', value: 'GT911 Capacitive' },
  { label: 'Основной MCU', value: 'ESP32-P4 (RISC-V, 400MHz)' },
  { label: 'WiFi/BLE MCU', value: 'ESP32-C6 (WiFi 6 + BLE 5)' },
  { label: 'Интерфейс дисплея', value: 'MIPI-DSI (ST7701S)' },
  { label: 'Камера', value: 'OV2640/OV5640' },
  { label: 'Аудио', value: 'I2S + Speaker' },
  { label: 'Хранилище', value: 'MicroSD Card' },
  { label: 'Питание', value: '5V USB-C' },
  { label: 'Цена', value: '~$35' }
];

const resources = [
  { title: 'guition-jc4880p4-bsp', desc: 'Board Support Package для Arduino/PlatformIO', url: 'https://github.com/ultramcu/guition-jc4880p4-bsp' },
  { title: 'GitHub Topic: esp32p4', desc: 'Все проекты с тегом ESP32-P4', url: 'https://github.com/topics/esp32p4' },
  { title: 'HA Working Config', desc: 'Рабочая конфигурация ESPHome', url: 'https://community.home-assistant.io/t/guition-esp32-p4-jc4880p443-working-config/999211' },
  { title: 'GUITION Official', desc: 'Документация от производителя', url: 'https://www.guition.com/esp32p4-display-module/esp32p4-screen-module' },
  { title: 'Reddit r/esp32', desc: 'Обсуждение и опыт сообщества', url: 'https://www.reddit.com/r/esp32/' },
  { title: 'CNX Software', desc: 'Обзор платы с распиновкой', url: 'https://www.cnx-software.com/2025/08/12/4-3-inch-touch-display-board-features-single-esp32-p4-esp32-c6-module-supports-camera-and-speakers/' }
];

function App() {
  const [selected, setSelected] = useState<string>('Все');
  const [search, setSearch] = useState<string>('');
  const [modal, setModal] = useState<any>(null);

  const categories = ['Все', ...Array.from(new Set(projects.map(p => p.category)))];

  const filtered = projects.filter(p => {
    const matchCat = selected === 'Все' || p.category === selected;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const diffColor = (d: string) => {
    if (d === 'Легко') return 'bg-green-100 text-green-800';
    if (d === 'Средне') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', color: 'white', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{ padding: '60px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1))' }}></div>
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', padding: '8px 16px', marginBottom: '24px' }}>
            <span style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%' }}></span>
            <span style={{ fontSize: '14px', color: '#d1d5db' }}>Исследование проектов для ESP32-P4</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 'bold', background: 'linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '16px' }}>
            GUITION JC4880P443C
          </h1>
          <p style={{ fontSize: '18px', color: '#d1d5db', maxWidth: '700px', margin: '0 auto' }}>
            Исследование open-source проектов для платы с 4.3" IPS дисплеем, ESP32-P4 + ESP32-C6
          </p>
        </div>
      </header>

      {/* Specs */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>📋 Характеристики платы</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {specs.map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{s.label}</div>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(59,130,246,0.1)', borderRadius: '12px', border: '1px solid rgba(59,130,246,0.2)' }}>
            <p style={{ fontSize: '14px', color: '#bfdbfe', margin: 0 }}>
              <strong>💡 Особенности:</strong> Двухчиповая архитектура — ESP32-P4 отвечает за дисплей и вычисления (MIPI-DSI, PPA, USB), 
              а ESP32-C6 обеспечивает WiFi 6 / BLE 5 / Thread связь. Поддержка камеры, динамика, SD-карты и тачскрина GT911.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>🚀 Проекты для реализации</h2>
        <p style={{ color: '#9ca3af', marginBottom: '24px' }}>Найдено {projects.length} интересных проектов</p>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
          <input
            type="text"
            placeholder="Поиск..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: '1 1 200px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px 16px', color: 'white', fontSize: '14px', outline: 'none' }}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: selected === cat ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  background: selected === cat ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {filtered.map(p => (
            <div
              key={p.id}
              onClick={() => setModal(p)}
              style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ fontSize: '36px' }}>{p.icon}</span>
                <span style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '999px' }} className={diffColor(p.difficulty)}>
                  {p.difficulty}
                </span>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>{p.title}</h3>
              <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '12px', lineHeight: '1.5' }}>{p.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                {p.tech.slice(0, 3).map(t => (
                  <span key={t} style={{ fontSize: '11px', background: 'rgba(255,255,255,0.1)', color: '#d1d5db', padding: '3px 8px', borderRadius: '6px' }}>{t}</span>
                ))}
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{p.category}</div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>🔍</span>
            <p style={{ color: '#9ca3af' }}>Проекты не найдены</p>
          </div>
        )}
      </section>

      {/* Resources */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>📚 Ключевые ресурсы</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {resources.map((r, i) => (
            <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
              style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', textDecoration: 'none', color: 'white', display: 'block', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,197,94,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>{r.title}</h3>
              <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>{r.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>🏗️ Архитектура платы</h2>
        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'rgba(59,130,246,0.1)', borderRadius: '12px', border: '1px solid rgba(59,130,246,0.2)', padding: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#93c5fd', marginBottom: '12px' }}>ESP32-P4 (Основной)</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: '#d1d5db' }}>
                <li style={{ marginBottom: '6px' }}>▸ RISC-V 400MHz dual-core</li>
                <li style={{ marginBottom: '6px' }}>▸ 768KB SRAM + PSRAM</li>
                <li style={{ marginBottom: '6px' }}>▸ MIPI-DSI дисплей</li>
                <li style={{ marginBottom: '6px' }}>▸ PPA (2D графика)</li>
                <li style={{ marginBottom: '6px' }}>▸ USB OTG</li>
                <li style={{ marginBottom: '6px' }}>▸ SD/MMC контроллер</li>
                <li style={{ marginBottom: '6px' }}>▸ Камерный интерфейс</li>
                <li>▸ I2S аудио</li>
              </ul>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔗</div>
                <p style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px' }}>UART / RS232</p>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 12px' }}>Связь между чипами</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '11px', background: 'rgba(34,197,94,0.2)', color: '#86efac', padding: '4px 8px', borderRadius: '6px' }}>WiFi 6</span>
                  <span style={{ fontSize: '11px', background: 'rgba(168,85,247,0.2)', color: '#d8b4fe', padding: '4px 8px', borderRadius: '6px' }}>BLE 5</span>
                  <span style={{ fontSize: '11px', background: 'rgba(251,146,60,0.2)', color: '#fed7aa', padding: '4px 8px', borderRadius: '6px' }}>Thread/Zigbee</span>
                </div>
              </div>
            </div>
            <div style={{ background: 'rgba(34,197,94,0.1)', borderRadius: '12px', border: '1px solid rgba(34,197,94,0.2)', padding: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#86efac', marginBottom: '12px' }}>ESP32-C6 (Связь)</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: '#d1d5db' }}>
                <li style={{ marginBottom: '6px' }}>▸ RISC-V 160MHz</li>
                <li style={{ marginBottom: '6px' }}>▸ WiFi 6 (802.11ax)</li>
                <li style={{ marginBottom: '6px' }}>▸ Bluetooth 5 (LE)</li>
                <li style={{ marginBottom: '6px' }}>▸ IEEE 802.15.4</li>
                <li style={{ marginBottom: '6px' }}>▸ Thread / Zigbee</li>
                <li style={{ marginBottom: '6px' }}>▸ WiFi ↔ P4 мост</li>
                <li style={{ marginBottom: '6px' }}>▸ Mesh networking</li>
                <li>▸ Low power modes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '32px 20px', textAlign: 'center' }}>
        <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>Исследование проектов для GUITION JC4880P443C-I-W-Y</p>
        <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '8px' }}>GitHub, Reddit, Home Assistant Community • 2025</p>
      </footer>

      {/* Modal */}
      {modal && (
        <div
          onClick={() => setModal(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(0,0,0,0.7)' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: '#1e293b', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '600px', width: '100%', padding: '24px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <button
              onClick={() => setModal(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#9ca3af', fontSize: '24px', cursor: 'pointer' }}
            >
              ✕
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <span style={{ fontSize: '48px' }}>{modal.icon}</span>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>{modal.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <span style={{ fontSize: '12px', color: '#9ca3af' }}>{modal.category}</span>
                  <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '999px' }} className={diffColor(modal.difficulty)}>{modal.difficulty}</span>
                </div>
              </div>
            </div>
            <p style={{ color: '#d1d5db', marginBottom: '20px', lineHeight: '1.6' }}>{modal.description}</p>
            <h4 style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Возможности</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
              {modal.features.map((f: string) => (
                <div key={f} style={{ fontSize: '13px', color: '#d1d5db', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#4ade80' }}>✓</span> {f}
                </div>
              ))}
            </div>
            <h4 style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>Технологии</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
              {modal.tech.map((t: string) => (
                <span key={t} style={{ fontSize: '13px', background: 'rgba(59,130,246,0.2)', color: '#93c5fd', padding: '4px 12px', borderRadius: '8px', border: '1px solid rgba(59,130,246,0.2)' }}>{t}</span>
              ))}
            </div>
            {modal.url && (
              <a href={modal.url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(34,197,94,0.2)', color: '#86efac', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', border: '1px solid rgba(34,197,94,0.2)' }}>
                Открыть на GitHub →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
