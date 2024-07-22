import { Request, Response } from 'express';
import { IQuote } from './model';
import { collections } from './database';

export const getAllQuotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const quotes: IQuote[] = await collections.quotes.find().exec();
    res.json(quotes);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getPaginatedQuotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = "1", limit = "10" } = req.query as { page?: string, limit?: string };
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const skip = (parsedPage - 1) * parsedLimit;
    const quotes: IQuote[] = await collections.quotes.find().skip(skip).limit(parsedLimit).exec();
    res.json(quotes);
  } catch (err) {
    console.log({err})
    res.status(500).send(err);
  }
};


export const createQuote = async (req: Request, res: Response): Promise<void> => {
  try {
    const newQuote = await collections.quotes.insert().values({
        message: req.body.message,
        author: req.body.author,
    }).exec()
    res.status(201).json(newQuote);
  } catch (err: any) {
    console.log({err})
    res.status(500).json(err?.message ? err.message : err);
  }
};
