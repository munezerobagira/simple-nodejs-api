import Post from "../models/Post";
export default class PostService {
  static async getSingle(id) {
    try {
      const post = await Post.findOne({ _id: id });
      if (!post) return { error: "Post not found" };
      return { post };
    } catch (error) {
      return { error: "Post not found" };
    }
  }
  static async getAll() {
    try {
      const posts = await Post.find();
      if (!posts) return { error: "No posts" };
      return { posts };
    } catch (error) {
      return { posts: null, error: error.message };
    }
  }

  static async updatePost(id, { title, content }) {
    try {
      const post = await Post.findOne({ _id: id });
      if (!post) return { error: "Post doesn't exists" };
      if (title) {
        post.title = title;
      }

      if (content) {
        post.content = content;
      }
      await post.save();
      return { post };
    } catch (error) {
      return { error: "Post doesn't exists" };
    }
  }

  static async deletePost(id) {
    try {
      const post = await Post.deleteOne({ _id: id });
      if (post.deletedCount) return { post: "deleted" };
      else throw new Error("Post not found");
    } catch (error) {
      return { post: null, error: "Post doesn't exists" };
    }
  }

  static async createPost({ title, content }) {
    try {
      const post = new Post({
        title,
        content,
      });
      await post.save();
      return { post };
    } catch (error) {
      return { post: null, error: "May be validation error" };
    }
  }
}
