import uuidv4 from 'uuid/v4';

const Mutation = {
  createUser: (parent, args, { db }, info) => {
    const { data } = args;
    const emailTaken = db.users.some((user) => user.email === data.email);
    if (emailTaken) throw new Error('Email taken.');
    const user = {
      id: uuidv4(),
      ...data,
    };
    db.users.push(user);
    return user;
  },

  deleteUser: (parent, args, { db }, info) => {
    const { id } = args;
    const userIndex = db.users.findIndex((user) => user.id === id);
    if (userIndex === -1) throw new Error('User not found.');
    const deletedUsers = db.users.splice(userIndex, 1);
    // Delete user posts
    db.posts = db.posts.filter((post) => {
      const match = post.author === id;
      if (match) {
        db.comments = db.comments.filter(
          (comment) => comment.postId !== post.id
        );
      }
      return !match;
    });
    // Delete user comments
    db.comments = db.comments.filter((comment) => comment.author !== id);
    return deletedUsers[0];
  },

  updateUser: (parent, args, { db }, info) => {
    const { id, data } = args;
    const user = db.users.find((user) => user.id === id);
    if (!user) throw new Error('User not found.');
    if (typeof data.email === 'string') {
      const emailTaken = db.users.some((user) => user.email === data.email);
      if (emailTaken) throw new Error('Email taken.');
      user.email = data.email;
    }
    if (typeof data.name === 'string') {
      user.name = data.name;
    }
    if (typeof data.age !== 'undefined') {
      user.age = data.age;
    }
    return user;
  },

  createPost: (parent, args, { db }, info) => {
    const { data } = args;
    const userExists = db.users.some((user) => user.id === data.author);
    if (!userExists) throw new Error('User not found.');
    const post = {
      id: uuidv4(),
      ...data,
    };
    db.posts.push(post);
    return post;
  },

  deletePost: (parent, args, { db }, info) => {
    const { id } = args;
    const postIndex = db.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) throw new Error('Post not found.');
    const deletedPosts = db.posts.splice(postIndex, 1);
    db.comments = db.comments.filter((comment) => comment.postId !== id);
    return deletedPosts[0];
  },

  updatePost: (parent, args, { db }, info) => {
    const { id, data } = args;
    const post = db.posts.find((post) => post.id === id);

    if (!post) throw new Error('Post not found.');
    if (typeof data.title === 'string') {
      post.title = data.title;
    }
    if (typeof data.body === 'string') {
      post.body = data.body;
    }
    if (typeof data.published === 'boolean') {
      post.published = data.published;
    }
    if (typeof data.body === 'string') {
      post.body = data.body;
    }

    return post;
  },

  createComment: (parent, args, { db }, info) => {
    const { data } = args;
    const userExists = db.users.some((user) => user.id === data.author);
    const postExists = db.posts.some(
      (post) => post.id === data.postId && post.published
    );
    if (!userExists || !postExists)
      throw new Error('Unable to find user and post.');
    const comment = {
      id: uuidv4(),
      ...data,
    };
    db.comments.push(comment);
    return comment;
  },

  deleteComment: (parent, args, { db }, info) => {
    const { id } = args;
    const commentIndex = db.comments.findIndex((comment) => comment.id === id);
    if (commentIndex === -1) throw new Error('Comment not found.');
    const deletedComments = db.comments.splice(commentIndex, 1);
    return deletedComments[0];
  },

  updateComment: (parent, args, { db }, info) => {
    const { id, data } = args;
    const comment = db.comments.find((comment) => comment.id === id);
    if (!comment) throw new Error('Comment not found.');
    if (typeof data.text === 'string') {
      comment.text = data.text;
    }
    return comment;
  },
};

export default Mutation;
