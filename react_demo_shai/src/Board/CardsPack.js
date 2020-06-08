import React, { Component } from 'react';
import { CardsModal } from './CardsModal'

export class CardsPack extends Component {
    constructor(props) {
        super(props);
        //this.getSubjectName = this.getSubjectName.bind(this);
        //this.addSubject = this.addSubject.bind(this);
        this.state = { addModalShowForTask: false }
    }

    // getSubjectName = event => {
    //     this.setState({ SubjectNameval: event.target.value });
    // };

    // addSubject = ()=>{
    //     if(this.state.SubjectNameval===""){
    //         alert("יש להזין שם")
    //         return;
    //     }
    //     this.setState({SubjectName: this.state.SubjectName.concat(this.state.SubjectNameval)})
    // }

    render() {
        let addModalCloseTask = () => this.setState({ addModalShowForTask: false });

        return (
            <div>
                <img id="card_top" alt="" src="/cards_imgs/main.png" onClick={() => this.setState({ addModalShowForTask: true })}   />
                    <CardsModal
                        show={this.state.addModalShowForTask}
                        onHide={addModalCloseTask}
                    />
    
                {/* <Button variant="primary" id="add_subj" onClick={() => this.setState({ addModalShowForSubjUpload: true })}>הוסף נושא</Button>
                <AddSubjectModal
                    describe={"להוספת נושא יש להזין טקסט בתיבת הטקסט המופיע מתחת. לחיצה על 'הוסף' תוסיף את הנושא אל מאגר הנושאים הקיים.."}
                    title={"הוספת נושא"}
                    show={this.state.addModalShowForSubjUpload}
                    onHide={addModalCloseSubjecUp}
                    transferToTable={this.getSubjectName}
                    add={this.addSubject}
                /> */}
                {/* <AddCardsModal
                    subjectName=""
                    title={"הוספת נושא"}
                    describe = {"להוספת נושא יש לצרף שם לנושא. לחיצה על 'הוסף' תוסיף את הנושא אל טבלת ניהול הנושאים שם יתאפשר להוסיף תמונות. ניתן לחזור על פעולה זו עבור כמות הוספות רצויות."}

                /> */}


            </div>

        )
    }
}




