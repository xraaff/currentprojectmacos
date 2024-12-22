from telethon import TelegramClient
import json
import os

# Твои данные
api_id = 21934953
api_hash = 'cafe66049ff1673b19b8726f3979cd26'
phone_number = '+380730201952'

# Создаём клиента
client = TelegramClient('session_name', api_id, api_hash)

# Папка для сохранения медиафайлов
MEDIA_FOLDER = "downloaded_media"
os.makedirs(MEDIA_FOLDER, exist_ok=True)  # Создаём папку, если её нет

async def extract_messages(chat_id_or_link, limit=100):
    # Подключаемся к Telegram
    await client.start(phone_number)
    print(f"Успешное подключение. Выкачиваем данные из чата: {chat_id_or_link}")

    # Получаем чат или канал
    entity = await client.get_entity(chat_id_or_link)

    # Выкачиваем сообщения
    messages = []
    async for message in client.iter_messages(entity, limit=limit):
        media_path = None
        if message.media:  # Если в сообщении есть медиа
            try:
                media_path = await message.download_media(file=MEDIA_FOLDER)
                print(f"Медиафайл сохранён: {media_path}")
            except Exception as e:
                print(f"Ошибка при скачивании медиа ID {message.id}: {e}")

        messages.append({
            "id": message.id,
            "date": str(message.date),
            "text": message.text,
            "sender_id": message.sender_id,
            "media": bool(message.media),
            "media_path": media_path  # Сохраняем путь к медиафайлу (если скачалось)
        })
        print(f"Собрано сообщение ID: {message.id}")

    # Генерируем имя файла для сохранения
    file_name = entity.title if hasattr(entity, 'title') else entity.first_name or entity.username or "unknown"

    # Сохраняем сообщения в JSON-файл
    with open(f"{file_name}_messages.json", "w", encoding="utf-8") as file:
        json.dump(messages, file, ensure_ascii=False, indent=4)
    print(f"Сохранено {len(messages)} сообщений в файл: {file_name}_messages.json")
    print(f"Все медиафайлы сохранены в папке: {MEDIA_FOLDER}")

# Запускаем
with client:
    chat_id_or_link = input("Введите ID или ссылку чата/канала: ")
    limit = int(input("Введите количество сообщений для выкачки (по умолчанию 100): ") or 100)
    client.loop.run_until_complete(extract_messages(chat_id_or_link, limit))