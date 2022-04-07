import PostService from "../services/PostService";
class PostController {
  // create a post
  static async create(req, res) {
    try {
      const { title, content } = req.body;
      const { post, error } = await PostService.createPost({ title, content });
      if (post)
        return res
          .status(201)
          .json({ status: 201, message: "Post created", post });
      return res.status(404).json({ status: 404, error });
    } catch (error) {
      res.status(500).json({ status: 500, error });
    }
  }

  static async singlePost(req, res) {
    try {
      const id = req.params.id;
      const { post, error } = await PostService.getSingle(id);
      if (!post) return res.status(404).json({ status: 404, error });
      return res
        .status(200)
        .json({ status: 200, post, message: "fetched data successfuly" });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.stack });
    }
  }
  static async allPost(req, res) {
    const { posts, error } = await PostService.getAll();
    if (posts)
      return res
        .status(200)
        .json({ status: 200, posts, message: "Recieved posts" });
    return res.status(404).json({ status: 404, error });
  }
  static async delete(req, res) {
    try {
      const id = req.params.id;
      const { post, error } = await PostService.deletePost(id);
      if (post)
        return res
          .status(200)
          .json({ status: 200, message: "Post deleted successful" });
      return res.status(404).json({ status: 404, error });
    } catch {
      res.status(500).json({ status: 500, error });
    }
  }

  static async update(req, res) {
    try {
      const { title, content } = req.body;
      const id = req.params.id;
      const { post, error } = await PostService.updatePost(id, {
        title,
        content,
      });
      if (!post) return res.status(404).json({ status: 404, error });
      return res
        .status(200)
        .json({ status: 200, message: "Post updated successful", post });
    } catch {
      res.status(500).json({ status: 500, error });
    }
  }
}

export default PostController;
