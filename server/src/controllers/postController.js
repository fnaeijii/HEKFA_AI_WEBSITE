// src/controllers/postController.js
const Post = require('../models/PostModel');

// @desc    ایجاد یک پست جدید
// @route   POST /api/posts
// @access  Private (Admin)
const createPost = async (req, res) => {
  try {
    const { title, slug, summary, content, category, tags, status, mainImageUrl, authors, journal, publishedAt, citations, downloadUrl } = req.body;

    const postExists = await Post.findOne({ slug });
    if (postExists) {
      return res.status(400).json({ message: 'Post with this slug already exists' });
    }

    const post = new Post({
      title, slug, summary, content, category, tags, status, mainImageUrl,
      authors, journal, publishedAt, citations, downloadUrl,
      author: req.user._id,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(400).json({ message: 'Error creating post', error: error.message });
  }
};

// @desc    ویرایش یک پست
// @route   PUT /api/posts/:slug
// @access  Private (Admin)
const updatePost = async (req, res) => {
  try {
    const { title, slug, summary, content, category, tags, status, mainImageUrl, authors, journal, publishedAt, citations, downloadUrl } = req.body;
    const post = await Post.findOne({ slug: req.params.slug });

    if (post) {
      post.title = title || post.title;
      post.slug = slug || post.slug;
      post.summary = summary || post.summary;
      post.content = content || post.content;
      post.category = category || post.category;
      post.tags = tags || post.tags;
      post.status = status || post.status;
      post.mainImageUrl = mainImageUrl || post.mainImageUrl;
      
      post.authors = authors || post.authors;                   
      post.journal = journal || post.journal;                   
      post.publishedAt = publishedAt || post.publishedAt;       
      post.citations = citations !== undefined ? citations : post.citations;
      post.downloadUrl = downloadUrl || post.downloadUrl;  

      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating post', error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (post) {
      await post.deleteOne();
      res.json({ message: 'Post removed' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const getAllPublishedPosts = async (req, res) => {
  try {
    const posts = await Post.find({ status: 'published' })
      .populate('author', 'name')
      .sort({ publishedAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, status: 'published' })
      .populate('author', 'name email');
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found or not published' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { createPost, updatePost, deletePost, getAllPublishedPosts, getPostBySlug };