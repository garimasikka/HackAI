import mongoose from 'mongoose'
const { Schema } = mongoose

const subscriptionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    duration: {
        type: Number,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
},
    {
        timestamps: true
    }
)

const Subscription = mongoose.model("Subscription", subscriptionSchema)

export default Subscription