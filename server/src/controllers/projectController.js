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
    // مرتب‌سازی پروژه‌ها بر اساس فیلد isFeatured (پروژه‌های ویژه اول) و سپس زمان ساخت
    const projects = await Project.find(filter)
      .sort({ isFeatured: -1, createdAt: -1 })
      .lean();

    const projectsWithRandomImages = projects.map(project => {
      const images = Array.isArray(project.slideshowImages) ? project.slideshowImages : [];
      const randomImage = images.length > 0 
        ? images[Math.floor(Math.random() * images.length)]?.url 
        : null;

      return {
        ...project,
        randomSlideshowImage: randomImage || project.mainImageUrl || null,
      };
    });

    res.json(projectsWithRandomImages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    دریافت یک پروژه با slug
// @route   GET /api/projects/slug/:slug  <-- مسیر پیشنهادی برای جلوگیری از تداخل
// @access  Public
// نکته: من مسیر را به /slug/:slug تغییر دادم تا با ID تداخل نداشته باشد. شما باید این را در projectRoutes.js هم اعمال کنید.
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
    // --- فیلدها با مدل جدید هماهنگ شدند ---
    const {
      title,
      titleFa,
      slug,
      category,
      categoryIcon,
      description,
      descriptionFa,
      overview,
      overviewFa,
      overviewDetails,
      status,
      isFeatured,
      heroButtons,
      projectInfo,
      video,
      features,
      architecture,
      challenges,
      performance,
      results,
      useCases,
      testimonials,
      ctaSection,
      mainImageUrl,
      slideshowImages,
      demoUrl,
      videoUrl,
      metrics,
      icon
    } = req.body;
    
    const projectExists = await Project.findOne({ slug });
    if (projectExists) {
      return res.status(400).json({ message: 'Project with this slug already exists' });
    }

    const project = await Project.create({
      title,
      titleFa,
      slug,
      category,
      categoryIcon,
      description,
      descriptionFa,
      overview,
      overviewFa,
      overviewDetails,
      status,
      isFeatured,
      heroButtons,
      projectInfo,
      video,
      features,
      architecture,
      challenges,
      performance,
      results,
      useCases,
      testimonials,
      ctaSection,
      mainImageUrl,
      slideshowImages,
      demoUrl,
      videoUrl,
      metrics,
      icon
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: 'Error creating project', error: error.message });
  }
};

// @desc    ویرایش یک پروژه
// @route   PUT /api/projects/slug/:slug
// @access  Private (Admin)
const updateProject = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });

    if (project) {
      // --- فیلدهای ارسالی از req.body را استخراج می‌کنیم ---
      const updatableFields = [
        'title',
        'titleFa',
        'slug',
        'category',
        'categoryIcon',
        'description',
        'descriptionFa',
        'overview',
        'overviewFa',
        'overviewDetails',
        'status',
        'heroButtons',
        'projectInfo',
        'video',
        'features',
        'architecture',
        'challenges',
        'performance',
        'results',
        'useCases',
        'testimonials',
        'ctaSection',
        'mainImageUrl',
        'demoUrl',
        'videoUrl',
        'metrics',
        'icon'
      ];

      updatableFields.forEach((field) => {
        if (typeof req.body[field] !== 'undefined') {
          project[field] = req.body[field];
        }
      });

      if (Array.isArray(req.body.slideshowImages)) {
        project.slideshowImages = req.body.slideshowImages;
      }

      if (typeof req.body.isFeatured === 'boolean') {
        project.isFeatured = req.body.isFeatured;
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
// @route   DELETE /api/projects/slug/:slug
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