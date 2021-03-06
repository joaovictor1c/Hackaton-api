import Courier from '../models/Courier';

class CourierController {
  async store(req, res) {
    const deliveryExists = await Courier.findOne({
      where: { email: req.body.email },
    });

    if (deliveryExists) {
      return res.status(400).json({ error: 'Delivery already exists' });
    }

    const { id, name, email, cpf, rg, phone, active } = await Courier.create(
      req.body
    );
    return res.json({ id, name, email, cpf, rg, phone, active });
  }

  async uptade(req, res) {
    const { email, oldPassword } = req.body;

    const deliveryMan = await Courier.findByPk(req.userId);

    if (email !== deliveryMan.email) {
      const deliveryExists = await Courier.findOne({
        where: { email },
      });
      if (deliveryExists) {
        return res.status(400).json({ error: 'Delivery already exists' });
      }
    }
    if (oldPassword && !(await deliveryMan.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, cpf, rg, phone, active } = await deliveryMan.update(
      req.body
    );

    return res.json({ id, name, email, cpf, rg, phone, active });
  }
}

export default new CourierController();
