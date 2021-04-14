const sql = require("./db.js");
// constructor

const user = function(user)
{
    this.email=user.email;
    this.firstname=user.firstname;
    this.lastname=user.lastname;
    this.active=user.active;
};

user.create= (newUser, result) => {
    sql.query("insert into users set ?", newUser, (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(err,null);
            return;
        }
        console.log("created users: ", {id:res.insertID, ...newUser});
        result(null, {id:res.insertID, ...newUser});

    });
};

user.findByID = (userID, result) => {
    sql.query('select * from users where id = ${userID}', (err,res) =>{
        if(err){
            console.log("error:",err);
            result(err,null);
            return;
        }

        if(res.length){
            console.log("found user:", res[0]);
            result(null,res[0]);
            return;
        }
        //user not found
        result({kind: "not_found"}, null);
    });
};

user.getAll = result =>{
    sql.query("select * from users", (err,res) => {
        if(err){
            console.log("error:",err);
            result(null,err);
        }
        console.log("users: ", err );
        result(null,res);
    });
};

user.updateByID = (id, user, result) => {
    sql.query(
        "update users  set email = ?, firstname = ?, lastname = ?, active = ? where id = ?",
        [user.email, user.firstname, user.lastname, user.active, id],
        (err,res) => {
            if (err){
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if(res.affectedRows == 0){
                //user not found
                result({kind: "not_found" }, null);
                return;
            }
            console.log("updated user: ",{id: id, ...user});
            result(null, {id:id, ...user});
        }
    );
};

user.remove = (id, result) => {
    sql.query("delete from users where id = ?",(err,res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if(res.affectedRows == 0) {
            // user not found by ID
            result({ kind: "not_found"}, null);
            return;
        }

        console.log("deleted user with id:", id);
        result(null,res);
    });
};

module.exports = user;

