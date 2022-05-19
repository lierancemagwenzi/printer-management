import React, { useContext ,useRef} from 'react';
import PrinterContext from '../context/PrinterContext';

import PrinterCard from "./PrinterCard";
import {Link} from "react-router-dom";
import {Navigate} from "react-router-dom";

const PrinterList = () => {

    const inputEl = useRef("");

    const {printers,searchTerm,searchResults, isLoading,getSearchTerm, deletePrinter, editTodoFnc} = useContext(PrinterContext);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure want to delete')) {
            deletePrinter(id);
        }
    }

    const HandleSearch=()=>{

        console.log(inputEl.current.value);
        getSearchTerm(inputEl.current.value);


    }

    const displaylist=searchTerm!=""?searchResults:printers;
    if (!isLoading && !displaylist && displaylist.length === 0) {
        return <p>No printers found!</p>;
    }
    return isLoading ? (
        <h1>Loading ...</h1>
    ) : (
        <div className='container'>

            <div className="row">
                <div className="col-md-6">
                    <div className="ui search" style={{marginTop:"10px"}}>
                        <div className="ui icon input">
                            <input
                                ref={inputEl}
                                type="text"
                                placeholder="Search Printers"
                                className="prompt"
                                value={searchTerm}
                                onChange={HandleSearch}
                            />
                            <i className="search icon"></i>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    {/*    onClick={()=>{*/}
                    {/*    notify()*/}
                    {/*}}*/}
                    <Link to="/add">
                        <button className="ui button blue float-right" >Add Printer</button>
                    </Link>
                </div>
            </div>
            <div className="table-responsive" style={{paddingTop:"30px"}}>

            <table className='table table-striped'>
                <thead>
                <tr>
                    <th scope='col'></th>
                    <th scope='col'>#</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>IP Address</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                </tr>
                </thead>
                <tbody>
                {displaylist.map((printer, index) => (

                    <PrinterCard printer={printer} key={printer.id}/>
                //     <tr key={printer.id}>
                //         <th scope='row'>{index + 1}</th>
                //         <td>{printer.name}</td>
                //         <td>{printer.ip_address}</td>
                //         <td>
                // <span>
                //   {printer.status === 'Active' ? 'Active' : 'In Active'}
                // </span>
                //         </td>
                //         <td>
                //             <button type='button' className='btn btn-primary' onClick={() => editTodoFnc(printer)}>
                //                 Edit
                //             </button>
                //         </td>
                //         <td>
                //             <button type='button' className='btn btn-danger' onClick={() => handleDelete(printer.id)}>
                //                 Danger
                //             </button>
                //         </td>
                //     </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    );

}

export default PrinterList;