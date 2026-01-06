// Dijital Saat Güncelleme
function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Hava Durumu Bilgisi Güncelleme (OpenWeatherMap API)
async function updateWeather() {
    const weatherElement = document.getElementById('weather');
    
    try {
        // İstanbul'un koordinatları (örnek)
        const lat = 41.0082;
        const lon = 28.9784;
        
        // Open-Meteo API - Ücretsiz ve API anahtarı gerektirmez
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`
        );
        
        const data = await response.json();
        const temp = Math.round(data.current.temperature_2m);
        const weatherCode = data.current.weather_code;
        
        // Hava durumu kodu gösterimi
        let weatherIcon = '🌤️';
        if (weatherCode === 0) weatherIcon = '☀️';      // Açık
        else if (weatherCode === 1 || weatherCode === 2) weatherIcon = '⛅';  // Kısmen bulutlu
        else if (weatherCode === 3) weatherIcon = '☁️';   // Bulutlu
        else if (weatherCode === 45 || weatherCode === 48) weatherIcon = '🌫️'; // Sisli
        else if (weatherCode >= 51 && weatherCode <= 67) weatherIcon = '🌧️'; // Yağmur
        else if (weatherCode >= 71 && weatherCode <= 85) weatherIcon = '❄️'; // Kar
        else if (weatherCode === 80 || weatherCode === 81 || weatherCode === 82) weatherIcon = '⛈️'; // Sağanak yağmur
        else if (weatherCode >= 80 && weatherCode <= 82) weatherIcon = '⛈️'; // Gök gürültülü fırtına
        
        weatherElement.textContent = `${weatherIcon} ${temp}°C`;
        
    } catch (error) {
        console.log('Hava durumu bilgisi alınamadı:', error);
        weatherElement.textContent = '🌡️ --°C';
    }
}

// Sayfanın yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // İlk güncelleme
    updateClock();
    updateWeather();
    
    // Her saniye saati güncelle
    setInterval(updateClock, 1000);
    
    // Her 10 dakikada hava durumunu güncelle
    setInterval(updateWeather, 600000);
});
