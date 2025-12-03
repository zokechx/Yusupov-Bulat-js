const fs = require('fs');
const readline = require('readline');

// Проверяем аргументы командной строки
if (process.argv.length < 3) {
    console.error('Использование: node rewriter.js filename.txt');
    process.exit(1);
}

const filename = process.argv[2];

// 1. Читаем существующий файл)
try {
    if (fs.existsSync(filename)) {
        const content = fs.readFileSync(filename, 'utf8');
        console.log(`Текущее содержимое файла ${filename}:`);
        console.log('---');
        console.log(content);
        console.log('---\n');
    } else {
        console.log(`Файл ${filename} не существует. Будет создан новый.`);
    }
} catch (error) {
    console.error(`Ошибка при чтении файла: ${error.message}`);
}

// 2. Принимаем текст от пользователя
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите новый текст (старое содержимое будет удалено):\n', (newText) => {
    // 3. Полностью перезаписываем файл
    try {
        fs.writeFileSync(filename, newText, 'utf8');
        console.log(`✅ Файл ${filename} успешно перезаписан.`);
    } catch (error) {
        console.error(`❌ Ошибка при записи файла: ${error.message}`);
    }
    
    rl.close();
});