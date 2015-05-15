// 1. Write a query to find every document in the `products` collection.
db.products.find();

// 2. Write a query to find out how many `products` belong to the company "Schoen-Emard".
db.products.find( {company: "Schoen-Emard"});

//3. Write a query to find all `products` that belong to the company "Schoen-Emard" in the "Games, Health & Home" department.
db.products.find( {company: "Schoen-Emard", department: "Games, Health & Home"});
// db.products.find( {company: { department: [ 'Schoen-Emard', 'Games, Health & Home' ] } } );

//4. Write a query to find all `products` that belong to the company "Schoen-Emard" in the "Games, Health & Home" department with a price over $90.00.
db.products.find( {company: "Schoen-Emard", department: "Games, Health & Home", price: {$gt: 90}})

db.products.aggregate( [ { $match:{
    company: "Schoen-Emard",
    department: "Games, Health & Home",
    price: { $gt: 90}
  }
 }]);

//5. Write a query to find all `products` that belong to either company of "Schaden Group" and "Fay, Ryan and Deckow", but only return the product itself, not the company, department or price.
db.products.find( { $or:[ { company:  "Schaden Group" } , { company: "Fay, Ryan and Deckow" } ] }, {product: 1} );

db.products.aggregate( [ { $match: { $or: [{
    company: "Schaden Group",
    company: "Fay, Ryan and Deckow"
  ]}
  }}]);

//6. Use the aggregation pipeline to return all `products` that belong to the company "Kub-Hansen".
db.products.aggregate ( [ { $match: {
  company: "Kub-Hansen"
}}]);

//7. Use the aggregation pipeline to return all `products` with a price greater than $10.00 and less than $60.00.
db.products.aggregate (  { $match: {
  price: {$gt: 10, $lt: 60}
}});


//8. Use the aggregation pipeline to return a count of the number of `products` with a price greater than $10.00 and less than $60.00.
db.products.aggregate ( { $match: {
  price: {$gt: 10, $lt: 60}
    }
  },
      { $group: {_id: !null, count: { $sum: 1}
    }
  }
);

//9. Use the aggregation pipeline to compute the sum of all products sold by the company "Kub-Hansen"?
db.products.aggregate([ { $match:
 {
   company: "Kub-Hansen"
   }
 },
   { $group: { _id: !null, totalAmount: { $sum: "$price" } } }
   ])
