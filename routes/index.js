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

router.get('/question-3', function(req, res, next) {
  const roster1 = {
    Id: 1,
    Employee: 1,
    Department: 1,
    StartTime: 1508450400,
    EndTime: 1508479200
  };
  const roster2 = {
    Id: 1,
    Employee: 1,
    Department: 1,
    StartTime: 1508457600, //1508630400,
    EndTime: 1508486400 //1508652000
  };

  // Check to see if the StartTime & EndTime of Roster2 overlaps 
  // with StartTime & EndTime of Roster1

  // First check to see if the employees are the same
  if (roster1.Id === roster2.Id) {
    if (checkOverlap(roster1.StartTime, roster1.EndTime, roster2.StartTime, roster2.EndTime)) {
      res.send({ overlap_exists: true});
    }
    else {
      // There is no overlap
      res.send({ overlap_exists: false});
    }
  }
  else {
    res.send({ overlap_exists: false});
  }
});


function checkOverlap(startTimeA, endTimeA, startTimeB, endTimeB) {
  // If the startTimeA comes before the endTimeB that means
  // there is an overlap since B is currently underway
  // Also, if endTimeA comes after startTimeB that also means
  // there is an overlap
  if ((startTimeA <= endTimeB) && (endTimeA >= startTimeB)) {
    return true;
  }
  else {
    return false;
  }
}

module.exports = router;
