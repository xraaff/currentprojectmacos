import tiktoken

def count_tokens(text, model="gpt-4"):
    """
    Подсчитывает количество токенов в тексте для указанной модели.
    :param text: Текст, который нужно анализировать.
    :param model: Модель OpenAI (например, 'gpt-3.5-turbo', 'gpt-4').
    :return: Количество токенов.
    """
    try:
        # Загрузим соответствующий токенайзер для модели
        encoding = tiktoken.encoding_for_model(model)
    except KeyError:
        # Если модель не найдена, используем стандартный BPE-энкодер
        encoding = tiktoken.get_encoding("cl100k_base")

    tokens = encoding.encode(text)
    return len(tokens)

if __name__ == "__main__":
    sample_text = "Пример текста для подсчёта токенов. Сколько токенов будет в этом тексте?"
    model = "gpt-4"
    print(f"Количество токенов для модели {model}: {count_tokens(sample_text, model)}")