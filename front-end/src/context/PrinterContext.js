import { createContext, useState, useEffect } from "react";
import someAPI from "../api/Api";
import {toast} from "react-toastify";
import useSWR, { SWRConfig } from "swr";


const PrinterContext = createContext();

export const PrinterProvider = ({ children }) => {
    const [printers, setPrinters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [printerEdit, setPrinterEdit] = useState({ printer: {}, isEdit: false });
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const fetcher = (url) => someAPI.get(url).then(res => res.data);
    const { data, error } = useSWR("/api/printers",fetcher);
    console.log("fetcher",data)
    console.log("error",error)




    const getSearchTerm=(searchTerm)=> {
            setSearchTerm(searchTerm);

            if (searchTerm !== "") {
                const newPrinterList = printers.filter((printer) => {
                    return Object.values(printer)
                        .join(" ")
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                });
                setSearchResults(newPrinterList);
            } else {
                setSearchResults(printers);
            }


    }
    //success message toast
    const SuccesToast=(message)=>{
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    //error message toast
    const ErrorToast=(message)=>{
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const updatePrinters =  (data) => {
        setPrinters(data);
        setIsLoading(false);
    };
    useEffect(() => {
        if(data){
            console.log("data found",data.data)
            // setPrinters(data.data);
            updatePrinters(data.data)
        }
    }, [data]);


    // react axios post method
    const addPrinter = async (newPrinter) => {

        try {
            const response = await someAPI.post('/api/create', newPrinter);

            if (response.status === 201) {
                SuccesToast("Printer added successfully")
                const data = response.data.data;
                debugger
                setPrinters([data, ...printers]);

            } else {
                ErrorToast(response?.data?.error ?? "Failed to add printer")
                console.log(response.data);
            }
        }catch (error) {
            ErrorToast(error.response ?? "Server error occurred")
            console.log(error.response); // this is the main part. Use the response property from the error object
        }
    };

    // react axios put method
    const updatePrinter = async (id, printer) => {
        try {
            const response = await someAPI.put(`/api/update/${id}`, printer);
            if (response.status === 201) {
                const data = response.data.data;
                SuccesToast("Printer updated successfully")
                setPrinters(
                    printers.map((p) => (p.id === id ? {...p, ...data} : p))
                );
                debugger
            } else {
                ErrorToast(response?.data?.error ?? "Failed to update printer")
                console.log(response.data);
                debugger
            }

        }catch (error) {
            ErrorToast(error.response ?? "Server error occurred")
            console.log(error.response); // this is the main part. Use the response property from the error object
        }

    };

    // react axios delete method
    const deletePrinter = async (id) => {
        try {
            let response = await someAPI.delete(`/api/delete/${id}`);

            if (response.status === 201) {
                SuccesToast("Printer deleted successfully")
                debugger
                setPrinters(printers.filter((p) => p.id !== id));

            } else {
                ErrorToast(response?.data?.error ?? "Failed to delete printer")
                console.log(response.data);
            }
        }catch (error) {
            ErrorToast(error.response ?? "Server error occurred")
            console.log(error.response); // this is the main part. Use the response property from the error object
        }
    };

    const editTodoFnc = (printer) => {
        setPrinterEdit({ printer, isEdit: true });
    };

    return (
        <PrinterContext.Provider
            value={{
                printers,
                searchTerm,
                searchResults,
                isLoading,
                printerEdit,
                addPrinter,
                updatePrinter,
                deletePrinter,
                editTodoFnc,
                getSearchTerm,

            }}
        >
            {children}
        </PrinterContext.Provider>
    );
};

export default PrinterContext;