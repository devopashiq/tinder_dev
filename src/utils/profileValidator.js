// {
//     "_id": "68d6bc0d63266b0d7466dcd1",
//     "firstName": "Ashiq",
//     "lastName": "P",
//     "about": "This is default About",
//     "email": "mhdashiq88@gmail.com",
//     "password": "$2b$10$N9TxHZfixMd3oSDCgnnAZeC4QoSX6i1EZkT4PdznOjflK136sViqG",
//     "age": 18,
//     "gender": "female",
//     "skils": [],
//     "createdAt": "2025-09-26T16:15:09.190Z",
//     "updatedAt": "2025-09-26T16:16:20.000Z",
//     "__v": 0
// }

module.exports = function isValidProfileFeilds(req) {
  const newProfile = req.body;
  // console.log(newProfile);
  

  const allowedEditFeilds = [
    "firstName",
    "lastName",
    "about",
    "email",
    "age",
    "skils",
    "gender",
    'photoUrl'

  ];
 //"Object.keys" returns array key of object
 //"every" loop each item and "includes" 
 // check each looped item includes or not,
 // if all includes it return true , else give false
  const isvalid = Object.keys(newProfile).every((key) =>
    allowedEditFeilds.includes(key)
  );

  return isvalid;
};
