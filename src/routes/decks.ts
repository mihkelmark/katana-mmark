import express from 'express';

import deckController from '../controllers/deck';

const router = express.Router();

router.get('/', deckController.getDecks);
router.post('/', deckController.createDeck);
router.get('/:uuid', deckController.getDeck);
router.post('/:uuid/draw', deckController.drawFromDeck);

export default router;
