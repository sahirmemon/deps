var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Deputy' });
});

router.get('/question-2', function(req, res, next) {
  res.render('question-2', { title: 'Deputy' });
});

router.get('/question-2-data', function(req, res, next) {
  const users = [
    {
      Id: 14, 
      DisplayName: 'Jose Carreras',
      Location: 2,
      Role: 55,
      PhotoUrl: 'https://d11hmzhsuwuq9f.cloudfront.net/J+C/135/135'
    },
    {
      Id: 15,
      DisplayName: 'Anna Karenina',
      Location: 1,
      Role: 55,
      PhotoUrl: 'https://d11hmzhsuwuq9f.cloudfront.net/A+K/135/135'
    }
  ];
  const roles = [
    {
      Id: 3,
      Name: 'System Administrator',
      ParentRole: 0
    },
    {
      Id: 5,
      Name: 'Supervisor',
      ParentRole: 61
    },
    {
      Id: 55,
      Name: 'Employee',
      ParentRole: 5
    },
    {
      Id: 61,
      Name: 'Location Manager',
      ParentRole: 3
    }
  ];
  const locations =  [
    {
      Id: 1,
      Name: 'Potts Point'
    },
    {
      Id: 2,
      Name: 'Lannister'
    }
  ];
  res.send({ users: users, roles: roles, locations: locations });
});

module.exports = router;
