declare namespace Express {
  export interface Request {
    headers: {
      authorization: string;
    };
  }
}
