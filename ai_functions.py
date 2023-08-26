from marvin import ai_fn, ai_model
from pydantic import BaseModel

class State(BaseModel):
  description: str
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

@ai_fn
def create_initial_state(player1_description: str, player2_description: str) -> State:
  """
  Generate an initial `State` for two players based upon `player1_description` and `player2_description`.
  The states are for a text games where players will type their actions and a system will evaluate their effect.
  The players are competing to get hold of a golden idol.
  The scene is a Roman Colosseum in a fantasy world, but players can pick characters from anywhere.
  The characters need to be balanced so make sure that if one player has an advantage in one aspect, it is balanced by a corresponding strength for the other player in another. 

  `description`: str: sets the scene between the characters, describes the location of the golden idol, talks about the crowd and the colosseum, the objectives and generally creates hype.

  `player1_character_short_name`: str: Represents a one or two word description of Player 1, taken from `player1_description`
  `player1_health`: int: Represents the health points of Player 1. When this value reaches zero, Player 1 is considered defeated.
  `player1_endurance`: int: Denotes the endurance or stamina of Player 1, used to perform physical actions like attacking or defending.
  `player1_mana`: int: Indicates the magical energy, or mana, available to Player 1 for casting spells.
  `player1_spells`: list[str]: A list of the spells that Player 1 can cast. Each spell consumes a certain amount of mana.
  `player1_weapons`: list[str]: A list containing the weapons available to Player 1. Each weapon may have different properties like damage or range.
  `player1_idol_turn_count`: int: The number of turns for which Player 1 has held the idol. Starts at 0.
  
  `player2_character_short_name`: str: Represents a one or two word description of Player 2, taken from `player2_description`
  `player2_health`: int: Represents the health points of Player 2. When this value reaches zero, Player 2 is considered defeated.
  `player2_endurance`: int: Denotes the endurance or stamina of Player 2, used to perform physical actions like attacking or defending.
  `player2_mana`: int`: Indicates the magical energy, or mana, available to Player 2 for casting spells.
  `player2_spells`: list[str]: A list of the spells that Player 2 can cast. Each spell consumes a certain amount of mana.
  `player2_weapons`: list[str]: A list containing the weapons available to Player 2. Each weapon may have different properties like damage or range.
  `player2_idol_turn_count`: int: The number of turns for which Player 2 has held the idol. Starts at 0.
  """

@ai_fn
def update_states(current_state: State, player1_action: str, player2_action) -> State:
  """
  Generate a new `State` based upon `description`, `current_state`, `player1_action` and `player2_action`.
  
  This is the schema of `State`:

  `description`: str: provides a description of the battle based upon the last `description` and `player1_action` and `player2_action`; creates hype, describes how the players interacted. 

  `player1_character_short_name`: str: Represents a one or two word description of Player 1, taken from `player1_description`
  `player1_health`: int: Represents the health points of Player 1. When this value reaches zero, Player 1 is considered defeated.
  `player1_endurance`: int: Denotes the endurance or stamina of Player 1, used to perform physical actions like attacking or defending.
  `player1_mana`: int: Indicates the magical energy, or mana, available to Player 1 for casting spells.
  `player1_spells`: list[str]: A list of the spells that Player 1 can cast. Each spell consumes a certain amount of mana.
  `player1_weapons`: list[str]: A list containing the weapons available to Player 1. Each weapon may have different properties like damage or range.
  `player1_idol_turn_count`: int: The number of turns for which Player 1 has held the idol. Starts at 0.
  
  `player2_character_short_name`: str: Represents a one or two word description of Player 2, taken from `player2_description`
  `player2_health`: int: Represents the health points of Player 2. When this value reaches zero, Player 2 is considered defeated.
  `player2_endurance`: int: Denotes the endurance or stamina of Player 2, used to perform physical actions like attacking or defending.
  `player2_mana`: int`: Indicates the magical energy, or mana, available to Player 2 for casting spells.
  `player2_spells`: list[str]: A list of the spells that Player 2 can cast. Each spell consumes a certain amount of mana.
  `player2_weapons`: list[str]: A list containing the weapons available to Player 2. Each weapon may have different properties like damage or range.
  `player2_idol_turn_count`: int: The number of turns for which Player 2 has held the idol. Starts at 0.

  Figure out how the actions should influence the states, be creative.
  If a player tries to do something that their player character can't do based upon its stats, it should fail and describe how it failed.
  Increment the idol_turn_count for a player if they held the idol during the turn.
  """

@ai_fn
def check_winner(current_state: State) -> int:
  """
   Check if a player won based upon `current_state`.

   Return 0 if neither player has lost (game ongoing).
   Return 1 if Player 1 has won and Player 2 has lost (Player 1 wins).
   Return 2 if Player 2 has won and Player 1 has lost (Player 2 wins).
   Return 3 if Player 2 has won and Player 1 has won or if both players have lost (tie).

   A player wins if it has held the idol for 3 turns.
   A player wins and the other player loses if that player has > 0 health and the other player has zero health.
   A player loses if the player has 0 health.
  
  This is the schema of `State`:

  `description`: str: provides a description of the battle based upon the last `description` and `player1_action` and `player2_action`; creates hype, describes how the players interacted. 

  `player1_character_short_name`: str: Represents a one or two word description of Player 1, taken from `player1_description`
  `player1_health`: int: Represents the health points of Player 1. When this value reaches zero, Player 1 is considered defeated.
  `player1_endurance`: int: Denotes the endurance or stamina of Player 1, used to perform physical actions like attacking or defending.
  `player1_mana`: int: Indicates the magical energy, or mana, available to Player 1 for casting spells.
  `player1_spells`: list[str]: A list of the spells that Player 1 can cast. Each spell consumes a certain amount of mana.
  `player1_weapons`: list[str]: A list containing the weapons available to Player 1. Each weapon may have different properties like damage or range.
  `player1_idol_turn_count`: int: The number of turns for which Player 1 has held the idol. Starts at 0.
  
  `player2_character_short_name`: str: Represents a one or two word description of Player 2, taken from `player2_description`
  `player2_health`: int: Represents the health points of Player 2. When this value reaches zero, Player 2 is considered defeated.
  `player2_endurance`: int: Denotes the endurance or stamina of Player 2, used to perform physical actions like attacking or defending.
  `player2_mana`: int`: Indicates the magical energy, or mana, available to Player 2 for casting spells.
  `player2_spells`: list[str]: A list of the spells that Player 2 can cast. Each spell consumes a certain amount of mana.
  `player2_weapons`: list[str]: A list containing the weapons available to Player 2. Each weapon may have different properties like damage or range.
  `player2_idol_turn_count`: int: The number of turns for which Player 2 has held the idol. Starts at 0.

  Figure out how the actions should influence the states, be creative.
  If a player tries to do something that their player character can't do based upon its stats, it should fail and describe how it failed.
  Increment the idol_turn_count for a player if they held the idol during the turn.
  """
