import express from 'express';

import deckController from '../controllers/deck';

const router = express.Router();

router.get('/', deckController.getDecks);
router.post('/', deckController.createDeck);
// router.get('/decks/{uuid}')
// router.post('/decks/{uuid}/draw)

export default router;
