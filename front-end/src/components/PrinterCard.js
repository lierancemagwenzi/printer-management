import React, {useContext} from 'react'
import printerImg from '../images/printer.png'
import PrinterContext from '../context/PrinterContext';
import { Link,useNavigate, useLocation ,useParams} from "react-router-dom";

const PrinterCard=(props)=> {
    const {isLoading, deletePrinter, editTodoFnc} = useContext(PrinterContext);
    let navigate = useNavigate();

    const printer = props.printer;
    const handleDelete = (id) => {
        if (window.confirm('Are you sure want to delete printer '+ printer.name+'?')) {
            deletePrinter(id);
        }
    }
    const handleEdit=()=>{
        editTodoFnc(printer)
        navigate(`/edit/${printer.id}`)
    }

    function closeAllModals() {

        // get modals
        const modals = document.getElementsByClassName('modal');

        // on every modal change state like in hidden modal
        for(let i=0; i<modals.length; i++) {
            modals[i].classList.remove('show');
            modals[i].setAttribute('aria-hidden', 'true');
            modals[i].setAttribute('style', 'display: none');
        }

        // get modal backdrops
        const modalsBackdrops = document.getElementsByClassName('modal-backdrop');

        // remove every modal backdrop
        for(let i=0; i<modalsBackdrops.length; i++) {
            document.body.removeChild(modalsBackdrops[i]);
        }
    }
    return (
        <tr>
            <td>
                <img style={{height:"50px"}} src={printerImg} alt="icon"/>
            </td>
            <td>{printer.id}</td>
            <td>
                {printer.name}
            </td>
            <td>
                {printer.ip_address}

            </td>

            <td>
                {printer.status}

            </td>
            <td>

               <i className="edit alternate outline icon" style={{color:"red",marginTop:"7px",marginLeft:"16px"}} onClick={handleEdit}></i>



            </td>

            <td>
                <i className="trash alternate outline icon" style={{color:"red",marginTop:"7px",marginLeft:"16px"}} onClick={() => handleDelete(printer.id)}  ></i>


            </td>

            {/*<div className="modal fade" id={`exampleModal${printer.id}`} tabIndex="-1" role="dialog"*/}
            {/*     aria-labelledby="exampleModalLabel" aria-hidden="true">*/}
            {/*    <div className="modal-dialog" role="document">*/}
            {/*        <div className="modal-content">*/}
            {/*            <div className="modal-header">*/}
            {/*                <h5 className="modal-title" id="exampleModalLabel">Delete Printer</h5>*/}
            {/*                <button type="button" className="close" data-dismiss="modal" aria-label="Close">*/}
            {/*                    <span aria-hidden="true">&times;</span>*/}
            {/*                </button>*/}
            {/*            </div>*/}
            {/*            <div className="modal-body">*/}
            {/*                Are you sure you want to delete printer <b>{printer.name}?</b>*/}
            {/*            </div>*/}
            {/*            <div className="modal-footer">*/}
            {/*                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>*/}
            {/*                <button type="button" className="btn btn-primary" onClick={() => handleDelete(printer.id)}>Proceed</button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </tr>
    );

}

export  default  PrinterCard;