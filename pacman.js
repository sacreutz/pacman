function translate (x, y, array){
    let indices = []

    let first = array.length - y
    indices.push(first)
    let second = x - 1
    indices.push(second)

    return indices

  }

  function translate2 (rowIndex, columnIndex, array){
    let coordinates = []

    let xValue = columnIndex + 1

    coordinates.push(xValue)

    let yValue = array.length - rowIndex

    coordinates.push(yValue)

    return coordinates


  }

  function pacman(inputFile){

  var fs = require('fs');


   let grid = [];



   var contents = fs.readFileSync(inputFile, 'utf8');
   var lines = contents.split('\n')


   let height = Number(lines[0][2])
  let width = Number(lines[0][0])

  console.log(height, 'height')

  function makeGrid(numColumns, numRows) {
   //

    // each iteration of the outer for loop creates and adds a new row to the grid
    for (let i = 0; i < numRows; i++) {

      // create a new row
      let row = [];

      // each iteration of the inner loop adds a new column/cell to the new row
      for (let j = 0; j < numColumns; j++) {


        //row.push([numRows - i, j + 1]);
        // row.push([j + 1, numRows - i])
        row.push(1)

      }

      // push the new row into the grid
      grid.push(row);
    }

  //place starting point indicator
  let startingCoordinates = lines[1].split(' ')
  let startingX = Number(startingCoordinates[0])
  let startingY = Number(startingCoordinates[1])
  console.log(startingCoordinates, 'startingCoordinates')


  let startingPosition = translate(startingX, startingY, grid)
  console.log(startingPosition, 'startingPosition')
  grid[startingPosition[0]][startingPosition[1]] = 'S'
  let walls =  lines.slice(3);


  walls.forEach(wall => {
    let height2 = Number(lines[0][2])
       console.log(wall)
       console.log(height2, 'height2')
       if (wall[0] !== '0' && wall[2] !== '0'){
       let x = Number(wall[0]) - 1
       let y = height2 - Number(wall[2])
       console.log(y)
       console.log(Number(wall[2]))
       grid[y][x] = 'W'
       }
   })
         console.log(lines, 'lines');
        console.log(grid, 'grid with walls')

        return grid

  }

  makeGrid(width, height)

  let directions = lines[2]
  console.log(directions, 'directions')
  let startingCoordinates = lines[1].split(' ')


  let startingX = Number(startingCoordinates[0])
  let startingY = Number(startingCoordinates[1])

  let startingPosition = translate(startingX, startingY, grid)


  //startingRowIndex = which array are we on
  //startingColumnIndex = which index in that array

  function travel(startingRowIndex, startingColumnIndex, directions) {
    let returnArray = []

    let startRow = startingRowIndex
    let startColumn = startingColumnIndex
    let coins = 0;
    for (let i = 0; i < directions.length; i++) {
      console.log('coins', coins)
       console.log(startColumn, 'startColumn')
       console.log(startRow, 'startRow')
      let element = directions[i]
      if (element === 'N' && startRow > 0 && grid[startRow - 1][startColumn] !== 'W'){
        startRow -= 1;

        if (grid[startRow][startColumn] !== 'W' && grid[startRow][startColumn] !== 'S'){
        coins += Number(grid[startRow][startColumn]);
        grid[startRow][startColumn] = 0;
        }
        }

       else if (element === 'W' && startColumn > 0 && grid[startRow][startColumn - 1] !== 'W'){
            startColumn -= 1


             if (grid[startRow][startColumn + 1] !== 'W' && grid[startRow][startColumn] !== 'S'){
            coins += Number(grid[startRow][startColumn]);
        grid[startRow][startColumn] = 0;
       }
       }
       else if (element === 'S' && startRow < (height - 1) && grid[startRow + 1][startColumn] !== 'W'){
          startRow += 1

           if (grid[startRow][startColumn] !== 'W' && grid[startRow][startColumn] !== 'S'){
         coins += Number(grid[startRow][startColumn]);
        grid[startRow][startColumn] = 0;
        }
       }
        else if (element === 'E' && startColumn < (width - 1) && grid[startRow][startColumn + 1] !== 'W') {
          startColumn += 1

             if (grid[startRow][startColumn] !== 'W' && grid[startRow][startColumn] !== 'S'){
           coins += Number(grid[startRow][startColumn]);
        grid[startRow][startColumn] = 0;
              }
        }
        }


      let finalCoordinates = translate2(startRow, startColumn, grid)
      console.log(startRow, startColumn, 'after for loop')
      returnArray.push(finalCoordinates[0], finalCoordinates[1], coins)
        console.log(returnArray, 'returnArray')
      return returnArray;
    }


 return travel(startingPosition[0], startingPosition[1], directions)
}

 try

 {
   pacman('input.txt')
 }

 catch (e) {

  return [-1, -1, 0]

 }
