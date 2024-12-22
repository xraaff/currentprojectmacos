from pydub import AudioSegment
import os
import whisper
import json
import ssl

# Отключаем проверку SSL
ssl._create_default_https_context = ssl._create_unverified_context

# Папка с медиафайлами
MEDIA_FOLDER = "downloaded_media"
# Файл для сохранения результатов
OUTPUT_FILE = "transcriptions.json"

# Загружаем модель Whisper
model = whisper.load_model("base")  # Можно использовать "small", "medium", "large" для точности

# Список для хранения результатов
transcriptions = []

# Проходимся по всем файлам в папке
for file_name in os.listdir(MEDIA_FOLDER):
    file_path = os.path.join(MEDIA_FOLDER, file_name)

    # Проверяем, голосовой ли это файл
    if file_name.endswith(('.oga', '.ogg', '.mp3', '.wav')):
        print(f"Обрабатываем файл: {file_name}")

        try:
            # Если файл .oga, конвертируем его в .wav
            if file_name.endswith('.oga'):
                audio = AudioSegment.from_file(file_path, format="ogg")
                wav_path = file_path.replace('.oga', '.wav')
                audio.export(wav_path, format="wav")
                file_path = wav_path  # Обновляем путь к новому файлу
                print(f"Файл {file_name} конвертирован в {wav_path}")

            # Распознаём голос через Whisper
            result = model.transcribe(file_path)
            transcription = {
                "file_name": file_name,
                "text": result["text"]
            }
            transcriptions.append(transcription)
            print(f"Текст из {file_name}: {result['text']}")
        except Exception as e:
            print(f"Ошибка при обработке {file_name}: {e}")
    else:
        print(f"Файл {file_name} не является голосовым.")

# Сохраняем результаты в JSON-файл
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(transcriptions, f, ensure_ascii=False, indent=4)

print(f"Обработка завершена. Результаты сохранены в {OUTPUT_FILE}")