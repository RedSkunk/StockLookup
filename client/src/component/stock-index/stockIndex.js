import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

class StockIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-xl-3 col-md-6 col-sm-12">
                <div className="card">
                    <div className="card-body">
                        
                        <Droppable droppableId={this.props.stockIndex["dndId"].toString()} type="stock">
                            { (provided, snapshot) => (
                                <div ref={provided.innerRef} {...provided.droppableProps} >
                                    { this.props.stockIndex.stocks.map((stock, index) => (
                                        <Draggable key={stock["dndId"].toString()} draggableId={stock["dndId"].toString()} index={index}>
                                            {(provided, snapshot) => (
                                                <div ref={provided.innerRef}  {...provided.draggableProps} {...provided.dragHandleProps} 
                                                        className="stock-ticker">
                                                    {stock.content}
                                                </div>
                                            )}
                                        </Draggable>
                                    )) }
                                    {provided.placeholder}
                                </div>
                            ) }
                        </Droppable>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default StockIndex;
