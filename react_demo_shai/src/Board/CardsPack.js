import React, { Component } from 'react';
import { CardsModal } from './CardsModal'
import { storage } from '../pages/HomePage'

export class CardsPack extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            addModalShowForTask: false,
            gotlist: false,
            gotsurprise: false,
            list: [],
            surprises: [],
            topicName: "Shai's_topic",
            refs: [],
            sup_refs: [],
         }
         this.getCardsList = this.getCardsList.bind(this);
         this.onClick = this.onClick.bind(this);
         this.getSurpriseList = this.getSurpriseList.bind(this);
    }

    getCardsList = () => {
        if(this.state.gotlist){
            console.log(this.state.list)
            console.log("got list already")
            return;
        }
        let topic = this.state.topicName
        console.log("in here", this.props.gamedata)
        if(this.props.gamedata){
            console.log("got topic name from game data", this.props.gamedata.topic)
            topic = this.props.gamedata.topic
        }
        return storage.ref(`topics/${topic}`).listAll()
            .then((event) => {
                console.log(event.items)
                this.state.refs = event.items
                console.log(this.state.list)
            }).then(() => {
                let arr = []
                for (let j = 0; j < this.state.refs.length; j++) {
                    let obj = {}
                    this.state.refs[j].getDownloadURL()
                        .then(url => {
                            obj.url = url;
                        }).then(() => {
                            obj.name = this.state.refs[j].name.replace(".JPG", "").replace(".jpg", "").replace(".png", "")
                            obj.index = `${j + 1}`
                            arr.push(obj)
                            // this.setState({list: arr})
                            this.state.list = arr
                        }).then(()=>{
                            this.setState({
                                gotlist: true
                            })
                        });
                } 
                console.log(this.state)
                // console.log(this.state.counter)/
            });
    }

    getSurpriseList = () => {
        if(this.state.gotsurprise){
            console.log(this.state.surprises)
            console.log("got surprises already")
            return;
        }
        return storage.ref(`surprise/`).listAll()
            .then((event) => {
                console.log(event.items)
                this.state.sup_refs = event.items
                console.log(this.state.list)
            }).then(() => {
                let arr = []
                for (let j = 0; j < this.state.sup_refs.length; j++) {
                    let obj = {}
                    this.state.sup_refs[j].getDownloadURL()
                        .then(url => {
                            obj.url = url;
                        }).then(() => {
                            obj.board = false;
                            obj.name = this.state.sup_refs[j].name.replace(".JPG", "").replace(".jpg", "").replace(".png", "")
                            obj.index = `${j + 1}`
                            if (obj.name.startsWith("board")){
                                obj.board = true;
                            }
                            arr.push(obj)
                            // this.setState({list: arr})
                            this.state.surprises = arr
                        }).then(()=>{
                            this.setState({
                                gotsurprise: true
                            })
                        });
                } 
                console.log(this.state)
                // console.log(this.state.counter)/
            });
    }

    
    onClick = () => {
        this.getCardsList();
        this.getSurpriseList();
        this.setState({ addModalShowForTask: true })
    }

    render() {
        let addModalCloseTask = () => this.setState({ addModalShowForTask: false });
        return (
            <div>
                <img id="card_top" alt="" src={this.props.img} onClick={this.onClick}   />
                <CardsModal
                    show={this.state.addModalShowForTask}
                    onHide={addModalCloseTask}
                    kind = {this.props.kind}
                    title={this.props.title}
                    describe={this.props.describe}
                    gamedata={this.props.gamedata}
                    cards={this.state.list}
                    surprises={this.state.surprises}
                />
            </div>
        )
    }
}




