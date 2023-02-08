import express from 'express';

// creating fake server so the test passes
// this is not my strong side... yet

export const result = {
    dancer: 'tdd testing db',
    person: {
      id: 1,
      name: 'Robert Waegar',
    },
  };

export const server = () => {
  const t_app = express();
  const tport = 6000;

  t_app.get('/', (req, res) => {
    res.send(result);
  });

  t_app.listen(tport);

  return t_app;
};

