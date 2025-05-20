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
    returnres.status(500).json({ message: "Не удалось получить сотрудников" });
  }
};

/**
 * @route POST /api/employees/add
 * @desc Добавление сотрудника
 * @access private
 */
const add = async (req, res) => {
  try {
    const data = req.body;

    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({ message: "Не все поля заполнены" });
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });

    return res.status(200).json(employee);
  } catch (error) {
    returnres.status(500).json({ message: "Что-то пошло не так" });
  }
};

/**
 * @route POST /api/employees/remove/:id
 * @desc Удаление сотрудника
 * @access private
 */
const remove = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.employee.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({ message: "Ок. Сотрудник удален" });
  } catch (error) {
    return res.status(500).json({ message: "Не удалось удалить сотрудника" });
  }
};

/**
 * @route POST /api/employees/edit/:id
 * @desc Редактирование сотрудника
 * @access private
 */
const edit = async (req, res) => {
  try {
    const data = req.body;
    const { id } = data;

    await prisma.employee.update({
      where: {
        id,
      },
      data,
    });

    res.status(200).json({ message: "Ок. Сотрудник отредактирован" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Не удалось редактировать сотрудника" });
  }
};

/**
 * @route GET /api/employees/:id
 * @desc Получение сотрудника
 * @access private
 */
const employee = async (req, res) => {
  // get запрос. берем из параметров
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
    });

    res.status(200).json(employee);
  } catch (error) {
    return res.status(500).json({ message: "Не удалось получить сотрудника" });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  employee,
};
