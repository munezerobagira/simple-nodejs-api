import { User } from "../models/";
export default class UserService {
  //get single blog

  static async createuser({ email, password, name, age, address }) {
    const user = await User.create({
      email,
      password,
      name,
      age,
      address,
    });
    if (!user) return { error: "User not found" };
    return { user };
  }
  static async getUser({ name, uuid, age, email }) {
    const user = await User.findOne({ uuid, name, age, email });
    if (!user) return { error: "User not found" };
    return { user };
  }

  // return all blogs

  static async updateUser(uuid, { email, password, name, age, address }) {
    try {
      const user = await User.findOne({ uuid });
      if (!user) return { error: "User not found" };
      if (email) user.email = email;
      if (password) user.password = password;
      if (age) user.age = age;
      if (name) user.name = name;
      if (address) user.address = address;
      await user.save();
      return { user };
    } catch (error) {
      return { error: error.message };
    }
  }
}
