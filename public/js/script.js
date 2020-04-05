let user = -1; // -1 Represents Unselected. 0 Represents Teachers. 1 Represents Student
const TEACHER = 0;
const STUDENT = 1;

showFilters = (val) => {
  $('#homepage').addClass('custom-hidden');
  $('#main').removeClass('custom-hidden');
  user = parseInt(val);
  $('#user-dropdown').dropdown('set selected', [val]);
}

  userDropDownChange = (val) => {
  user = parseInt(val);
  $('#submit-row').removeClass('custom-hidden');
  if (user == TEACHER) {
    $('#usecase-row').removeClass('custom-hidden');
    $('#subject-row').addClass('custom-hidden');
    $('#grade-row').addClass('custom-hidden');
  } else if (user == STUDENT) {
    $('#usecase-row').addClass('custom-hidden');
    $('#grade-row').removeClass('custom-hidden');
  }
}

   gradeDropDownChange = (val) => {
     grade = parseInt(val);
     if (grade != 14 && grade != 15){
        $('#subject-row').removeClass('custom-hidden');
     } else {
      $('#subject-row').addClass('custom-hidden');
     }
   }

openInNewTab = (link) => {
  window.open(link, '_blank');
}

sameWindowLink = (link) => {
  window.location = link;
}

populateData = (data, status) => {
  if (status !== "success")
    return;

  $('#data-grid').empty();
  if (user == TEACHER)
    populateTeacherData(data);
  else if (user == STUDENT)
    populateStudentData(data);
}

convertGrade = (grade) => {
  if (grade == "0")
    return "KG";
  else if (grade == "14")
    return "JEE/NEET";
  else if (grade == "15")
    return "Read/Write";
  else
    return `Grade ${grade}`;
}

uniqueList = (dataList) => {
  return dataList.filter((item, i, ar) => ar.indexOf(item) === i);
}

// parseLink takes a comma separated value and returns [webLink, mobileLink] array
parseLink = (linkString) => {
  let linkArray = linkString.split(",");
  if (linkArray.length == 1) {
    linkArray.push("");
  }
  let webLink = (linkArray[0].indexOf("play.google.com") == -1) ? linkArray[0]: linkArray[1];
  let mobileLink = (linkArray[0] == webLink) ? linkArray[1]: linkArray[0];
  return [webLink, mobileLink];
}

convertDevice = (device) => {
  if (device == "1")
    return "Smartphone";
  else if (device == "2")
    return "Laptop";
  else
    return "Smartphone, Laptop";
}

getLinkToUse = (device, availableLinks) => {
  if (device == "1")
    return availableLinks[1];
  else if (device == "2")
    return availableLinks[0];
  else {
    if (screen.width < 600)
      return availableLinks[1];
    return availableLinks[0];
  }
}

convertUseCase = (useCase) => {
  if (useCase == "1")   return "Tools for Teaching";
  if (useCase == "2")   return "Professional Development";
  if (useCase == "3")   return "Tools for Assessment";
  if (useCase == "4")   return "Special Needs";
}

populateTeacherData = (data) => {
  let title_to_usecase = {};
  let title_to_description = {};
  let title_to_link = {};
  let title_to_cost = {};
  let title_to_device = {};

  for (obj of data) {
    let content_title = obj['content_title'];

    if (!(content_title in title_to_usecase)) {
      title_to_usecase[content_title] = [];
      title_to_description[content_title] = obj['content_description'];
      title_to_link[content_title] = parseLink(obj['content_link']);
      title_to_cost[content_title] = obj['cost'];
      title_to_device[content_title] = obj['device'];
    }
    title_to_usecase[content_title].push(obj['use_case']);
  }
  for (content_title in title_to_usecase) {
    let content_usecase = uniqueList(title_to_usecase[content_title]);
    let linkToUse = getLinkToUse(title_to_device[content_title], title_to_link[content_title]);

    let element = `
      <div onclick="openInNewTab('${linkToUse}');" class="row custom-data-box custom-margin custom-pointer custom-font-family">
        <div class="row custom-forced-width"><div class="column"><h2>${content_title}</h2></div></div>
        <div class="row custom-forced-width custom-grey-font">${title_to_description[content_title]}</div>
        <div class="ui divider"></div>
        <div class="row custom-forced-width custom-grey-font">
          <div class="ui stackable three column grid">
            <div class="column custom-grey-font left aligned"><div class="ui avatar image custom-logo"><img class="custom-icon-image" src="./static/book-icon.svg"></div>${content_usecase.map(convertUseCase).join(", ")}</div>
            <div class="column custom-grey-font left aligned"><div class="ui avatar image custom-logo"><img class="custom-icon-image" src="./static/price-icon.svg"></div>${title_to_cost[content_title]}</div>
            <div class="column custom-grey-font left aligned"><div class="ui avatar image custom-logo"><img class="custom-icon-image" src="./static/device-icon.svg"></div>${convertDevice(title_to_device[content_title])}</div>
          </div>
        </div>
      </div>`;

    $('#data-grid').append(element);
  }
}

