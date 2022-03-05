// Insert One
// Kalau ga didefine id, bakal generate id
// nama field dalam mongoDB itu case sensitive, jadi kalau kita insert lagi dengan case sensitive yang berbeda, maka akan dianggap field baru/berbeda
db.students.insertOne({
    name: "Faiz",
    gender: "M",
    age: 23,
    joinDate: new Date("1998-02-03"),
    idCard: "111",
    senior: true
})

// Kalau didefine id, bakal pakai id yang di define
// _id ga bisa duplicate, harus beda
db.students.insertOne({
    _id: "S001",
    name: "Faizz",
    gender: "M",
    age: 23,
    joinDate: new Date("1998-02-03"),
    idCard: "111",
    senior: true
})

// Kalau nama key/field beda, tetap masuk, bikin/dianggap field baru
db.students.insertOne({
    _id: "S002",
    name: "Faizz",
    Gender: "M",
    age: 23,
    joinDate: new Date("1998-02-03"),
    idCard: "111",
    senior: true
})

// Insert many
db.students.insertMany(
    [
        {
            name: "praditya",
            gender: "M",
            age: 23,
            joinDate: new Date("1998-02-03"),
            idCard: "111",
            senior: true
        },
        {
            name: "cantona",
            gender: "M",
            age: 23,
            joinDate: new Date("1998-02-03"),
            idCard: "111",
            senior: true
        },
    ]
)


// Comparison Operator | =, >, <, >=, <=, in, !=, not in
// MongoDB             | $eq, $gt, $lt, $gte, $lte, $in, $ne, $nin
// range

// db.collection.find({ flied: {$operator: "value" } })

// Mencari age > 20
db.students.find({
    age: {
        $gt: 20
    }
})

// Find custome field
// Select name, gender where age > 20
// Kalau mongo where dulu baru select
// Projection
db.students.find({
    age: {
        $gt: 20
    }
},{
    // 1 tampail, 0 enggak, jika _id tidak didefine:0, _id akan by default/otomatis tampil
    name:1,
    gender:1,
    _id:0,
})

// Date
db.students.find({
    joinDate: {
        "$lte" : ISODate("2015-06-17T10:03:46Z")
    }
})
db.students.find({
    joinDate: {
        $eq : ISODate("1998-02-03")
    }
})

// Find between date
db.students.find({
    joinDate: {
        $gte : ISODate("1998-02-03"),
        $lte : ISODate("1998-02-05")
    }
})

// 