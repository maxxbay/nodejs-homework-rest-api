const { Contact } = require("../../models/contacts.js");

const { RequestError } = require("../../helpers/index.js");

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findOneAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateContact;
