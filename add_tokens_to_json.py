import json
import tiktoken


def count_tokens(text, model="gpt-4"):
    """Функция подсчёта токенов для указанной модели."""
    encoding = tiktoken.encoding_for_model(model)
    tokens = encoding.encode(text)
    return len(tokens)


def process_json_with_tokens(input_file, output_file, model="gpt-4"):
    """Читает JSON, добавляет количество токенов и сохраняет результат."""
    with open(input_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    for entry in data:
        text = entry.get("text", "")
        if text:
            entry["tokens"] = count_tokens(text, model)
        else:
            entry["tokens"] = 0  # Если текста нет, токенов тоже 0

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    print(f"Обновленный файл с токенами сохранён в {output_file}")


if __name__ == "__main__":
    input_file = "media_texts.json"  # Входной JSON-файл
    output_file = "media_texts_with_tokens.json"  # Выходной JSON-файл
    process_json_with_tokens(input_file, output_file)