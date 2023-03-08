const express = require('express');

const {
  getAllTour,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTour,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController');
const { createReview } = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');
const router = express.Router();
// router.param('id', checkId);
router.route('/tours-stats').get(getTourStats);
router.route('/get-monthly-plan/:year').get(getMonthlyPlan);
router.route('/top-5-cheap').get(aliasTopTour, getAllTour);
router.route('/').get(getAllTour).post(createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

// POST: /tour/234khjlo34/reviews
// GET: /tour/234khjlo34/reviews
// GET: /tour/234234sadf/reviews/234asdf3w4
router
  .route('/:tourId/reviews')
  .post(protect, restrictTo('user'), createReview);
module.exports = router;
