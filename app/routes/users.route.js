module.exports = app =>{
    const users =require ("../controllers/usersController.js");
    
    //add new user
    app.post("/users", users.create);
    
    //retrieve users
    app.get("/getusers", users.findAll);

    //retrieve user by ID
    app.get("users/:userId", users.findOne);

    //update user
    app.put("/users/:userId", users.update);

    //delete user
    app.delete("/users/:userId", users.delete);
}