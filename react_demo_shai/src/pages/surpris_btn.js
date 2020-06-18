import React, { Component } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { ReplaceCard } from './ReplaceSurpriseCard'

export class SurpriseButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardName: this.props.cardName,
            cerds: [],
            list: null,
            addModalShowForUpload: false,
        }
        this.getSubjectName = this.getSubjectName.bind(this);
        this.addSubject = this.addSubject.bind(this);
    };

    getSubjectName = event => {
        this.setState({ SubjectNameval: event.target.value });
    };

    addSubject = () => {
        if (this.state.SubjectNameval === "") {
            alert("יש להזין שם")
            return;
        }
        this.setState({ SubjectName: this.state.SubjectName.concat(this.state.SubjectNameval) })
        console.log(this.state)
    }

    render() {
        // let addModalCloseUpload = () => this.setState({ addModalShowForUpload: false });
        //let addModalCloseExisting = () => this.setState({ addModalShowForExisting: false });

        return (
            <div>
                <OverlayTrigger
                    trigger="hover"
                    key="bottom"
                    placement="bottom"
                    overlay={
                        <Popover id={`popover-positioned-${this.placement}`}>
                            <Popover.Title as="h3">{`שימו ❤️`}</Popover.Title>
                            <Popover.Content>
                                אומנם תמונות הלוח בלתי ניתנות לשינוי, אבל בכיף אפשר להחליף את תמונת הכרטיס שמתייחסת אליהן 😁
                            </Popover.Content>
                        </Popover>
                    }
                >
                    <Button
                        variant="outline-primary"
                        onClick={() => this.setState({ addModalShowForUpload: true })}
                        style={{ width: "50%" }}>
                        החלף קלף ל{this.state.cardName}
                    </Button>
                </OverlayTrigger>

                <ReplaceCard
                    cardName={this.state.cardName}
                    show={this.state.addModalShowForUpload}
                    onHide={this.props.onHide}
                    title={"החלפת תמונה"}
                    describe={"להחלפת תמונה יש ללחוץ על 'בחר תמונה' לחיצה על 'החלף' תחליף את התמונה של קלף ההפתעה הנבחר."}
                />
            </div>
        )
    }
}



