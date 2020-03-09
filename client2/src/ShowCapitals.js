import React from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';

class ShowCapitals extends React.Component {

    SortCapitalsDistance = (props) => {
        props.msg.sort(function (a, b) {
            return a.distance - b.distance;
        })

        let answer = [];
        answer[0] = "City, Distance";
        let i;
        for (i = 1; i<props.msg.length;i++){
            answer[i] = <p> {props.msg[i].cityName}, {props.msg[i].distance}  </p>
        }

        return (
            answer
        )
    }

    PrintCapitalsDistance = (props) => {
        let answer = [];
        answer[0] = "City, Distance";
        let i;
        for (i = 1; i<5;i++){
            answer[i] = <p> {props.msg[i].cityName}, {props.msg[i].distance}  </p>
        }

        return (
            answer
        )
    }

    showCapitals = (async () => {
        const response = await axios.get('cities')
        console.log(response.data)
        //ReactDOM.render(<this.PrintCapitalsDistance msg={response.data} />, document.getElementById('showDBInfo'));

        ReactDOM.render(<this.SortCapitalsDistance msg={response.data} />, document.getElementById('showDBInfoSorted'));
    })

    render() {
        return(
            <div>
                <button onClick={this.showCapitals} >Show Capitals</button>
            </div>
        )
    }
}