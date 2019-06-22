#!/usr/bin/env python
"""
Generate bracket layout from starting number of unique teams
"""
from pprint import pprint
import sys
from typing import Dict, List

example_layouts = {
  2: {1: 1},
  4: {1: 2, 2: 1},
  6: {1: 3, 2: 2, 3: 1},
  8: {1: 4, 2: 2, 3: 1},

  10: {1: 2, 2: 4, 3: 2, 4: 1},
  12: {1: 4, 2: 4, 3: 2, 4: 1},
  14: {1: 6, 2: 4, 3: 2, 4: 1},
  16: {1: 8, 2: 4, 3: 2, 4: 1},

  18: {1: 2, 2: 8, 3: 4, 4: 2, 5: 1},
  20: {1: 4, 2: 8, 3: 4, 4: 2, 5: 1},
  22: {1: 6, 2: 8, 3: 4, 4: 2, 5: 1},
  24: {1: 8, 2: 8, 3: 4, 4: 2, 5: 1},
  26: {1: 10, 2: 8, 3: 4, 4: 2, 5: 1},
  28: {1: 12, 2: 8, 3: 4, 4: 2, 5: 1},
  30: {1: 14, 2: 8, 3: 4, 4: 2, 5: 1},
  32: {1: 16, 2: 8, 3: 4, 4: 2, 5: 1},

  34: {1: 2, 2: 16, 3: 8, 4: 4, 5: 2, 6: 1},
  36: {1: 4, 2: 16, 3: 8, 4: 4, 5: 2, 6: 1},
  38: {1: 6, 2: 16, 3: 8, 4: 4, 5: 2, 6: 1},
  40: {1: 8, 2: 16, 3: 8, 4: 4, 5: 2, 6: 1},
  42: {1: 10, 2: 16, 3: 8, 4: 4, 5: 2, 6: 1},
  44: {1: 12, 2: 16, 3: 8, 4: 4, 5: 2, 6: 1},
  46: {1: 14, 2: 16, 3: 8, 4: 4, 5: 2, 6: 1},
  48: {1: 16, 2: 16, 3: 8, 4: 4, 5: 2, 6: 1},
  50: {1: 18, 2: 16, 3: 8, 4: 4, 5: 2, 6: 1},
  52: {1: 20, 2: 16, 3: 8, 4: 4, 5: 2, 6: 1},
  54: {1: 22, 2: 16, 3: 8, 4: 4, 5: 2, 6: 1},
  56: {1: 24, 2: 16, 3: 8, 4: 4, 5: 2, 6: 1},
  58: {1: 26, 2: 16, 3: 8, 4: 4, 5: 2, 6: 1},
  60: {1: 28, 2: 16, 3: 8, 4: 4, 5: 2, 6: 1},
  62: {1: 30, 2: 16, 3: 8, 4: 4, 5: 2, 6: 1},
  64: {1: 32, 2: 16, 3: 8, 4: 4, 5: 2, 6: 1},
}

def generate_bracket(team_count: int) -> Dict[int, int]:
    """Generate bracket layout from starting number of unique teams"""
    round = 1
    layout = {}
    exceptions = {
        0: {1: 0},
        2: {1: 1},
        4: {1: 2, 2: 1},
        6: {1: 3, 2: 2, 3: 1},
        8: {1: 4, 2: 2, 3: 1},
    }

    if team_count < 0:
        raise ValueError("Team count cannot be negative")

    if team_count % 2 != 0:
        team_count += 1

    if exceptions.get(team_count, None):
        return exceptions[team_count]

    nearest_sixteen = 16
    while nearest_sixteen < team_count:
        nearest_sixteen *= 2
    nearest_sixteen //= 2

    layout[1] = team_count - (nearest_sixteen % team_count)
    round += 1
    nearest_sixteen //= 2
    while nearest_sixteen >= 1:
        layout[round] = nearest_sixteen
        nearest_sixteen //= 2
        round += 1
    return layout

def format_bracket(teams: List[str] = None) -> List[List[Dict[str, str]]]:
    if teams is None:
        teams = [
            "Duke",
            "Albany",
            "Colorado State",
            "Harvard",
            "Oklahoma State",
            "Oregon",
            "Saint Louis",
            "New Mexico State",
            "Memphis",
            "St. Mary's",
            "Michigan State",
            "Valparaiso",
            "Creighton",
            "Cincinnati",
        ]
    structure = generate_bracket(len(teams))
    rounds = {}
    pos = 0
    for round, num_of_teams in structure.items():
        rounds[round] = []
        num_of_teams *= 2
        if len(teams[pos:num_of_teams+pos]) < num_of_teams:
            for _ in range( num_of_teams - len(teams[pos:num_of_teams+pos]) ):
                rounds[round] += ['']
        rounds[round] += teams[pos:num_of_teams+pos]
        pos += num_of_teams
    return rounds


if __name__ == "__main__":
    # print(generate_bracket(int(sys.argv[1])))
    pprint(format_as_bracket())
