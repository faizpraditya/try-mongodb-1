db.products.insertMany(
    [
        {
            _id: 1,
            name: "Macbook Pro 2022",
            price: new NumberLong(22000000),
            category: "laptop"
        },
        {
            _id: 2,
            name: "Lenovo Think Pad i7",
            price: new NumberLong(20000000),
            category: "laptop"
        },
        {
            _id: 3,
            name: "Iphone 13 Pro Max",
            price: new NumberLong(21000000),
            category: "handphone"
        },
        {
            _id: 4,
            name: "Ayam Bakar Madu",
            price: new NumberLong(25000),
            category: "food"
        },
        {
            _id: 5,
            name: "Ice Dolce Latte",
            price: new NumberLong(13000),
            category: "drink"
        }
    ]
) 

// Find with in
db.products.find({
    category: {
        $in: ["food", "drink"]
    },
    price: {
        $gt: 10000
    }
})

// Logical Operator
// AND, OR, NOR, NOT
// $and, $or, $nor, $not

// db.collection.find({ $operator : [ { expression } ] })

db.products.find({
    $and: [
        {
            category: {
                $in: ["food", "drink"]
            },
            price: {
                $gt: 10000
            }
        }
    ]
})

db.products.find({
    category: {
        $not: {
            $in: ["food", "drink"]
        }
    }
})

db.products.find({
    category: {
        $nin:["food", "drink"]
    }
})

db.products.find({
    $and: [
        {
            $or: [
                {
                    category: "food"
                },
                {
                    category: "drink"
                }
            ]
        },
        {
            price: {
                $gt: 10000
            }
        }
    ]
}) 

// Evaluation Operator
// $expr = aggregation operation
// $jsonSchema = ValidasiBSON
// $mod = sisa bagi
// $regex = regular expression
// $text = pencarian menggunakan textx
// $where = pengambilan document menggunakan Javascript Function

// $expr
// select * from products where price > 10000
db.products.find({
    $expr: {
        $gt: ["$price", 2000000]
    }
})

// $jsonSchema
// SELECT * FROM products WHERE name is not null and category is not null
db.products.find({
    $jsonSchema: {
        required: ["name", "category"]
    }
})

db.products.find({
    $jsonSchema: {
        required: ["name"],
        properties:{
            price:{
                bsonType:"long"
            }
        }
    }
})


// $mod
// select * from products where price % 5 = 0
db.products.find({
    price: {
        $mod: [5, 0]
    }
})

// $regex
db.products.insertMany(
    [
        {
            _id: 6,
            name: "Ayam Bakar Kecap",
            price: new NumberLong(23000),
            category: "food"
        },
        {
            _id: 7,
            name: "Ayam Bakar Taliwang",
            price: new NumberLong(30000),
            category: "food"
        }
    ]
)

db.products.find().pretty()

// options i seperti ilike, ga case sensitive
// SELECT * FROM products WHERE name ILIKE '%Ayam%'
db.products.find({
    name:{
        $regex: /Ayam/,
        $options:"i"
    }
})

// SELECT * FROM products where name LIKE 'A%'
db.products.find({
    name:{
        $regex: /^A/
    }
})

// SELECT * FROM products where name LIKE '%g'
db.products.find({
    name:{
        $regex: /g$/
    }
})

// $text 
// Buat index dahulu
db.products.createIndex({
    name: "text"
})

// SELECT * FROM products WHERE (name like '%ayam%' or name like '%lenovo%')
db.products.find({
    $text: {
        $search: "ayam lenovo"
    }
})

db.products.find({
    $text: {
        $search: "ay lenovo"
    }
})


// SELECT * FROM products WHERE name like '%ayam lenovo%'
db.products.find({
    $text: {
        $search: '"bakar m"'
    }
})

db.products.find({
    $text: {
        $search: '"ayam lenovo"'
    }
})

db.products.find({
    $text: {
        $search: '"ay"'
    }
})

// $where
// SELECT * FROM products WHERE _id = 7
db.products.find({
    $where: function () {
        return this._id == 7
    }
})

// Pagination
// Menampilkan data di halaman 1 dengan record atau document sebanyak 2
db.products.find().pretty().limit(2)

// Offset
// Halaman kedua
db.products.find().pretty().skip(2).limit(2)

// Sort | 1 = ASC | -1 = DESC
db.products.find().pretty().skip(2).limit(2).sort({
    name:1
})

db.products.find().pretty().skip(2).limit(2).sort({
    name:-1
})

// Default berdasarkan urutan dokumen yang dibuat

// Explain
db.products.find().sort({ name: 1 }).explain("executionStats")

// Join

// Aggregation
// count, distinct, sum, group

// Select count = hitung jumlah row
db.products.countDocuments({})

// Distinct
db.products.distinct("category")

// SUM
db.products.aggregate([
    {
        $group: {
            _id: "$category",
            total: {
                $sum: "$price"
            }
        }
    }
])

// COUNT group by
db.products.aggregate([
    {
        $group: {
            _id: "$category",
            total: {
                $sum: 1
            }
        }
    }
])

// WHERE
db.products.aggregate([
    {
        $match: {
            category: "food"
        }
    },
    {
        $group: {
            _id: "$category",
            total: {
                $sum: "$price"
            }
        }
    }
])