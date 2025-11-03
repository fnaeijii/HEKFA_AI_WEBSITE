// src/controllers/projectController.js
const Project = require('../models/ProjectModel');

// @desc    دریافت تمام پروژه‌ها (با قابلیت فیلتر)
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const filter = {};
    if (req.query.featured === 'true') {
      filter.isFeatured = true;
    }
    const projects = await Project.find(filter).sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    دریافت یک پروژه با slug
// @route   GET /api/projects/:slug
// @access  Public
const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    ایجاد یک پروژه جدید
// @route   POST /api/projects
// @access  Private (Admin)
const createProject = async (req, res) => {
  try {
    const { title, slug, summary, description, category, technologies, status, metrics, projectUrl, order, mainImageUrl, galleryImageUrls } = req.body;
    
    const projectExists = await Project.findOne({ slug });
    if (projectExists) {
      return res.status(400).json({ message: 'Project with this slug already exists' });
    }

    const project = await Project.create({
      title, slug, summary, description, category, technologies, status, metrics, projectUrl, order, mainImageUrl, galleryImageUrls
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: 'Error creating project', error: error.message });
  }
};

// @desc    ویرایش یک پروژه
// @route   PUT /api/projects/:slug
// @access  Private (Admin)
const updateProject = async (req, res) => {
  try {
    const { title, slug, summary, description, category, technologies, status, isFeatured, metrics, projectUrl, order, mainImageUrl, galleryImageUrls } = req.body;

    const project = await Project.findOne({ slug: req.params.slug });

    if (project) {
      project.title = title || project.title;
      project.slug = slug || project.slug;
      project.summary = summary || project.summary;
      project.description = description || project.description;
      project.category = category || project.category;             // <<-- اضافه شد
      project.technologies = technologies || project.technologies;
      project.status = status || project.status;
      project.metrics = metrics || project.metrics;                 // <<-- اضافه شد
      project.projectUrl = projectUrl || project.projectUrl;
      project.order = order !== undefined ? order : project.order;
      project.mainImageUrl = mainImageUrl || project.mainImageUrl;
      project.galleryImageUrls = galleryImageUrls || project.galleryImageUrls;
      
      if (typeof isFeatured === 'boolean') {
        project.isFeatured = isFeatured;
      }

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating project', error: error.message });
  }
};


// @desc    حذف یک پروژه
// @route   DELETE /api/projects/:slug
// @access  Private (Admin)
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findOne({ slug: req.params.slug });
        if (project) {
            await project.deleteOne();
            res.json({ message: 'Project removed' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getProjects, getProjectBySlug, createProject, updateProject, deleteProject };