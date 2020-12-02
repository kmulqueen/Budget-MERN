module.exports = {
  test: function (req, res) {
    res.status(200).json({ message: "Budget test route works." });
  },
};
