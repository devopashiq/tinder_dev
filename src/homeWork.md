AuthRoutes

POST/login
POST/signup
POST/logout


profileRoutes

GET/profile/view
POST/profile/edit
POST/profile/password







requestRoutes

POST /request/send/interseted/:userId
POST /request/send/ignored/:userId
POST /request/review/accepted/:reqId
POST /request/send/rejected/:reqid




 - Create Connnection Request Schema
 - Send Connection Request API
 - Proper validation of Data
 - Think about ALL corner cases
 - $or query $and query in mongoose - https://www.mongodb.com/docs/manual/reference/operator/query-logical/
 - schema.pre("save") function
 - Read more about indexes in MongoDB
 - Why do we need index in DB?
 - What is the advantages and disadvantage of creating?
 - Read this arcticle about compond indexes - https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
 - ALWAYS THINK ABOUT CORNER CASES 
