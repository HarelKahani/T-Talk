import React, { Component } from 'react';
import { Button, ButtonToolbar, Table , Image} from 'react-bootstrap';
import { AddCardsModal } from './AddCardsModal'
import { ExistingCardModal } from './ExistingCardModal'
import { DeleteDialog } from './DeleteDialog' 
import { Upload } from './../crads_upload/img_upload'
// import TableHandler from '../table_handler/table_handler';
import {ListOfTopicImg} from '../crads_upload/list_topic'

export class CardsTable extends Component {

   
    render() {
        function delete_photo(){
            alert("למחוק תמונה?");
        }
      
        return (
            <ListOfTopicImg/>


//             <div>

//             <Table striped bordered hover>

//                 <tbody>
//                     <tr>
//                         <td>1</td>
//                         <td > לצחצח שיניים </td>
//                         <td>
//                             <img src="/cards_imgs/1.JPG" style={{width: 100, height:100}}></img>                         
//                         </td>
//                         <td>
//                         <Button variant="danger" id="delete_card" style={{ width: "20%"}} onClick={delete_photo}><b>X</b></Button>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td>2</td>
//                         <td>חצר</td>
//                         <td>
//                             <img src="/cards_imgs/4.JPG" style={{width: 100, height:100}}></img>                         
//                         </td>
//                         <td>
//                         <Button variant="danger" id="delete_card" style={{ width: "20%"}} onClick={delete_photo}><b>X</b></Button>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td>3</td>
//                         <td > צבעי עיפרון </td>
//                         <td>
//                             <img src="/cards_imgs/22.JPG" style={{width: 100, height:100}}></img>                         
//                         </td>
//                         <td>
//                         <Button variant="danger" id="delete_card" style={{ width: "20%"}} onClick={delete_photo}><b>X</b></Button>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td>5</td>
//                         <td > יצירה </td>
//                         <td>
//                             <img src="/cards_imgs/6.JPG" style={{width: 100, height:100}}></img>                         
//                         </td>
//                         <td>
//                         <Button variant="danger" id="delete_card" style={{ width: "20%"}} onClick={delete_photo}><b>X</b></Button>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td>6</td>
//                         <td > צבעי ידיים </td>
//                         <td>
//                             <img src="/cards_imgs/24.JPG" style={{width: 100, height:100}}></img>                         
//                         </td>
//                         <td>
//                         <Button variant="danger" id="delete_card" style={{ width: "20%"}} onClick={delete_photo}><b>X</b></Button>
//                         </td>
//                     </tr>
//                 </tbody>

//             </Table>

// </div>


        )
    }
}



