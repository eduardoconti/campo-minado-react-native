import { Dimensions } from 'react-native'

const params ={ 
    blockSize: 30,
    borderSize: 3,
    fontSize: 15,
    headerRatio: 0.15,
    dificultLevel: 0.1,
    height:Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    getColumnsAmount(){

        return Math.floor( this.width/this.blockSize)
    },
    getRowsAmount() {
      
        const boardHeigh = this.height * ( 1 - this.headerRatio )
        return Math.floor( boardHeigh/this.blockSize)
    }

}

export default params