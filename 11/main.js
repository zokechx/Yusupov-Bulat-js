const fs = require('fs');
const readline = require('readline');
// Создаем интерфейс для чтения ввода
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function startTerminalApp() {
    console.log('🚀 Терминальное приложение запущено!');
    console.log('1 - Сохранить текст в output.txt');
    console.log('2 - Проанализировать data.txt');
    console.log('3 - Логирование в log.txt');
    console.log('0 - Выход');
    
    rl.question('Выберите действие (0-3): ', (choice) => {
        switch(choice) {
            case '1':
                saveToOutput();
                break;
            case '2':
                analyzeDataFile();
                break; 
            case '3':
                startLogging();
                break;
            case '0':
                console.log('👋 До свидания!');
                rl.close();
                break;
            default:
                console.log('❌ Неверный выбор!');
                startTerminalApp();
                break;
        }
    });
}

// Задача 1: Сохранение текста в output.txt
function saveToOutput() {
    rl.question('\n📝 Введите текст для сохранения в output.txt: ', (text) => {
        if (!text.trim()) {
            console.log('❌ Текст не может быть пустым!');
            saveToOutput();
            return;
        }
        
        try {
            // Перезаписываем файл полностью
            fs.writeFileSync('output.txt', text, 'utf8');
            console.log('✅ Текст успешно сохранен в output.txt!');
            console.log(`📁 Содержимое файла: "${text}"`);
        } catch (error) {
            console.log('❌ Ошибка при записи файла:', error.message);
        }
        
        // Возврат в главное меню
        setTimeout(startTerminalApp, 1000);
    });
}

// Задача 2: Анализ data.txt
function analyzeDataFile() {
    try {
        if (!fs.existsSync('data.txt')) {
            // Создаем тестовый файл если его нет
            const testData = `Привет, мир!.`;
            fs.writeFileSync('data.txt', testData, 'utf8');
            console.log('📄 Создан тестовый файл data.txt');
        }
        
        const data = fs.readFileSync('data.txt', 'utf8');
        const lines = data.split('\n').filter(line => line.trim() !== '');
        const characters = data.length;
        
        console.log('\n📊 Анализ файла data.txt:');
        console.log(`📄 Количество строк: ${lines.length}`);
        console.log(`🔤 Количество символов: ${characters}`);
        console.log(`📝 Содержимое файла:\n"${data}"`);
        
    } catch (error) {
        console.log('❌ Ошибка при анализе файла:', error.message);
    }
    
    // Возврат в главное меню
    setTimeout(startTerminalApp, 2000);
}

// Задача 3: Логирование в log.txt
function startLogging() {
    console.log('\n📝 Режим логгирования запущен!');
    console.log('Вводите текст построчно. Для выхода введите "stop"');
    
    function logInput() {
        rl.question('> ', (input) => {
            if (input.toLowerCase() === 'stop') {
                console.log('🛑 Логгирование завершено!');
                startTerminalApp();
                return;
            }
            
            try {
                const timestamp = new Date().toLocaleString();
                const logEntry = `[${timestamp}] ${input}\n`;
                
                // Добавляем в конец файла
                fs.appendFileSync('log.txt', logEntry, 'utf8');
                console.log('✅ Запись добавлена в log.txt');
            } catch (error) {
                console.log('❌ Ошибка при записи в лог:', error.message);
            }
            
            // Рекурсивный вызов для следующего ввода
            logInput();
        });
    }
    
    logInput();
}

// Запуск приложения
startTerminalApp();