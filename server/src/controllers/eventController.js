const Event = require('../models/EventModel');

// @desc    ایجاد یک رویداد جدید
// @route   POST /api/events
// @access  Private (Admin)
const createEvent = async (req, res) => {
  try {
    const {
      title,
      titleFa,
      date,
      location,
      locationFa,
      description,
      descriptionFa,
      boothNumber,
      registrationUrl,
      isActive,
      imageUrl,
    } = req.body;
    const event = await Event.create({
      title,
      titleFa,
      date,
      location,
      locationFa,
      description,
      descriptionFa,
      boothNumber,
      registrationUrl,
      isActive,
      imageUrl,
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: 'Error creating event', error: error.message });
  }
};

// @desc    دریافت تمام رویدادهای فعال
// @route   GET /api/events
// @access  Public (with admin preview)
const getActiveEvents = async (req, res) => {
  try {
    const includeInactive = req.query.all === 'true' && req.user?.isAdmin;
    const filter = includeInactive ? {} : { isActive: true };
    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    ویرایش یک رویداد
// @route   PUT /api/events/:id
// @access  Private (Admin)
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: 'Error updating event', error: error.message });
  }
};

// @desc    حذف یک رویداد
// @route   DELETE /api/events/:id
// @access  Private (Admin)
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  createEvent,
  getActiveEvents,
  updateEvent,
  deleteEvent,
};