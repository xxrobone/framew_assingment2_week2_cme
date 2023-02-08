import express from 'express';

// creating fake server so the test passes

const serverForTest = () => {
  const t_app = express();
  const tport = 6000;
  const result = {
    dancer: 'tdd testing db',
    person: {
      id: 1,
      name: 'Robert Waegar',
    },
  };

  t_app.get('/', (req, res) => {
    res.send(result);
  });

  t_app.listen(tport);

  return t_app;
};

module.exports = {
  serverForTest,
};
