const user = require('../User.js');

app.post('/api/register', (req,res) => {
    const {email, password} = req.body;
    const user = new User({ email, password});
    user.save( (err) => {
        if (err){
            res.status(500)
                .send("Error registering new user. Please try again");
        }
        else{
            res.status(200)
                .send("Registered!");
        }
    });
});