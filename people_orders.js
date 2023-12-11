// 1. 
db.people.aggregate([
  {$group: {
_id: null,
averageAge: {$avg: "$age"}
}}
])


// 2.
db.people.aggregate([
  {$group: {
_id: "$gender",
averageAge: {$avg: "$age"}
}}
])


// 3.
db.people.aggregate([
  {$group: {
_id: "$gender",
count: {$sum: 1}}
}
])


// 4.
db.people.aggregate([
  {$sort: {age: -1}},
  {$limit: 3}
])


// 5.
db.people.aggregate([
  {$sort: {age: 1}},
  {$limit: 5},
  {$project: {
full_name: {$concat: ["$first_name", " ", "$last_name"]},
age: 1,
_id: 0}}
])


// 6. 
db.people.aggregate([
  {$group: {
_id: null,
averageKids: {$avg: {$size: "$children"}}
}}
])


// 7.
db.people.aggregate([
  {$unwind: "$children"},
{$match: {state: "Michigan", "children.age": {$lt: 10}}},
{$project: { 'children.name': 1, 'children.age': 1, _id: 0}}
    ])



// 8. 
db.people.aggregate([
  {$unwind: "$children"},
  {$group: {_id: "$state", averageAge_child: {$avg: "$children.age"}}},
  {$sort: {averageAge_child: -1}}
])


//.9 
db.orders.aggregate([
  {$group: { _id: null, totalSales: { $sum: "$total"} }}
])


// 10.
db.orders.aggregate([
  {$match: { date: "2017-05-22"}},
  {$group: { _id: "$date", totalSales: { $sum: "$total"} }}
])


// 11.
db.orders.aggregate([
  {$group: { _id: "$date", totalOrders: { $sum: 1} }},
  {$sort: {totalOrders: -1}},
  {$limit: 1}
]) 


// 12.
db.orders.aggregate([
 	{$group: { _id: "$date", totalSales: { $sum: "$total"} }},
  {$sort: {totalSales: -1}},
  {$limit: 1}
])


// 13.
db.orders.aggregate([
  {$unwind: "$items"},
  {$group: {_id: "$items.product", num_sold: {$sum: "$items.count"}}},
  {$sort: {num_sold: -1}},
  {$limit: 3}
])


// 14. 
db.orders.aggregate([
  {$unwind: "$items"},
  {$group: { _id: "$items.product", 
revenue: {$sum: {$multiply: ["$items.count", "$items.price"]}}}},
  {$sort: {revenue: -1}},
  {$limit: 1}
])