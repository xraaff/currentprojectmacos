from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler

# Функция старта и отправки кнопки с WebView
async def start(update, context):
    # Создаем кнопку с ссылкой на WebView
    keyboard = [
        [InlineKeyboardButton("Open Web Interface", url="http://192.168.1.4:8080/")]
    ]

    # Создаем разметку для кнопки
    reply_markup = InlineKeyboardMarkup(keyboard)

    # Отправляем сообщение с кнопкой
    await update.message.reply_text('Welcome! Click below to access the interface:', reply_markup=reply_markup)

def main():
    # Инициализация бота с API ключом
    application = Application.builder().token("7598969341:AAFvxzRsJF20c-YvcCKZ1CPk1odO1yYczwA").build()

    # Обработчик команды /start
    application.add_handler(CommandHandler("start", start))

    # Запуск бота
    application.run_polling()

if __name__ == '__main__':
    main()