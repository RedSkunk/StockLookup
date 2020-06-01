import React from "react";
import { Route, Switch } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { DragDropContext } from 'react-beautiful-dnd';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./app.css";

import TopBar from "./component/top-bar/topBar";
import StockIndex from "./component/stock-index/stockIndex";
import LorenIpsum from "./component/loren-ipsum/lorenIpsum";

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faHome, faSearch, faCode, faChalkboardTeacher, faArrowDown, faClock} from '@fortawesome/free-solid-svg-icons';
// library.add(faHome);
// library.add(faSearch);
// library.add(faCode);
// library.add(faChalkboardTeacher);
// library.add(faArrowDown);
// library.add(faClock);

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stockIndexes: []
        };
        this.onDragEnd = this.onDragEnd.bind(this);
        // console.log(this.getDummyArrayOfLength(10));
    }

    componentDidMount() {
        let stockIndexes = [{ name: "a", stocks: this.getDummyArrayOfLength(2) }, 
            { name: "b", stocks: this.getDummyArrayOfLength(3) },
            { name: "c", stocks: this.getDummyArrayOfLength(4) },
            { name: "d", stocks: this.getDummyArrayOfLength(5) },
            { name: "e", stocks: this.getDummyArrayOfLength(6) }];
        this.appendDndIdForStocks(stockIndexes);
        this.appendDndIdForIndexes(stockIndexes);

        this.setState({
            stockIndexes: stockIndexes
        });
    }

    // append unique id required by dnd, this id is used exlusively for dnd
    // return next id
    appendDndIdForStocks(stockIndexes) {
        let dndId = 0;
        for (const stockIndex of stockIndexes) {
            for (const stock of stockIndex.stocks) {
                stock.dndId = dndId;
                dndId++;
            }
        }
        return dndId;
    }
    // dndId for index, starts at 10000
    appendDndIdForIndexes(stockIndexes) {
        let dndId = 10000;
        for (const stockIndex of stockIndexes) {
            stockIndex.dndId = dndId;
            dndId++;
        }
        return dndId;
    }

    getDummyArrayOfLength(count) {
        return Array.from({ length: count }, (v, k) => k).map(k => ({
            id: `item-${k}`,
            content: `item ${k}`
        }));
    }

    onDragEnd(result) {
        if (!result.destination) {
            return;
        }
        console.log(result);

        this.handleStockDrag(result);
    }

    handleStockDrag(result) {
        let stockIndexesClone = Array.from(this.state.stockIndexes);
        const sourceDroppableId = parseInt(result.source.droppableId)-10000;
        const sourceIndex = result.source.index;
        const destDroppableId = parseInt(result.destination.droppableId)-10000;
        const destIndex = result.destination.index;

        // regardless of same list or different list movement
        // source has to be spliced
        let sourceClone = Array.from(this.state.stockIndexes[sourceDroppableId].stocks);
        const [removed] = sourceClone.splice(sourceIndex, 1);
        if (sourceDroppableId === destDroppableId) { // move within same list
            sourceClone.splice(destIndex, 0, removed);
            stockIndexesClone[sourceDroppableId].stocks = sourceClone;
        } else { // move to different list
            let destClone = Array.from(this.state.stockIndexes[destDroppableId].stocks);
            destClone.splice(destIndex, 0, removed);
            stockIndexesClone[sourceDroppableId].stocks = sourceClone;
            stockIndexesClone[destDroppableId].stocks = destClone;
        }

        this.setState({
            stockIndexes: stockIndexesClone
        }, () => console.log(this.state.stockIndexes));
    }

    // handleStockIndexDrag(result) {
    //     let stockIndexesClone = Array.from(this.state.stockIndexes);
    //     const sourceIndex = result.source.index;
    //     const destIndex = result.destination.index;

    //     const [removed] = stockIndexesClone.splice(sourceIndex, 1);
    //     stockIndexesClone.splice(destIndex, 0, removed);

    //     this.setState({
    //         stockIndexes: stockIndexesClone
    //     }, () => console.log(this.state.stockIndexes));
    // }

    render() {
        return (
            <div>
                <TopBar />  
                
                <div className="main-content">
                    <div className="row">
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            { this.state.stockIndexes.map((stockIndex, index) => (              
                                <StockIndex key={index} stockIndex={stockIndex}/>
                            )) }
                        </DragDropContext>     
                    </div>   
                </div>
            </div>
        );
    }
}

export default App;
