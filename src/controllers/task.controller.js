const taskCtrl = {};

taskCtrl.createNewTask = (req, res) => {
  console.log(req.body);
  res.send("new note");
};

module.exports = taskCtrl;
