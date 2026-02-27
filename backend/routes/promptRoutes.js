import { Router } from 'express';
import { generatePrompt } from '../controllers/promptController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/generate', protect, generatePrompt);

export default router;
