const printer=require ('../models').printer;
const user=require ('../models').user;
const md5=require("md5");

const Sequelize=require('sequelize')
const Op = Sequelize.Op;

exports.GetPrinters =(req,res)=> {
    printer.findAll({
        include:[],order: [
            ['id', 'DESC']
        ]
    })
        .then((printers) => {
            res.status(201).json({"data":printers})
        })
        .catch((err) => {
            console.log("Error while find printers : ", err);
            res.status(500).json({"error":"Server error occurred"});
        })
}

exports.Login =(req,res)=> {
    user.findOne({
        include:[],where:{"email":req.body.email,"password":md5(req.body.password)}
    })
        .then((u) => {
            if(u){
                res.status(201).json({"data":u.get()})
            }
            else{
                res.status(202).json({"error":"Wrong username or password"})
            }
        })
        .catch((err) => {
            console.log("Error while find user : ", err);
            res.status(500).json({"error":"Server error occurred"});
        })
}
exports.GetPrinter =(req,res)=> {
    let id=req.body.id;
    printer.find({
        include:[],where:{id:id}
    })
        .then((p) => {
            if(p){
                res.status(201).json({"data":p.get()})
            }
            else{
                res.status(404).json({"error":"Printer not found"})
            }
        })
        .catch((err) => {
            console.log("Error while find printers : ", err);
            res.status(500).json({"error":"Server error occurred"});
        })
}

exports.CreatePrinter =(req,res)=> {
    console.log(req.body)
    printer.findOne({
           where:{ ip_address:req.body.ip_address}
    })
        .then((p) => {

            if(p !=null){
                console.log(p.get())
                res.status(202).json({"error":"Printer with same ip already exists"})
            }
            else{
                printer.create(req.body)
                    .then((newPrinter) => {
                        // The get() function allows you to recover only the DataValues of the object
                        console.log(newPrinter.get())
                        res.status(201).json({"data":newPrinter.get()})
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(500).json({"error":"Server error occurred"});
                    })
            }
        })
        .catch((err) => {
            console.log("Error while find printers : ", err);
            res.status(500).json({"error":"Server error occurred"});
        })

}

exports.DeletePrinter =(req,res)=> {
    console.log(req.params)
    printer.destroy({
        where: {
            id:req.params.id
            // criteria
        }
    })   .then((deletedRow) => {
console.log(deletedRow)
        if(deletedRow==1){
            res.status(201).json({"data":"success"})
        }
        else{
            res.status(404).json({"error":"Failed to delete printer"})
        }
    })
        .catch((err) => {
            console.log(err)
            res.status(500).json({"error":"Server error occurred"});
        })


}

exports.UpdatePrinter =(req,res)=> {
console.log(req.body)
    let id=req.params.id;
    printer.update(
        { name: req.body.name,ip_address:req.body.ip_address,status:req.body.status},
        { where: { id: id } }
    )
        .then(result =>{
            if(result>0){
                printer.findOne({
                    include:[],where:{id:id}
                })
                    .then((p) => {
                        if(p){
                            res.status(201).json({"data":p.get()})
                        }
                        else{
                            res.status(401).json({"error":"Printer not found"})
                        }
                    })
                    .catch((err) => {
                        console.log("Error while find printers : ", err);
                        res.status(500).json({"error":"Server error occurred"});
                    })
            }

            else{
                res.status(400).json({"error":"Failed to update printer"})

            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({"error":"Server error occurred"});
        })
}