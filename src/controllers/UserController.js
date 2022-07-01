import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserService from '../services/UserService';

class UserController {
  // create a post
  static async signup(request, response) {
    try {
      const {
        email, password, name, age, address,
      } = request.body;
      if (!email || !password || !name || !age) return response.status(422).json({ message: 'Please enter all valid data' });
      const result = await UserService.getUser({ email });
      if (result.user) return response.status(400).json({ message: 'email already exits' });
      const { user, error } = await UserService.createuser({
        email,
        password,
        name,
        age,
        address,
      });
      if (user) return response.status(201).json({ status: 201, message: 'User has been created', user });
      return response.status(404).json({ status: 404, error });
    } catch (error) {
      response.status(500).json({ status: 500, error });
    }
  }

  static async getUser(request, response) {
    try {
      const { uuid } = request.user;
      const { user, error } = await UserService.getUser({ uuid });
      if (!user) return response.status(404).json({ status: 404, error });
      return response.status(200).json({ status: 200, user, message: 'User found' });
    } catch (error) {
      response.status(500).json({ status: 500, error: error.stack });
    }
  }

  static async updateUser(request, response) {
    try {
      const { uuid } = request.user;
      const {
        password, age, name, email, address,
      } = request.body;
      const result = await UserService.updateUser(uuid, {
        password,
        age,
        name,
        email,
        address,
      });
      if (result) return response.status(200).json({ status: 200, message: 'Recieved posts', result });
      return response.status(400).json();
    } catch (error) {
      return response.status(404).json({ status: 404, error });
    }
  }

  static async signin(request, response) {
    try {
      const { SECRET } = process.env;
      const { email, password } = request.body;
      const { user } = await UserService.getUser({ email });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return response.status(400).json({ message: 'Invalid credentials' });
      }

      const token = await jwt.sign({ uuid: user.uuid }, SECRET, {
        expiresIn: 24 * 60 * 60 * 1000,
      });

      return response.status(200).json({ status: 200, token, message: 'User loggedin successful' });
    } catch (error) {
      response.status(500).json({ status: 500, error });
    }
  }
}

export default UserController;
