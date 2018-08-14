const width = 27;
const height = 15;

var selectorClicked = false;
const images = [
    {
        img: <img src="static/sprites/base.png" />,
        name: 'empty'
    },
    {
        img: <img src="static/sprites/wall.png" />,
        name: 'wall'
    }
];

class editorControl {
    constructor() {
        this.editorTable = [];
        this.selector = 0;
        for (var i = 0; i < height; i++) {
            var row = [];
            for (var j = 0; j < width; j++) {
                row.push(0);
            }
            this.editorTable.push(row);
        }
    }

    setPosition(x, y) {
        if(selectorClicked) {
            this.editorTable[x][y] = this.type;
        }
    }

    set type(j) {
        this.selector = j;
        selectorClicked = true;
    }

    get type() {
        return this.selector;
    }

}

var ed = new editorControl();

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {imageSelector: 0};

        this.show = this.show.bind(this);
    }

    show() {
        this.props.onClicked(this.props.index);
        this.setState({imageSelector: ed.type});
    }

    render() {
        return (
            <div className="cell" onClick={this.show}>
                {images[this.state.imageSelector].img}
            </div>
        );
    }
}

class CellBase extends React.Component {
    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
    }

    show() {
        ed.type = this.props.type;   
    }

    render() {

        return (
            <tr>
                <td>{this.props.img.name}</td>
                <td className="cell" onClick={this.show}>
                    {this.props.img.img}
                </td>
            </tr> 
        );
    }
}

class Row extends React.Component {
    constructor(props) {
        super(props);
        this.position = this.position.bind(this);
    }

    position(j) { 
        ed.setPosition(this.props.index, j);
    }

    render() {
        var row = [];
        for (var i = 0; i < width; i++) {
            row.push(<Cell index={i} onClicked={this.position} key={i * Math.random()}/>);
        }
        return (
            <div className="rowG">
            {row}
            </div>
        );
    }
}

class Table extends React.Component {
    render() {
        var table = [];
        for(var i = 0; i < height; i++) {
            table.push(<Row index={i} key={i * Math.random()}/>);
        }
        return (
            <div id="table">
            {table}
            </div>
        );
    }
}

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount_acceleration: '',
            time_acceleration: '',
            area_acceleration: '',
            amount_deceleration: '',
            time_deceleration: '',
            area_deceleration: '',
            amount_trail: '',
            time_trail: '',
            length_trail: '',
        }
        this.resetSelection = this.resetSelection.bind(this);
        this.resetTable = this.resetTable.bind(this);
        this.show = this.show.bind(this);
    }

    resetSelection() {
        selectorClicked = false;
    }

    handleChange (key) {
        return (e) => {
            if (e.target.value > 0 || e.target.value === '')
                this.setState({
                    [key]: e.target.value
                })
        }
    }

    show() {
        console.log(ed.editorTable);
        console.log(this.state)
    }

    resetTable() {
        ed = new editorControl();
        this.props.reset();
    }
    render() {
        var cellBase = [];
        for (var i = 0; i < images.length; i++) {
            cellBase.push(<CellBase type={i} img={images[i]} key={i} />);
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="menu text-center">
                            <label><strong>Tileset</strong></label>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Img</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cellBase}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col">
                        <div className="menu">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Change</th>
                                        <th>Duration</th>
                                        <th>Area</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Acceleretion</td>
                                        <td>
                                            <input 
                                                id="amount_acceleration" 
                                                name="amount_acceleration" 
                                                className="form-control"
                                                type="number" 
                                                step=".01" 
                                                onChange={this.handleChange('amount_acceleration')}
                                                value={this.state.amount_acceleration}
                                                required  
                                            />
                                        </td>
                                        <td>
                                            <input 
                                                id="time_acceleration" 
                                                name="time_acceleration" 
                                                className="form-control"
                                                type="number" 
                                                step=".01" 
                                                onChange={this.handleChange('time_acceleration')}
                                                value={this.state.time_acceleration}
                                                required  
                                            />
                                        </td>
                                        <td>
                                            <input 
                                                id="area_acceleration" 
                                                name="area_acceleration" 
                                                className="form-control"
                                                type="number"
                                                onChange={this.handleChange('area_acceleration')}  
                                                value={this.state.area_acceleration}
                                                required  
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Deceleretion</td>
                                        <td>
                                            <input 
                                                id="amount_deceleration" 
                                                name="amount_deceleration" 
                                                className="form-control"
                                                type="number" 
                                                step=".01" 
                                                onChange={this.handleChange('amount_deceleration')}
                                                value={this.state.amount_deceleration}
                                                required  
                                            />
                                        </td>
                                        <td>
                                            <input 
                                                id="time_deceleration" 
                                                name="time_deceleration" 
                                                className="form-control"
                                                type="number" 
                                                step=".01" 
                                                onChange={this.handleChange('time_deceleration')}
                                                value={this.state.time_deceleration}
                                                required  
                                            />
                                        </td>
                                        <td>
                                            <input 
                                                id="area_deceleration" 
                                                name="area_deceleration" 
                                                className="form-control"
                                                type="number"
                                                onChange={this.handleChange('area_deceleration')}  
                                                value={this.state.area_deceleration}
                                                required  
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Trail Delete</td>
                                        <td>
                                            <input 
                                                id="amount_trail" 
                                                name="amount_trail" 
                                                className="form-control"
                                                type="number" 
                                                step=".01" 
                                                onChange={this.handleChange('amount_trail')} 
                                                value={this.state.amount_trail}
                                                required  
                                            />
                                        </td>
                                        <td>
                                            <input 
                                                id="time_trail" 
                                                name="time_trail" 
                                                className="form-control"
                                                type="number" 
                                                step=".01" 
                                                onChange={this.handleChange('time_trail')}
                                                value={this.state.time_trail}
                                                required  
                                            />
                                        </td>
                                        <td>
                                            <input 
                                                id="length_trail" 
                                                name="length_trail" 
                                                className="form-control"
                                                type="number"  
                                                onChange={this.handleChange('length_trail')}
                                                value={this.state.length_trail}
                                                required  
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col">
                        <div id="menu" className="menu text-center">
                            <button className="btn btn-default but">Guardar</button>
                            <button className="btn btn-default but" onClick={this.show} >Show</button>
                            <button className="btn btn-default but" onClick={this.resetTable} >Reiniciar</button>
                            <button className="btn btn-default but" onClick={this.resetSelection} >Cancelar Seleccion</button>
                            <button className="btn btn-default but">Salir</button> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Editor extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            table: () => <Table />
        }
        this.restart = this.restart.bind(this);
    }

    restart () {
        this.setState({
            table: () => <Table />
        })
    }
    render() {
        const ActiveTable = this.state.table;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <ActiveTable />
                    </div>
                    <div className="col">
                        <Menu reset={this.restart} />
                    </div>
                </div>
            </div>
        );
    }
}
ReactDOM.render (
    <Editor />,
    document.getElementById('root')
);