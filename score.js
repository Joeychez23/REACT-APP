const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const scoresSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Score: {
        type: String, 
        required: true
    }
});


const scores = mongoose.model('scores',scoresSchema);


module.exports = scores;