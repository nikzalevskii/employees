const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET /api/employees
 * @desc Get all employees
 * @access private
 */
const all = async (req, res) => {
  try {
    const employess = await prisma.employee.findMany();

    res.status(200).json(employess);
  } catch (error) {
    res.status(400).json({ message: "Не удалось получить сотрудников" });
  }
};

module.exports = {
  all,
};
