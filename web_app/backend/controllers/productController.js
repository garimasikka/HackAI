import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import fs from 'fs'

//@desc get all products
//@route GET /api/products
//@access public
const getAllProducts = asyncHandler(async (req, res) => {
    const pageSize = 100
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const countDocuments = await Product.count({ ...keyword })
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))

    if (products) {
        res.status(200).json({ products, page, pages: Math.ceil(countDocuments / pageSize) })
    } else {
        throw new Error('Server Error')
    }
})

//@desc get product
//@route GET /api/products/:id
//@access public
const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.status(200).json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc get top prdoucts
//@route GET /api/products/top
//@access public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4)

    if (products) {
        res.status(200).json(products)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc delete product
//@route DELETE /api/products/:id
//@access private/admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    const index = (product.image).indexOf("s")
    const img = (product.image).substring(index + 2)

    //delete image from the uploads folder first
    fs.unlink(`uploads/${img}`, (err) => {
        if (err) {
            console.log(err)
        }
    })

    if (product) {
        product.remove()
        res.status(200).json({ message: "product removed" })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//@desc create product
//@route POST /api/products
//@access private/admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

//@desc update product
//@route PUT /api/products/:id
//@access private/admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock
    } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name ?? product.name
        product.price = price ?? product.price
        product.description = description ?? product.description
        product.image = image ?? product.image
        product.brand = brand ?? product.brand
        product.category = category ?? product.category
        product.countInStock = countInStock ?? product.countInStock

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

//@desc create review
//@route POST /api/products/:id/reviews
//@access private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if (alreadyReviewed) {
            res.status(400)
            throw new Error("Product Already Reviewed!")
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201).json({ message: 'Review Added' })
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

export { getAllProducts, getProduct, getTopProducts, deleteProduct, createProduct, updateProduct, createProductReview }