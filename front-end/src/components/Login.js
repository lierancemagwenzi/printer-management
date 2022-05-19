// import React, {Fragment, useContext, useEffect, useState} from "react";
// import AuthContext,{AuthProvider} from "../context/AuthContext";
// import someAPI from "../api/Api";
// import {useNavigate} from "react-router-dom";
//
// const Login =()=>{
//     let navigate = useNavigate();
//     const { user,Login } = useContext(AuthContext);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//
//     const handleLogin= async (e) => {
//         e.preventDefault()
//         if (email === "" || password === "") {
//             alert("All fields are required")
//             return
//         }
//         try {
//             const response = await someAPI.post('/api/login', {email,password});
//             if (response.status === 201) {
//                 const data1 = response.data.data;
//                 console.log(data1)
//                 // debugger
//                 Login(data1);
//                  navigate(`/`)
//             } else {
//                 console.log(response.data);
//                 return 0;
//             }
//         } catch (error) {
//             console.log(error.response); // this is the main part. Use the response property from the error object
//         }
//     }
//     const handleInputChange = (e) => {
//
//         if(e.target.name === 'email'){
//             setEmail(e.target.value)
//         }
//
//         else if(e.target.name === 'password'){
//             setPassword(e.target.value)
//         }
//
//
//
//         else{}
//     };
//     return (
//
//         <Fragment>
//             <div id="content" className="flex text-center justify-content-center" >
//                 <div className="">
//
//                     <div className="page-content page-container" id="page-content">
//                         <div className="padding">
//                             <div className="row">
//                                 <div className="col-md-6">
//                                     <div className="card">
//                                         <div className="card-header"><strong>Login to your account</strong></div>
//                                         <div className="card-body">
//                                             <form onSubmit={handleLogin}>
//                                                 <div className="form-group"><label className="text-muted"
//                                                                                    htmlFor="exampleInputEmail1">Email
//                                                     address</label><input type="email" name="email" className="form-control"
//                                                                           id="exampleInputEmail1"
//                                                                           aria-describedby="emailHelp"
//                                                                           placeholder="Enter email" onChange={handleInputChange}/> <small
//                                                     id="emailHelp" className="form-text text-muted">We don't share email
//                                                     with anyone</small></div>
//                                                 <div className="form-group"><label className="text-muted"
//                                                                                    htmlFor="exampleInputPassword1">Password</label><input
//                                                     type="password" name="password" className="form-control" id="exampleInputPassword1"
//                                                     placeholder="Password" onChange={handleInputChange}/> <small id="passwordHelp"
//                                                                                    className="form-text text-muted">your
//                                                     password is saved in encrypted form</small></div>
//                                                 <div className="form-group">
//                                                     <div className="form-check"><input type="checkbox"
//                                                                                        className="form-check-input"/><label
//                                                         className="form-check-label">Check me out</label></div>
//                                                 </div>
//                                                 <button type="submit" className="btn btn-primary">Submit</button>
//                                             </form>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//         </Fragment>
//     );
// }
//
// export  default  Login;