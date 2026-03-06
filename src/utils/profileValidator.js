

module.exports = function isValidProfileFeilds(req) {
  const newProfile = req.body;


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

  const isvalid = Object.keys(newProfile).every((key) =>
    allowedEditFeilds.includes(key)
  );

  return isvalid;
};
