import PrinterContext from '../context/PrinterContext';
import { useContext, useEffect, useState } from 'react';
import {  toast } from 'react-toastify';
import { Link,useNavigate, useLocation ,useParams} from "react-router-dom";


const EditPrinter=()=>{
    let navigate = useNavigate();
    const {printerEdit,isLoading,addPrinter,updatePrinter} = useContext(PrinterContext);
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [ip_address, setIPAddress] = useState('');
    const [id, setId] = useState(null);

    console.log(printerEdit);
    useEffect(() => {
        if (printerEdit.isEdit) {
            setId(printerEdit.printer.id)
            console.log("printer name",printerEdit.printer.name)
            setName(printerEdit.printer.name);
            setIPAddress(printerEdit.printer.ip_address);
            setStatus(printerEdit.printer.status);
            console.log("name",name);
        }
    }, [printerEdit]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

        if(name===""|| status===""|| ip_address===""){

            alert("All fields are required")
            return
        }
        if(!regexExp.test(ip_address)){

            toast.error('Enter a valid ip address like 192.168.0.23', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            return;
        }

        if((printerEdit.isEdit)){

            console.log("update printer")
            const printer = { name, status,ip_address,id };
            updatePrinter(id,printer);
            navigate(`/`)
        }

        else{
            const printer = { name, status,ip_address };
            addPrinter(printer);
            navigate(`/`)
        }

    };
    const handleInputChange = (e) => {

        if(e.target.name === 'name'){
            setName(e.target.value)
        }

        else if(e.target.name === 'status'){
            setStatus(e.target.value)
        }

        else if(e.target.name === 'ip_address'){
            setIPAddress(e.target.value)
        }

        else{}
    };
    return (

        <div className="ui main" style={{paddingTop:"50px"}}>


            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"> <Link to="/">Printers</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{printerEdit.isEdit?"Edit":"Add"} Printer</li>
                </ol>
            </nav>

            <div className="card">
                <div className="card-header"><h2>{printerEdit.isEdit?"Edit":"Add"} Printer</h2></div>
                <div className="card-body">


                    <div  className="ui form">
                        <form className="ui form" onSubmit={handleSubmit}>
                            <div  className="field">

                                <label>Printer Name</label>

                                <input type="text" value={name} placeholder="Name" required   name="name"  onChange={handleInputChange}/>


                            </div>

                            <div  className="field">
                                <label>Printer Ip Address</label>
                                <input type="text" value={ip_address}  placeholder="IP Address" required   name="ip_address"          onChange={handleInputChange}
                                />
                            </div>
                            <div  className="field">
                                <label>Printer Status</label>
                                <select name="status" required value={status}  onChange={handleInputChange}
                                >
                                    <option value="">--select--</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                                <br />
                                <button className="ui button blue">{printerEdit.isEdit?"Update":"Add"} Printer</button>

                            </div>
                        </form>
                    </div>

                </div>
            </div></div>

    )
}

export default  EditPrinter;