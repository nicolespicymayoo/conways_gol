# Conway's Game Of Life
Conway's Game of Life is game that represents the evolution of cells.

## Rules
The universe of these cells is a 2D grid. Each square in the grid represents a cell. The cell has two states: either alive or dead. At each step, or generation, each cell intracts with its neighbors to determine its next state. The next state is determined by the following rules:

1. Any live cell with fewer than two live neighbours dies (referred to as underpopulation or exposure[1]).
2. Any live cell with more than three live neighbours dies (referred to as overpopulation or overcrowding).
3. Any live cell with two or three live neighbours lives, unchanged, to the next generation.
4. Any dead cell with exactly three live neighbours will come to life.


The initial pattern of cells on the grid is created by a user. Births and deaths happen simultaneously at each 'step'. This step consitutes as a generation. A genereation is a pure funtion of the previous generation. The rules continue to be applied to create further generations. 

Many common patterns of cells emerge, and the results are usually suprising.
Enjoy!