import openai
import os
from dotenv import load_dotenv
import json
import nltk
import random

load_dotenv()

openai.api_key = os.getenv('OPENAI_API_KEY')
nltk.download('words')
word_list = nltk.corpus.words.words()


def generate_random_word():
    return random.choice(word_list)

def start_conversation():
    seed = generate_random_word()
    print("Seed word that informs the scenario:  ", seed + "\n------------------------")
    messages = [
        {"role": "system", "content": "You are a battle game host in a world where anything is possible. Your task is to create a unique battle scenario where two entities compete against each other. This could be anything from a Roman gladiator deathmatch to a high-speed sprint race. Use the following word to inspire and inform the scenario: " + seed + " Rules look like: no entity can be immortal or omniscient. The entities will be defined later, so for now set the stage, create a detailed scenario and define the rules."},
    ]

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=messages,
        temperature=0.8
    )

    answer = response.choices[0].message.content
    print("------------------------\n", answer + "\n------------------------")

    messages.append({"role": "assistant", "content": answer})

    for i in range(1, 3):
        user_input = input(f"Enter a description of entity {i}: ")
        messages.append({"role": "user", "content": user_input})

    messages.append({"role": "system", "content": "Now, let the battle begin. Run a detailed simulation of the entities competing in the given scenario. Make sure there are no draws and provide an entertaining, yet believable sequence of events."})

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=messages,
        temperature=0.8
    )

    answer = response.choices[0].message.content
    print("------------------------\n", answer + "\n------------------------")

    messages.append({"role": "assistant", "content": answer})

    messages.append({"role": "system", "content": "Based on the simulation, declare a winner of the battle."})

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=messages,
        temperature=0
    )

    answer = response.choices[0].message.content
    print(answer + "\n------------------------")

if __name__ == "__main__":
    start_conversation()