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

router.get('/question-4', function(req, res, next) {
  const roles = [
    {
      Id: 1,
      Name: 'System Administrator',
      Parent: 0
    },
    {
      Id: 2,
      Name: 'Location Manager',
      Parent: 1
    },
    {
      Id: 3,
      Name: 'Supervisor',
      Parent: 2
    },
    {
      Id: 4,
      Name: 'Employee',
      Parent: 3
    }
  ];

  const users = [
    {
      Id: 1,
      Name: 'Adam Admin',
      Role: 1
    },
    {
      Id: 2,
      Name: 'Emily Employee',
      Role: 4
    },
    {
      Id: 3,
      Name: 'Sam Supervisor',
      Role: 3
    },
    {
      Id: 4,
      Name: 'Mary Manager',
      Role: 2
    },
    {
      Id: 5,
      Name: 'Charles Employee',
      Role: 4
    },
    {
      Id: 6,
      Name: 'Chadwick Employee',
      Role: 4
    },
    {
      Id: 7,
      Name: 'Tom Manager',
      Role: 2
    },
  ];
  const userId = 7;
  const lookingSubordinatesFor = users.find(u => u.Id === userId);
  const foundUsers = getSubordinates(userId, users, roles);
  res.send({ users: users, roles: roles, lookingForUserId: userId, 
    lookingSubordinatesFor: lookingSubordinatesFor, found: foundUsers });
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

function getSubordinates(userId, users, roles) {
  // Get the user from users array
  const user = users.find(u => u.Id === userId);
  if (user) {
    // Get the user's role
    const userRole = roles.find(role => role.Id === user.Role);
    if (userRole) {
      // Find the subordinate role for this user's role
      const subRole = roles.find(r => r.Parent === userRole.Id);
      if (subRole) {
        // Now that we have the subordinate role, lets get all the users who
        // have this role
        const subUsers = users.find(r => r.Role === subRole.Id);
        return subUsers;
      }
    }
  }
  return 'None found';
}

module.exports = router;
