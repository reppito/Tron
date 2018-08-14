class LoadMap extends React.Component {
    constructor (props) {
        super(props)
        $("#file-div").css("display", "flex")
    }

    render () {
        return (
            <button type="button" className="btn btn-primary" onClick={() => this.props.loaded(false)}>Load</button>
        )
    }
}

class Game extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            load: false
        }
        this.startGame = this.startGame.bind(this)
        this.startEdithor = this.startEdithor.bind(this)
        this.loadMap = this.loadMap.bind(this)
        this.readFile = this.readFile.bind(this)
    }

    readFile (e) {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onload = (e) => {
            let date = new Date()
            date.setTime(date.getTime() + (24*60*60*1000))
            const expires = "expires" + date.toUTCString()
            document.cookie = "map" + "=" + e.target.result + ";" + expires + ";path=/"
        }
        reader.readAsText(file)

        

        /*var name = "map ="
        var decodedCookie = decodeURIComponent(document.cookie)
        var ca = decodedCookie.split(';')
        for(var i = 0; i <ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            console.log (c.substring(name.length, c.length))
        }
    }
    return "";*/
    }

    startGame (ia) {
        if (ia) {
            window.location = "gameia.html"
        } else {
            window.location = "game.html"
        }
        
    }

    startEdithor () {
        ReactDOM.render(
            <Editor />,
            document.getElementById('root')
        )
    }

    loadMap () {
        if (!status) {
            $("#file-div").css("display", "none")
        }
        this.setState({
            load: !this.state.load
        })
    }

    render  () {
        return(
            <div className="text-center">
                <label style={{fontSize: "50px"}}><strong>Tron</strong></label>
                <br />
                <br />
                <button className="btn btn-primary" onClick={() => this.startGame(false)}>Start 1v1</button>
                <br />
                <br />
                <button className="btn btn-primary" onClick={() => this.startGame(true)}>Start 1vAI</button>
                <br />
                <br />
                <button className="btn btn-secondary" onClick={this.startEdithor}>Make Map</button>
                <br />
                <br />
                <div id="load">
                    {this.state.load ?
                        <LoadMap loaded={this.loadMap}/>
                        :
                        <button className="btn btn-secondary" onClick={this.loadMap}>Load Map</button>
                    }
                </div>
                <div id="file-div" style={{display: "none"}}>
                    <input id="file" type="file" onChange={this.readFile}/>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
)