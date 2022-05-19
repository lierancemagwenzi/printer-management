import logo from './logo.svg';
import './App.css';
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import PrinterContext, { PrinterProvider } from "./context/PrinterContext";
import PrinterList from "./components/PrinterList";
import AddPrinter from "./components/AddPrinter";
import EditPrinter from "./components/EditPrinter";

import {BrowserRouter as Router,Navigate,useNavigate,Switch,Route,Routes} from 'react-router-dom'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {



    //
    //
    // console.log(user)
    return   (
      <div className="container">
          <h2>Printer management</h2>
          <ToastContainer />

          <PrinterProvider>
      <Router>
          <Routes>
              <Route path="/edit/:id" element={<EditPrinter />}/>
              <Route path="/add" element={<AddPrinter />}/>
              <Route path="/"  element={<PrinterList />}/>

          </Routes>
      </Router>

      </PrinterProvider>
      </div>
      // <PrinterProvider>
      //   <div className="container">
      //     <h2>Printer management</h2>
      //     <div className="row">
      //       <div className="col-8"><PrinterList /></div>
      //       <div className="col-4">Will put form here</div>
      //     </div>
      //   </div>
      // </PrinterProvider>
  );
}

export default App;
