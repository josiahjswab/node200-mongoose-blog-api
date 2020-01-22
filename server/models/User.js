// Imports mongoose and extracts Schema into it's own variable
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creates a new mongoose schema with two properties
const UserSchema = new Schema({
	firstName: { type: String, require: true }, // firstName property is a string and required
	lastName: { type: String, require: true },
	email: { type: String, require: true },
	social: {
		facebook: { type: String, required: false },
		twitter: { type: String, required: false },
		linkedIn: { type: String, required: false }
	},
	blogs: [{type: Schema.Types.ObjectId, ref: 'Blog'}]
});



module.exports = mongoose.model('User', UserSchema);
