const mongoose = require('mongoose')
const profileSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    messages: { type: Number, required: true ,default:0},
    level: { type: Number, required: true,default:0 },
    xp: { type: Number, required: true,default:0 }
}
);
const model = mongoose.model('ProfileModel', profileSchema)
module.exports = model;