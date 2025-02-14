import {v2 as cloudinary} from "cloudinary"

//adding a product
const addProduct = async (req, res)=>{
    try {
        const {name, description, price, category, subCategory, sizes, popular} = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item)=> item !== undefined)

        const imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type: 'image'});

                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            popular: popular === "true" ? true : false,
            sizes:JSON.parse(sizes),
            image:imagesUrl,
            date:Date.now()
        }

        console.log(productData);
        
        
        res.json({})    
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
//listing a product
const listProduct = async (req, res)=>{

}
//removing a product
const removeProduct = async (req, res)=>{

}
//single a product
const singleProduct = async (req, res)=>{

}

export {addProduct, listProduct, removeProduct, singleProduct}