import params from './params'

const createEmptyBoard = (rows, columns) => {

    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row,
                column,
                opened: false,
                mined: false,
                flag: false,
                exploded: false,
                nearMines: 0
            }
        })

    })

}

const generateMines = (board, minesAmount) => {
    const rows = board.length
    const columns = board[0].length

    let minesPlanted = 0

    while (minesPlanted < minesAmount) {
        const rowCel = parseInt(Math.random() * rows, 10)
        const columnCel = parseInt(Math.random() * columns, 10)

        if (!board[rowCel][columnCel].mined) {

            board[rowCel][columnCel].mined = true
            minesPlanted++
        }
    }
}

const createBoard = (rows, columns, minesAmount) => {

    const board = createEmptyBoard(rows, columns)
    generateMines(board, minesAmount)
    return board
}

const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field }
        })
    })
}

const getNeighbors = (board, row, column) => {

    const neighbors = []
    const rows = [row - 1, row, row + 1]
    const columns = [column - 1, column, column + 1]

    rows.forEach(r => {
        columns.forEach(c => {
            const diferent = row !== r || column !== c
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length
            if (diferent && validColumn && validRow) {
                neighbors.push(board[r][c])
            }
        })
    })

    return neighbors

}

const safeNeighborhood = (board, row, column) => {
    const safes = (result, neighbor) => result && !neighbor.mined
    return getNeighbors(board, row, column).reduce(safes, true)
}

const openField = (board, row, column) => {
    const field = board[row][column]

    if (!field.opened) {
        field.opened = true
        if (field.mined) {
            field.exploded = true
        } else if (safeNeighborhood(board, row, column)) {
            getNeighbors(board, row, column)
                .forEach(n => openField(board, n.row, n.column))

        } else {
            const neighbors = getNeighbors(board, row, column)
            field.nearMines = neighbors.filter(n => n.mined).length
        }
    }
}

const fields = board => [].concat(...board)

const hasExplosion = board => fields(board)
    .filter(field => field.exploded).length > 0

const pendding = field => (field.mined && !field.flag)
    || (!field.mined && !field.opened)

const wonGame = board => fields(board).filter(pendding).length === 0

const showMines = board => fields(board).filter(field => field.mined)
    .forEach(field => field.opened = true)

const invertFlag = (board, row, column) => {
    const field = board[row][column]
    field.flag = !field.flag
}

const flagsUsed = board => fields(board)
    .filter(field => field.flag).length

const minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.dificultLevel)
}

const createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
        board: createBoard(rows, cols, minesAmount()),
        won: false,
        lost: false,
        disableBoard: false,
        showConfiguration:false
    }
}

export {
    cloneBoard,
    openField,
    hasExplosion,
    wonGame,
    showMines,
    invertFlag,
    flagsUsed,
    createState,
    minesAmount
}