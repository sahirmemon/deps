$(function() {
  
  // Load data from API
  function loadQ2Data() {
    $.get( "/question-2-data", function( data ) {
      displayData(data);
    });
  }

  function displayData(data) {
    if (data) {
      const users = data.users;
      const roles = data.roles;
      const locations = data.locations;
      let usersHtml = '';
      for (let i = users.length - 1; i >= 0; i--) {
        const user = users[i];
        const userRole = roles.find(role => role.Id === user.Role);
        const userLocation = locations.find(location => location.Id === user.Location);
        console.log(userRole);
        console.log(userLocation);
        usersHtml += `
        <tr>
            <td>
              <div class="bio-container">
                <div class="m-team-photo-container">
                    <img alt="${user.DisplayName}" src="${user.PhotoUrl}" class="m-team-photo">
                </div>
                <div class="m-team-name-container">
                    <div class="m-team-name">${user.DisplayName}</div>
                    <p class="gray text--small margin-none">${userRole.Name}</p>
                </div>
              </div>
            </td>
            <td class="text--small tdCompany" style="display: table-cell;">${userLocation.Name}</td>
            <td width="155">
              <div class="btn-group u-pullRight">
                  <a href="#team/${user.Id}" class="btn btn-default btn-sm view-btn">View</a>
              </div>
            </td>
        </tr>
        `;
      }
      $('#pnlTeamTable > tbody:last-child').html(usersHtml);
    }
  }

  loadQ2Data();

  // Refresh data every minute
  setInterval(function() {
    loadQ2Data();
  }, 60 * 1000);
});