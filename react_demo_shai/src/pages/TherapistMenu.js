import React, { Component } from 'react';
import { Navbar, Nav, OverlayTrigger, Popover } from 'react-bootstrap';

class TherapistMenu extends Component {

    render() {

        return (
            <div id="user_side">
                <Navbar bg="flat" variant="flat">
                    <Navbar.Brand href="/">T-Talk</Navbar.Brand>
                    <Nav className="justify-content-start" style={{ width: "100%", paddingRight: "1%" }}>
                        <OverlayTrigger
                            trigger="hover"
                            key="bottom"
                            placement="bottom"
                            overlay={
                                <Popover id={`popover-positioned-${this.placement}`}>
                                    <Popover.Title as="h3">{`לחיצה על "בחר נושא" תוביל למסך הנושאים הקיימים במשחק`}</Popover.Title>
                                    <Popover.Content>
                                        <strong>ממסך זה ניתן להתחיל משחק!</strong> זה מאוד פשוט, יש ללחוץ על "התחל משחק" עבור הנושא הרצוי
                                     </Popover.Content>
                                </Popover>
                            }
                        >
                             <Nav.Link href="/ChooseTopic" style={{ color: 'white', textDecoration: 'none' }}>בחירת נושא</Nav.Link>
                        </OverlayTrigger>

                        <OverlayTrigger
                            trigger="hover"
                            key="bottom"
                            placement="bottom"
                            overlay={
                                <Popover id={`popover-positioned-${this.placement}`}>
                                    <Popover.Title as="h3">{`מסך ניהול הנושאים`}</Popover.Title>
                                    <Popover.Content>
                                    ממסך זה נוכל להוסיף/למחוק נושא ולנהל את התוכן שלו.
                                    <br></br>
                                    מעולם לא היה פשוט יותר לנהל נושאים.
                                     </Popover.Content>
                                </Popover>
                            }
                        >
                              <Nav.Link href="/ManageTopic" style={{ color: 'white', textDecoration: 'none' }}>ניהול נושאים</Nav.Link>
                        </OverlayTrigger>

                        <OverlayTrigger
                            trigger="hover"
                            key="bottom"
                            placement="bottom"
                            overlay={
                                <Popover id={`popover-positioned-${this.placement}`}>
                                    <Popover.Title as="h3">{`מסך ניהול קלפי הפתעה`}</Popover.Title>
                                    <Popover.Content>
                                    ממסך זה נוכל להוסיף/למחוק את תוכן כרטיסי ההפתעה.
                                     </Popover.Content>
                                </Popover>
                            }
                        >
                             <Nav.Link href="/ManageSupriseCard" style={{ color: 'white', textDecoration: 'none' }} >ניהול כרטיסי הפתעה</Nav.Link>
                        </OverlayTrigger>
                       
                       
                        
                    </Nav>
                </Navbar>


            </div>

        );


    }
}



export default TherapistMenu