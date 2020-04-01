let user = -1; // -1 Represents Unselected. 0 Represents Teachers. 1 Represents Student
const TEACHER = 0;
const STUDENT = 1;


userDropDownChange = (val) => {
  user = parseInt(val);
  $('#submit-row').removeClass('custom-hidden');
  if (user == TEACHER) {
    $('#usecase-row').removeClass('custom-hidden');
    $('#subject-row').addClass('custom-hidden');
    $('#grade-row').addClass('custom-hidden');
  } else if (user == STUDENT) {
    $('#usecase-row').addClass('custom-hidden');
    $('#subject-row').removeClass('custom-hidden');
    $('#grade-row').removeClass('custom-hidden');
  }
  $('#cost-row').removeClass('custom-hidden');
  $('#device-row').removeClass('custom-hidden');
}

openInNewTab = (link) => {
  window.open(link, '_blank');
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
    return "K";
  else if (grade == "14")
    return "Test";
  else if (grade == "15")
    return "Read/Write";
  else
    return grade;
}

convertCost = (cost) => {
  if (cost == "0")
    return "Free of cost";
  else
    return "Free till ${cost}";
}

convertDevice = (device) => {
  if (device == "1")
    return "Smartphone";
  else if (device == "2")
    return "Laptop";
  else
    return "Smartphone,Laptop";
}

uniqueList = (dataList) => {
  return dataList.filter((item, i, ar) => ar.indexOf(item) === i);
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
      title_to_link[content_title] = obj['content_link'];
      title_to_cost[content_title] = convertCost(obj['cost']);
      title_to_device[content_title] = convertDevice(obj['device']);
    }
    title_to_usecase[content_title].push(obj['use_case']);
  }
  for (content_title in title_to_usecase) {
    let content_usecase = uniqueList(title_to_usecase[content_title]);
    let element = `
      <div onclick="openInNewTab('${title_to_link[content_title]}');" class="row custom-data-box custom-margin custom-pointer">
        <div class="row custom-forced-width"><div class="column"><h2>${content_title}</h2></div></div>
        <div class="row custom-forced-width">${title_to_description[content_title]}</div>
        <div class="row custom-forced-width">
          <div class="ui stackable four column grid">
            <div class="column">${title_to_usecase[content_title]}</div>
            <div class="column">${title_to_cost[content_title]}</div>
            <div class="column">${title_to_device[content_title]}</div>
            <div class="column"></div>
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
      title_to_link[content_title] = obj['content_link'];
      title_to_cost[content_title] = convertCost(obj['cost']);
      title_to_device[content_title] = convertDevice(obj['device']);
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

    let element = `
    <div onclick="openInNewTab('${title_to_link[content_title]}');" class="row custom-data-box custom-margin custom-pointer">
      <div class="row custom-forced-width"><div class="column"><h2>${content_title}</h2></div></div>
      <div class="row custom-forced-width">${title_to_description[content_title]}</div>
      <div class="row custom-forced-width">
        <div class="ui stackable four column grid">
          <div class="column">Grade ${title_to_grade[content_title]}</div>
          <div class="column">${title_to_subject[content_title]}</div>
          <div class="column">${title_to_cost[content_title]}</div>
          <div class="column"> ${title_to_device[content_title]}</div>
        </div>
      </div>
    </div>
    `
    $('#data-grid').append(element);
  }
}

onSearch = () => {
  let cost = $('#cost-dropdown').dropdown('get value') || 2;
  let device = $('#cost-dropdown').dropdown('get value') || 3;
  if (user == TEACHER) {
    $.ajax({
      url: 'http://localhost:8000/searchTeacherMaterial',
      data: {
        use_case: $('#usecase-dropdown').dropdown('get values'),
        cost: cost,
        device: device
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
        grade: grade,
        cost: cost,
        device: device
      },
      success: populateData,
    });
  }
}

$("#search-button").click(onSearch);


$('#user-dropdown').dropdown({
  onChange: userDropDownChange
});
$('#grade-dropdown').dropdown();
$('#subject-dropdown').dropdown();
$('#usecase-dropdown').dropdown();
$('#cost-dropdown').dropdown();
$('#device-dropdown').dropdown();
