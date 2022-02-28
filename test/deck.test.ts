import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

import { DB_CONN_STRING } from '../config/db.config';
import server, { con } from '../app';
import Deck, { DeckType } from '../src/models/Deck';
import { CardType } from '../src/models/Card';

chai.should();
chai.use(chaiHttp);

const chaiAppServer = chai.request(server).keepOpen();

after((done) => {
  con.db.dropDatabase(() => {
    chaiAppServer.close();
    done();
  });
});

describe('deck api', () => {
  describe('GET /decks', () => {
    it('should get an array of decks', (done) => {
      chaiAppServer.get('/decks').end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('status');
        response.body.should.have.property('result').to.be.a('array');
        done();
      });
    });
  });

  describe('GET /decks/:deckId', () => {
    it('should return the specified deck', (done) => {
      let deck = new Deck({
        type: 'FULL',
        shuffled: false,
        cards: [],
      });

      deck.save((err: unknown, deck: DeckType) => {
        chaiAppServer.get('/decks/' + deck._id).end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.result.should.have.property('_id').eq(deck._id);
          done();
        });
      });
    });
  });

  describe('POST /decks', () => {
    describe('request body is sufficiently supplied', () => {
      it('should return a new Deck record', (done) => {
        chaiAppServer
          .post('/decks')
          .send({ type: 'FULL', shuffled: false })
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status');
            response.body.result.should.have.property('_id');
            done();
          });
      });
    });

    describe('request body is not supplied', () => {
      it('should return a 400 with an error message', (done) => {
        chaiAppServer.post('/decks').end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a('object');
          response.body.should.have.property('status');
          response.body.should.have.property('error');
          done();
        });
      });
    });
  });

  describe('POST /decks/:deckId/draw', () => {
    let newDeck: DeckType;
    let drawnCards: Array<CardType>;

    before((done) => {
      chaiAppServer
        .post('/decks')
        .send({ type: 'FULL', shuffled: false })
        .end((err, response) => {
          newDeck = response.body.result;
          done();
        });
    });

    it('should return the number of cards as a result', (done) => {
      chaiAppServer
        .post(`/decks/${newDeck._id}/draw`)
        .send({ count: '3' })
        .end((err, response) => {
          drawnCards = response.body.result;

          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('status');
          response.body.result.should.be.a('array');
          response.body.result.length.should.eql(3);
          done();
        });
    });

    it('should remove the drawn cards from the deck', (done) => {
      chaiAppServer.get(`/decks/${newDeck._id}`).end((err, response) => {
        response.body.result.cards.length.should.eql(49);
        response.body.result.cards.should.not.have.deep.members(drawnCards);
        done();
      });
    });
  });
});
