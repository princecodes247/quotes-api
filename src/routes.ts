import express from 'express';
import { createQuote, getAllQuotes, getPaginatedQuotes } from './controllers';


const quotesRouter = express.Router();

quotesRouter.get('/all', getAllQuotes);
quotesRouter.get('/', getPaginatedQuotes);
quotesRouter.post('/', createQuote);

export default quotesRouter;
