import os
import json
from PIL import Image
import pytesseract

# Путь к папке с медиа
MEDIA_FOLDER = "downloaded_media"
OUTPUT_FILE = "media_texts.json"


def process_media():
    # Запрос языка для OCR у пользователя
    print("Введите языки для OCR (например, 'rus', 'eng', 'eng+rus'):")
    selected_lang = input("Языки: ").strip()
    if not selected_lang:
        selected_lang = 'eng'  # По умолчанию - английский

    all_texts = []

    # Обработка изображений
    print("Обрабатываем изображения...")
    for file_name in os.listdir(MEDIA_FOLDER):
        file_path = os.path.join(MEDIA_FOLDER, file_name)

        try:
            # Открываем изображение
            image = Image.open(file_path)

            # Извлечение текста
            text = pytesseract.image_to_string(image, lang=selected_lang)
            print(f"Извлечён текст из {file_name}: {text.strip()}")

            all_texts.append({"file": file_name, "text": text.strip()})

        except Exception as e:
            print(f"Ошибка при обработке {file_name}: {e}")

    # Сохранение результатов в JSON
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(all_texts, f, ensure_ascii=False, indent=4)

    print(f"Обработка завершена. Результаты сохранены в {OUTPUT_FILE}!")


if __name__ == "__main__":
    process_media()