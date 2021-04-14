const user = require("../models/users.model.js");

//create and save new user
exports.create = (req,res) => {
//valider requete
if(!req.body){
res.status(400).send({
    message:"content cannot be empty !"
});
}

//create user
const user = new user({
    email:req.body.email,
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    active:req.body.active
});

//save user in db
user.create(user, (err,data)=>{
if(err) 
res.status(500).send({
    message:
        err.message || "some error occurred while creating the user."
});
else res.send(data);
});

};

//retrieve users 
exports.findAll = (req,res) => {

    user.getAll( (err,data) => {
        if(err)
        res.status(500).send({
            message:
            err.message || "some error occurred while retrieving users."
        });
        else res.send(data);
    });
};

//find single user
exports.findone = (req,res) => {
user.findByID(req.params.userId, (err,data) => {
    if(err) {
        if(err.kind === "not_found") {
            res.status(404).send({
                message: 'user not found with id ${req.params.userId}'
            });
        } else {
            res.status(500).send({
                message:"error retrieving user with id " + req.params.userId
            });
        }
    } else res.send(data);
});
};

//update user
exports.update = (req,res) => {
    //valider requete
    if(!req.body) {
        res.status(400).send({
            message: "content can not be empty!"
        });
    }
    user.updateByID(
        req.params.userId,
        new user(req.body),
        (err,data) =>{
       if(err) {
            if(err.kind === "not_found") {
                res.status(400).send({
                    message: 'user not found ${req.params.userId}'
                });
            } else {
                res.status(500).send({
                    message:"error while updating user "+ req.params.userId 
                });
            }
        } else res.send(data);
        }
    );
};

//delete user
exports.delete = (req,res) => {

    user.remove(req.params.userId, (err,data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message:'user not found ${req.params.userId}'
                });
            } else {
                res.status(500).send({
                    message: " cannot delete user with id " + req.params.userId
                });
            }
        } else res.send({ message: 'user deleted successfully'});
    });
};



