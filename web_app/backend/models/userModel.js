import mongoose from 'mongoose'
const { Schema } = mongoose
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
   name: {
    type: String,
    required: [true, "please add a name"]
   },
   email: {
    type: String,
    required: [true, "please add an email"],
    unique: true
   },
   password: {
    type: String,
    required: [true, "please add a password"]
   },
   isAdmin: {
    type: Boolean,
    required: true,
    default: false
   }
},
{
    timestamps: true
}
)

userSchema.methods.matchPassword = async function (enterrdPassword) {
    return await bcrypt.compare(enterrdPassword, this.password)
}

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }
    //hash the password
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema)

export default User