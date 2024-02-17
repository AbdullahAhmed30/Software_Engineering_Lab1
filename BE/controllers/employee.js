const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params
  const isPresent = employee.find((emp) => emp.id === id)
  if (isPresent.id == -1){
    res.status(400).send('employee not found')
    return
  }
  employee.splice(isPresent, 1)
  res.status(200).send('employee deleted successfully')
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const newEmployee = req.body
  const isPresent = employee.find((emp) => emp.id === newEmployee.id)
  if (isPresent){
    res.status(400).send('employee already exists')
    return
  }
  employee.push(req.body)
  res.status(201).send('employee added successfully')
};
