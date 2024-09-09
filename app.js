const express = require('express');
const app = express();
const port = 3008;

app.use(express.json());

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

app.get('/resource/:id', (req, res) => {
  const id = req.params.id;
  res.send(data.entitlement_assignments[id]);
});

app.post('/add-entitlement', (req, res) => {
  // update subscriptions for example
  const newEntitlement = req.body;
  Object.keys(newEntitlement).forEach((key) => {
    if (data.entitlement_assignments[key]) {
      data.entitlement_assignments[key] = [
        ...data.entitlement_assignments[key],
        ...newEntitlement[key],
      ];
    } else {
      data.entitlement_assignments[key] = newEntitlement[key];
    }
  });
  // here we will know from the request body what was changed
  // eg. Bob paid subscription for article with uid 123

  const dataForUpdatingOPACache = {};

  res.send({});
});

app.post('/update-entitlement/:id', (req, res) => {
  console.log('usao');
  const updatedValue = req.body;
  const id = req.params.id;
  data.entitlement_assignments[id] = updatedValue;
  res.send(data.entitlement_assignments[id]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