populateStudentData = (data) => {
  let title_to_subject = {};
  let title_to_grade = {};
  let title_to_description = {};
  let title_to_link = {};
  let title_to_cost = {};
  let title_to_device = {};

  for (obj of data) {
    let content_title = obj['content_title'];

    if (!(content_title in title_to_subject)) {
      title_to_subject[content_title] = [];
      title_to_description[content_title] = obj['content_description'];
      title_to_link[content_title] = parseLink(obj['content_link']);
      title_to_cost[content_title] = obj['cost'];
      title_to_device[content_title] = obj['device'];
    }
    title_to_subject[content_title].push(obj['subject']);

    if (!(content_title in title_to_grade)) {
      title_to_grade[content_title] = [];
    }
    let grade = convertGrade(obj['start_grade']);
    if (obj['start_grade'] != obj['end_grade'])
      grade = `${convertGrade(obj['start_grade'])} - ${convertGrade(obj['end_grade'])}`;
    title_to_grade[content_title].push(grade)
  }

  for (content_title in title_to_subject) {
    let content_grade = uniqueList(title_to_grade[content_title]);
    let content_subject = uniqueList(title_to_subject[content_title]);
    let linkToUse = getLinkToUse(title_to_device[content_title], title_to_link[content_title]);

    let element = `
    <div onclick="openInNewTab('${linkToUse}');" class="row custom-data-box custom-margin custom-pointer custom-font-family">
      <div class="row custom-forced-width"><div class="column"><h2>${content_title}</h2></div></div>
      <div class="row custom-forced-width"><div class="column"><h5>${content_grade.join(", ")}</h5></div></div>
      <div class="row custom-forced-width custom-grey-font">${title_to_description[content_title]}</div>
      <div class="ui divider"></div>
      <div class="row custom-forced-width">
        <div class="ui stackable three column grid">
          <div class="column custom-grey-font left aligned"><div class="ui avatar image custom-logo"><img class="custom-icon-image" src="./static/book-icon.svg"></div>${content_subject.join(", ")}</div>
          <div class="column custom-grey-font left aligned"><div class="ui avatar image custom-logo"><img class="custom-icon-image" src="./static/price-icon.svg"></div>${title_to_cost[content_title]}</div>
          <div class="column custom-grey-font left aligned"><div class="ui avatar image custom-logo"><img class="custom-icon-image" src="./static/device-icon.svg"></div>${convertDevice(title_to_device[content_title])}</div>
        </div>
      </div>
    </div>
    `
    $('#data-grid').append(element);
  }
}

onSearch = () => {
  if (user == TEACHER) {
    $.ajax({
      url: 'http://localhost:8000/searchTeacherMaterial',
      data: {
        use_case: $('#usecase-dropdown').dropdown('get values')
      },
      success: populateData,
    });
  } else if (user == STUDENT) {
    let grade = $('#grade-dropdown').dropdown('get value') || 13;
    grade = parseInt(grade);
    $.ajax({
      url: 'http://localhost:8000/searchStudentMaterial',
      data: {
        subject: $('#subject-dropdown').dropdown('get values'),
        grade: grade
      },
      success: populateData,
    });
  }
}

$("#search-button").click(onSearch);


$('#user-dropdown').dropdown({
   onChange: userDropDownChange
});
$('#grade-dropdown').dropdown({
  "clearable": true,
  onChange: gradeDropDownChange
});
$('#subject-dropdown').dropdown({
  "clearable": true
});
$('#usecase-dropdown').dropdown({
  "clearable": true
});
