import React, { Component } from 'react'
import produce from 'immer'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  componentDidMount() {
    let matrix = []

    for (let i = 0; i < 20; i++) {
      matrix[i] = []
    }

    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        matrix[i][j] = 0
      }
    }

    this.setState({
      grid: matrix,
      gridHeight: 20,
      girdWidth: 20
    })
  }

  stepOneGeneration = () => {
    //for each cell in each row, check if the 8 neighboring cells states are alive or dead.
    // keep a neighbor count
    // if alive:
    //  if the neighbor count is < 2: change cell's state to dead
    //  if the neighbor count is === 2 || 3: keep cell's state as alive
    //  if the neighborCount > 3: chance cell's state to dead
    // if dead:
    //  if neighbor count === 3 (make sure to check all), change cell state to alive
    //check neighbor states
    //top left
    //   this.state.grid[i - 1][j - 1]
    // //top center
    //   this.state.grid[i - 1][j]
    // //top right
    //   this.state.grid[i - 1][j + 1]
    // //right center
    //   this.state.grid[i][j + 1]

    // //bottom right
    //   this.state.grid[i + 1][j + 1]
    // //bottom center
    //   this.state.grid[i + 1][j]
    // //bottom left
    //   this.state.grid[i + 1][j - 1]

    // //left center
    //   this.state.grid[i][j - 1]
    let newGrid = []
    for (let i = 0; i < this.state.gridHeight; i++) {
      newGrid[i] = []
    }

    for (let i = 0; i < this.state.gridHeight; i++) {
      for (let j = 0; j < this.state.gridWidth; j++) {
        newGrid[i][j] = 0
      }
    }

    for (let i = 0; i < this.state.grid.length; i++) {
      for (let j = 0; j < this.state.grid.length; j++) {
        let neighborCount = 0
        //check neighboring cells
        neighborCount =
          this.getCellValueSafe(this.state.grid, i - 1, j - 1) +
          this.getCellValueSafe(this.state.grid, i - 1, j) +
          this.getCellValueSafe(this.state.grid, i - 1, j + 1) +
          this.getCellValueSafe(this.state.grid, i, j + 1) +
          this.getCellValueSafe(this.state.grid, i + 1, j + 1) +
          this.getCellValueSafe(this.state.grid, i + 1, j) +
          this.getCellValueSafe(this.state.grid, i + 1, j -1) +
          this.getCellValueSafe(this.state.grid, i, j - 1) 

        //if dead
        if (this.state.grid[i][j] === 0) {
          // let grid = this.state.grid
          //check to see if 3 neighbors are alive
          if (neighborCount === 3) {
            console.log('change to alive!')
            newGrid[i][j] = 1
          }
          neighborCount = 0
        }

        //if alive
        if (this.state.grid[i][j] === 1) {
          if (neighborCount < 2) {
            console.log('change to ded')
            newGrid[i][j] = 0
          }
          if (neighborCount === 2 || neighborCount === 3) {
            console.log('keep on living')
            newGrid[i][j] = 1
          }
          if (neighborCount > 3) {
            console.log('change to ded')
            newGrid[i][j] = 0
          }
          neighborCount = 0
        }
      }
    }
    
    // this.updateBoard(this.state.grid, newGrid)
    this.setState({ grid: newGrid })
  }

  getCellValueSafe = (grid, i, j) => {
    const row = grid[i]
    if (!row) return 0 
    const value = grid[i][j]
    if (!value) return 0 
    return value 
  }

  // updateBoard = (currentGrid, newGrid) => {
  //   console.log(newGrid)

  //   this.setState({ grid: newGrid })

  //   this.setState(produce(draft => {
  //     draft.grid = newGrid
  //   }))

  // }

  toggleLife = (row, cell) => {
    let currentCell = this.state.grid[row][cell]
    console.log('toggle life, current cell', 'row:', row, 'col', cell)

    if (currentCell === 0) {
      // this.setState(state => produce((state, draft) => { draft.grid[row][cell] = 1 }))

      this.setState(
        produce(draft => {
          draft.grid[row][cell] = 1
        })
      )
    }
    if (currentCell === 1) {
      this.setState(
        produce(draft => {
          draft.grid[row][cell] = 0
        })
      )
    }
  }

  updateGridDimensions = (dimension, sliderValue) => {
    
    console.log("slider value:", sliderValue)
    if(dimension === "width"){
      this.setState({gridWidth: sliderValue})
                    // height               width
      this.drawGrid(this.state.gridHeight, sliderValue)
    }
    if(dimension === "height"){
      this.setState({ gridHeight: sliderValue })
                    // height      width
      this.drawGrid(sliderValue, this.state.gridWidth)
    }
  }

  drawGrid = (height, width) => {
    let newGrid = []
    for (let i = 0; i < height; i++) {
      newGrid[i] = []
    }

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        newGrid[i][j] = 0
      }
    }

    this.setState({ grid: newGrid })
  }

  state = {
    grid: [],
    gridHeight: 20,
    gridWidth: 20
  }

  render() {
    return <div className="App">
        <h1 className="title">Conway's Game of Life</h1>
        <div className="game">
          <div className="gridAdjuster">
            <div className="adjusterTitle">width: {this.state.gridWidth}</div>
            <input type="range" min="1" max="50" step="1" value={this.state.gridWidth} onChange={e => this.updateGridDimensions('width', e.target.value)} />
          </div>
          <div className="gridAdjuster">
            <div className="adjusterTitle">height: {this.state.gridHeight}</div>
            <input type="range" min="1" max="50" step="1" value={this.state.gridHeight} onChange={e => this.updateGridDimensions('height', e.target.value)} />
          </div>
          <button className="stepButton" onClick={this.stepOneGeneration}>
            step
          </button>
          <div className="grid">
            {this.state.grid.length > 0 ? this.state.grid.map(
                (row, rowIndex) => {
                  return (
                    <div
                      key={rowIndex}
                      style={{
                        padding: '0px',
                        margin: '0px',
                        lineHeight: '10px'
                      }}
                    >
                      {row.map((cell, cellIndex) => {
                        return (
                          <Cell
                           key={cellIndex}
                            isAlive={cell}
                            toggleLife={this.toggleLife}
                            row={rowIndex}
                            col={cellIndex}
                          />
                        )
                      })}
                    </div>
                  )
                }
              ) : <div />}
          </div>
        </div>
      </div>
  }
}

export default App

class Cell extends Component {
  static propTypes = {
    isAlive: 'number',
    row: 'number',
    col: 'number',
    toggleLife: 'func'
  }
  render() {
    let color = 'white'
    {
      this.props.isAlive === 0 ? (color = 'white') : (color = 'black')
    }
    return (
      <div
        onClick={() => this.props.toggleLife(this.props.row, this.props.col)}
        style={{
          display: 'inline-block',
          width: '20px',
          height: '20px',
          padding: '0px',
          backgroundColor: color,
          border: '1px solid black'
        }}
      />
    )
  }
}

// user create own grid size
let grid2 = (rows, columns) => {
  let defaultValue = 20
  if (!rows && columns) {
    rows = 20
    columns = 20
  }
  if (!columns) {
    columns = rows
  }
  let arr = new Array(rows)
  for (let i = 0; i < arr.length - 1; i++) {
    arr[i] = new Array(columns)
  }
  return arr
}

//check if neighbors' state is true or false
