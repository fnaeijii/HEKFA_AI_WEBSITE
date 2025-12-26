// src/controllers/postController.js
const Post = require('../models/PostModel');

const MAIN_CATEGORIES = ['Computer Vision', 'NLP', 'Generative AI', 'Robotics'];

// @desc    ایجاد یک پست جدید
// @route   POST /api/posts
// @access  Private (Admin)
const createPost = async (req, res) => {
  try {
    const {
      title,
      titleFa,
      slug,
      summary,
      summaryFa,
      content,
      contentFa,
      category,
      tags,
      status,
      mainImageUrl,
      heroImage,
      coverImage,
      authors,
      journal,
      publishedAt,
      citations,
      downloadUrl,
      pdfUrl,
      doi,
      readTimeMinutes,
      sections,
      references,
    } = req.body;

    const postExists = await Post.findOne({ slug });
    if (postExists) {
      return res.status(400).json({ message: 'Post with this slug already exists' });
    }

    const post = new Post({
      title,
      titleFa,
      slug,
      summary,
      summaryFa,
      content,
      contentFa,
      category,
      tags,
      status,
      mainImageUrl,
      heroImage,
      coverImage,
      authors,
      journal,
      publishedAt,
      citations,
      downloadUrl,
      pdfUrl,
      doi,
      readTimeMinutes,
      sections,
      references,
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
    const {
      title,
      titleFa,
      slug,
      summary,
      summaryFa,
      content,
      contentFa,
      category,
      tags,
      status,
      mainImageUrl,
      authors,
      journal,
      publishedAt,
      citations,
      downloadUrl,
      pdfUrl,
      doi,
      readTimeMinutes,
      sections,
      references,
    } = req.body;
    const post = await Post.findOne({ slug: req.params.slug });

    if (post) {
      post.title = title || post.title;
      post.titleFa = titleFa ?? post.titleFa;
      post.slug = slug || post.slug;
      post.summary = summary ?? post.summary;
      post.summaryFa = summaryFa ?? post.summaryFa;
      post.content = content ?? post.content;
      post.contentFa = contentFa ?? post.contentFa;
      post.category = category ?? post.category;
      post.tags = tags ?? post.tags;
      post.status = status ?? post.status;
      post.mainImageUrl = mainImageUrl ?? post.mainImageUrl;
      post.heroImage = heroImage ?? post.heroImage;
      post.coverImage = coverImage ?? post.coverImage;
      post.authors = authors ?? post.authors;
      post.journal = journal ?? post.journal;
      post.publishedAt = publishedAt ?? post.publishedAt;
      post.citations = citations !== undefined ? citations : post.citations;
      post.downloadUrl = downloadUrl ?? post.downloadUrl;
      post.pdfUrl = pdfUrl ?? post.pdfUrl;
      post.doi = doi ?? post.doi;
      post.readTimeMinutes = readTimeMinutes ?? post.readTimeMinutes;
      post.sections = sections ?? post.sections;
      post.references = references ?? post.references;

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

const getPosts = async (req, res) => {
  try {
    const includeDrafts = req.query.all === 'true' && req.user?.isAdmin;
    const filter = includeDrafts ? {} : { status: 'published' };
    const posts = await Post.find(filter)
      .populate('author', 'name')
      .sort({ publishedAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    دریافت پست‌ها گروه‌بندی‌شده بر اساس دسته‌بندی ثابت
// @route   GET /api/posts/grouped
// @access  Public
const getPostsGroupedByCategory = async (req, res) => {
  try {
    const posts = await Post.find({ status: 'published' })
      .populate('author', 'name')
      .sort({ publishedAt: -1 })
      .lean();

    const grouped = MAIN_CATEGORIES.map((category) => ({
      category,
      items: posts.filter((post) => post.category === category),
    })).filter((group) => group.items.length > 0);

    res.json(grouped);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
const getPostBySlug = async (req, res) => {
  try {
    const filter = { slug: req.params.slug };
    const canPreview = req.query.preview === 'true' && req.user?.isAdmin;
    if (!canPreview) {
      filter.status = 'published';
    }

    const post = await Post.findOne(filter).populate('author', 'name email');
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found or not published' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { createPost, updatePost, deletePost, getPosts, getPostsGroupedByCategory, getPostBySlug };