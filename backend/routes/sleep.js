import express from 'express';
const router = express.Router();
import Sleep from '../models/Sleep.js';
// Get all sleep records
router.get('/', async (req, res) => {
  try {
    const sleeps = await Sleep.find();
    res.json(sleeps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new sleep record
router.post('/', async (req, res) => {
  const sleep = new Sleep({
    date: req.body.date,
    hours: req.body.hours,
  });

  try {
    const newSleep = await sleep.save();
    res.status(201).json(newSleep);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get total sleep hours by day
router.get('/analysis/day', async (req, res) => {
  try {
    const result = await Sleep.aggregate([
      {
        $group: {
          _id: '$date',
          totalHours: { $sum: '$hours' },
        },
      },
      { $match: { _id: { $ne: null } } }, // Filter out null dates
      { $sort: { _id: 1 } }, // Sort by date ascending
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get total sleep hours by month
router.get('/analysis/month', async (req, res) => {
  try {
    const result = await Sleep.aggregate([
      {
        $group: {
          _id: { $substrCP: ['$date', 0, 7] }, // Extract year-month portion of date
          totalHours: { $sum: '$hours' },
        },
      },
      { $match: { _id: { $ne: null } } }, // Filter out null dates
      { $sort: { _id: 1 } }, // Sort by month ascending
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get total sleep hours by year
router.get('/analysis/year', async (req, res) => {
  try {
    const result = await Sleep.aggregate([
      {
        $group: {
          _id: { $substrCP: ['$date', 0, 4] }, // Extract year portion of date
          totalHours: { $sum: '$hours' },
        },
      },
      { $match: { _id: { $ne: null } } }, // Filter out null dates
      { $sort: { _id: 1 } }, // Sort by year ascending
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get sleep records by year
router.get('/search/year/:year', async (req, res) => {
    const year = parseInt(req.params.year);
    try {
      const sleeps = await Sleep.find({
        date: { $regex: `^${year}` } // Matches records starting with the given year
      });
      res.json(sleeps);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Get sleep records by year and month
  router.get('/search/year/:year/month/:month', async (req, res) => {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);
    try {
      const sleeps = await Sleep.find({
        date: { $regex: `^${year}-${month.toString().padStart(2, '0')}` } // Matches records starting with the given year-month
      });
      res.json(sleeps);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Get sleep records by year, month, and day
  router.get('/search/year/:year/month/:month/day/:day', async (req, res) => {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);
    const day = parseInt(req.params.day);
    try {
      const sleeps = await Sleep.find({
        date: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}` // Matches records with the given year-month-day
      });
      res.json(sleeps);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


  router.delete('/:id', async (req, res) => {
    try {
      const sleep = await Sleep.findByIdAndDelete(req.params.id);
      if (!sleep) {
        return res.status(404).json({ message: 'Cannot find sleep record' });
      }
      res.json({ message: 'Deleted sleep record' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

export default router;
