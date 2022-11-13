const { Contact } = require("../../models/contacts.js");
const { RequestError } = require("../../helpers/index.js");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({
    message: "Contact remove",
  });
};

module.exports = removeContact;
