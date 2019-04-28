Simple bracket component built in React

It supports an arbitrary number of starting teams, but ideally there are fewer than 128 in a single bracket (consider using 2+)

### Input Format
array of array of objects where the objects are structured `{"top": team1, "bottom": team2, "winnerPos": "top" OR "bottom"}`

## Features
- Automatically add blank teams
- Automatically restructures teams if too many are given in a single round
