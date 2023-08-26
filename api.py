from flask import Flask, request, jsonify
from pydantic import BaseModel
from ai_functions import create_initial_state, update_state, check_winner

app = Flask(__name__)

# Define the State class
class State(BaseModel):
    description: str
    current_turn: int
    player1_character_short_name: str
    player1_health: int
    player1_endurance: int
    player1_mana: int
    player1_spells: list[str]
    player1_weapons: list[str]
    player1_idol_turn_count: int
    player2_character_short_name: str
    player2_health: int
    player2_endurance: int
    player2_mana: int
    player2_spells: list[str]
    player2_weapons: list[str]
    player2_idol_turn_count: int

@app.route('/create_game', methods=['POST'])
def create_game():
    data = request.get_json()
    player1_description = data.get('player1_description')
    player2_description = data.get('player2_description')
    
    initial_state = create_initial_state(player1_description, player2_description)
    return jsonify(initial_state.dict())

@app.route('/take_turn', methods=['POST'])
def take_turn():
    data = request.get_json()
    state_data = data.get('state')
    player1_action = data.get('player1_action')
    player2_action = data.get('player2_action')
    
    current_state = State(**state_data)
    updated_state = update_state(current_state, player1_action, player2_action)
    return jsonify(updated_state.dict())

@app.route('/winner', methods=['POST'])
def winner():
    data = request.get_json()
    state_data = data.get('state')
    
    current_state = State(**state_data)
    winner_state = check_winner(current_state)
    
    return jsonify({"winner_state": winner_state})

if __name__ == '__main__':
    app.run(debug=True)

