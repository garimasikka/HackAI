import mongoose from 'mongoose'
const { Schema } = mongoose

const wishListSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    }],
},
    {
        timestamps: true
    }
)

const Wishlist = mongoose.model("Wishlist", wishListSchema)

export default Wishlist