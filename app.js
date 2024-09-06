const express = require('express');
const app = express();
const port = 3008;

const data = {
  entitlement_assignments: {
    bob: [
      {
        entitlement: {
          domain: 'cphi.com',
          product: {
            type: 'webinar',
            id: 'web123',
          },
          userID: 'bob',
          exp: '2024-11-11',
        },
      },
    ],
  },
};

const configs = [
  {
    config: {
      entries: [
        {
          url: 'http:/localhost:7002/policy-data',
          topics: ['topic1'],
          dst_path: '/static',
        },
      ],
    },
  },
];

app.get('/data', (req, res) => {
  res.send(data);
});

// get DATA_SOURCE_CONFIG for each client, based on JWT provided
app.get('/configs', (req, res) => {
  res.send(configs[0]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
