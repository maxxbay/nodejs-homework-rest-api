const { Contact } = require("../../models/contacts.js");

const { RequestError } = require("../../helpers");

const getContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = getContact;
