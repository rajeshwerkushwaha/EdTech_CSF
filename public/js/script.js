let user = -1; // -1 Represents Unselected. 0 Represents Teachers. 1 Represents Student
const TEACHER = 0;
const STUDENT = 1;
// const API_LINK = 'https://indiaedtech.org/'
const API_LINK = 'http://167.71.226.102/'

let main_buttons_en = `<div class="custom-center-align custom-grey-font row center aligned custom-text custom-font-family">
  This website categorizes free EdTech resources available for students and teachers so learning can effectively take place at home.
</div>
<div class="row ui one column grid mainbuttons center aligned">
  <div class="column">
    <button onClick='showFilters(1);' class="huge ui button access-resourse-button">Access resources for Students</button>
  </div>
  <div class="column">
    <button onClick='showFilters(0);' class="huge ui button access-resourse-button">Access resources for Teachers</button>
  </div>
</div>`;
let main_buttons_hi = `<div class="custom-center-align custom-grey-font row center aligned custom-text custom-font-family">
  This website categorizes free EdTech resources available for students and teachers so learning can effectively take place at home.
</div>
<div class="row ui one column grid mainbuttons center aligned">
  <div class="column">
    <button onClick='showFilters(1);' class="huge ui button access-resourse-button">छात्रों के लिए संसाधन प्राप्त कर</button>
  </div>
  <div class="column">
    <button onClick='showFilters(0);' class="huge ui button access-resourse-button">शिक्षकों के लिए संसाधन प्राप्त करें</button>
  </div>
</div>`;
let mobile_filter_en = `<div class="row">
  <!-- FILTER COLUMN -->
  <div id="filter-column" class="four wide column custom-border-radius custom-fixed-size">
    <div class="center aligned row ">
      <h2 class="custom-grey-font">Filter</h2>
    </div>

    <div class="custom-margin center aligned two column row">
      <div class="right aligned column custom-font-size custom-grey-font">I want content for</div>
      <div class="left aligned column">
        <select id="user-dropdown" class="ui fluid dropdown">
          <option value="">Select</option>
          <option value=1>Student</option>
          <option value=0>Teacher</option>
        </select>
      </div>
    </div>

    <div id="grade-row" class="center aligned two column row custom-margin ">
      <div class="right aligned column custom-grey-font">Who are currently studying in </div>
      <div class="left aligned column">
        <select id="grade-dropdown" name="grade-select" class="ui fluid search selection dropdown">
          <option value="">Select</option>
          <option value="0">KG</option>
          <option value="1">Grade 1</option>
          <option value="2">Grade 2</option>
          <option value="3">Grade 3</option>
          <option value="4">Grade 4</option>
          <option value="5">Grade 5</option>
          <option value="6">Grade 6</option>
          <option value="7">Grade 7</option>
          <option value="8">Grade 8</option>
          <option value="9">Grade 9</option>
          <option value="10">Grade 10</option>
          <option value="11">Grade 11</option>
          <option value="12">Grade 12</option>
          <option value="14">JEE/NEET</option>
          <option value="15">Speaking/Reading</option>
        </select>
      </div>
    </div>

    <div id="subject-row" class="center aligned two column row custom-margin custom-hidden">
      <div class="right aligned column custom-grey-font">For the subjects</div>
      <div class="left aligned column">
        <select id="subject-dropdown" name="subject-select" multiple="" class="ui fluid search selection dropdown">
          <option value="">Select</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
        </select>
      </div>
    </div>

    <div id="usecase-row" class="center aligned two column row custom-margin custom-hidden">
      <div class="right aligned column custom-grey-font">For what use case do you want resources</div>
      <div class="left aligned column">
        <select id="usecase-dropdown" multiple="" name="usecase-select" class="ui fluid search selection dropdown">
          <option value="">Select</option>
          <option value="1">Tools for Teaching</option>
          <option value="2">Professional Development</option>
          <option value="3">Tools for Assessment</option>
        </select>
      </div>
    </div>

    <div id="medium-row" class="center aligned two column row custom-margin">
      <div class="right aligned column custom-grey-font">Required medium of instruction</div>
      <div class="left aligned column">
        <select id="medium-dropdown" multiple="" name="medium-select" class="ui fluid search selection dropdown">
          <option value="">Select</option>
          <option value="Hindi">Hindi</option>
          <option value="English">English</option>
          <option value="Bengali">Bengali</option>
          <option value="Marathi">Marathi</option>
          <option value="Telugu">Telugu</option>
          <option value="Tamil">Tamil</option>
          <option value="Gujarati">Gujarati</option>
          <option value="Urdu">Urdu</option>
          <option value="Kannada">Kannada</option>
          <option value="Odia">Odia</option>
          <option value="Malayalam">Malayalam</option>
          <option value="Punjabi">Punjabi</option>
        </select>
      </div>
    </div>

    <div id="submit-row" class="row custom-margin custom-hidden">
      <div class="center aligned column">
        <button id="search-button" class="ui fluid primary button">
          Search Content
        </button>
      </div>
    </div>
  </div>
  <!-- FILTER COLUMN end-->

  <!-- CONTENT COLUMN -->
  <div id="data-column" class="twelve wide column">
    <div id="data-grid" class="ui cards centered"></div>
    <div class="youtube-divider">
      <div style="padding-bottom: 5px;"><i class="youtube icon"></i>Youtube Channels</div>
    </div>
     <div class="no-data"><p>Sorry, no resources found for the selected filter. Please change the filter and search again!</p></div>
    <div id="data-grid-youtube" class="ui cards centered"></div>
  </div>
  <!-- CONTENT COLUMN end-->
</div>`;
let mobile_filter_hi = `<div class="row">
  <!-- FILTER COLUMN -->
  <div id="filter-column" class="custom-border-radius custom-fixed-size">
    <div class="center aligned row ">
      <h2 class="custom-grey-font">फ़िल्टर</h2>
    </div>

    <div class="custom-margin center aligned two column row">
      <div class="right aligned column custom-font-size custom-grey-font">मुझे इसके लिए सामग्री चाहिए</div>
      <div class="left aligned column">
        <select id="user-dropdown" class="ui fluid dropdown">
          <option value="">चुनते हैं</option>
          <option value=1>छात्र</option>
          <option value=0>अध्यापक</option>
        </select>
      </div>
    </div>

    <div id="grade-row" class="center aligned two column row custom-margin ">
      <div class="right aligned column custom-grey-font">जो वर्तमान में पढ़ाई कर रहे हैं</div>
      <div class="left aligned column">
        <select id="grade-dropdown" name="grade-select" class="ui fluid search selection dropdown">
          <option value="">चुनते हैं</option>
          <option value="0">KG</option>
          <option value="1">Grade 1</option>
          <option value="2">Grade 2</option>
          <option value="3">Grade 3</option>
          <option value="4">Grade 4</option>
          <option value="5">Grade 5</option>
          <option value="6">Grade 6</option>
          <option value="7">Grade 7</option>
          <option value="8">Grade 8</option>
          <option value="9">Grade 9</option>
          <option value="10">Grade 10</option>
          <option value="11">Grade 11</option>
          <option value="12">Grade 12</option>
          <option value="14">JEE/NEET</option>
          <option value="15">Speaking/Reading</option>
        </select>
      </div>
    </div>

    <div id="subject-row" class="center aligned two column row custom-margin custom-hidden">
      <div class="right aligned column custom-grey-font">विषयों के लिए</div>
      <div class="left aligned column">
        <select id="subject-dropdown" name="subject-select" multiple="" class="ui fluid search selection dropdown">
          <option value="">चुनते हैं</option>
          <option value="Math">गणित</option>
          <option value="Science">विज्ञान</option>
          <option value="English">अंग्रेज़ी</option>
          <option value="Hindi">हिन्दी</option>
        </select>
      </div>
    </div>

    <div id="usecase-row" class="center aligned two column row custom-margin custom-hidden">
      <div class="right aligned column custom-grey-font">किस मामले के लिए आप संसाधन चाहते हैं</div>
      <div class="left aligned column">
        <select id="usecase-dropdown" multiple="" name="usecase-select" class="ui fluid search selection dropdown">
          <option value="">चुनते हैं</option>
          <option value="1">शिक्षण के लिए उपकरण</option>
          <option value="2">व्यावसायिक विकास</option>
          <option value="3">मूल्यांकन के लिए उपकरण</option>
        </select>
      </div>
    </div>

    <div id="medium-row" class="center aligned two column row custom-margin">
      <div class="right aligned column custom-grey-font">शिक्षा का आवश्यक माध्यम</div>
      <div class="left aligned column">
        <select id="medium-dropdown" multiple="" name="medium-select" class="ui fluid search selection dropdown">
          <option value="">चुनते हैं</option>
          <option value="Hindi">हिन्दी</option>
          <option value="English">अंग्रेज़ी</option>
          <option value="Bengali">बंगाली</option>
          <option value="Marathi">मराठी</option>
          <option value="Telugu">तेलुगू</option>
          <option value="Tamil">तामिल</option>
          <option value="Gujarati">गुजराती</option>
          <option value="Urdu">उर्दू</option>
          <option value="Kannada">कन्नड़</option>
          <option value="Odia">उड़िया</option>
          <option value="Malayalam">मलयालम</option>
          <option value="Punjabi">पंजाबी</option>
        </select>
      </div>
      <div id="submit-row" class="row custom-margin custom-hidden">
        <div class="center aligned column">
          <button id="search-button" class="ui fluid primary button">
            सामग्री खोजें
          </button>
        </div>
      </div>
   </div>
  </div>
  <!-- FILTER COLUMN end-->

  <!-- CONTENT COLUMN -->
   <div id="data-column" class="twelve wide column">
     <div id="data-grid" class="ui cards centered"></div>
     <div class="youtube-divider">
       <div style="padding-bottom: 5px;"><i class="youtube icon"></i>Youtube Channels</div>
     </div>
     <div class="no-data"><p>क्षमा करें, चयनित फ़िल्टर के लिए कोई संसाधन नहीं मिला। कृपया फ़िल्टर बदलें और फिर से खोजें!</p></div>
     <div id="data-grid-youtube" class="ui cards centered"></div>
   </div>
   <!-- CONTENT COLUMN end-->
</div>`;

// adding homepage & main section according to mobile view
if (screen.width<600){
  if (PAGE=='index'){
    $('#homepage').empty();
    $('#main').empty();
    if (LANGUAGE=='en'){
      $('#homepage').append(main_buttons_en);
      $('#main').append(mobile_filter_en);
    }else if (LANGUAGE=='hi'){
      $('#homepage').append(main_buttons_hi);
      $('#main').append(mobile_filter_hi);
    }
  }
}

// setup html view and filter based on use click on resources button
showFilters = (val) => {
  $('#homepage').addClass('custom-hidden');
  $('#main').removeClass('custom-hidden');
  $('#submit-row').removeClass('custom-hidden');
  user = parseInt(val);
  $('#user-dropdown').dropdown('set selected', [val]);
}

// setup filter based on user selection
userDropDownChange = (val) => {
  user = parseInt(val);
  if (user == TEACHER) {
    $('#usecase-row').removeClass('custom-hidden');
    $('#subject-row').addClass('custom-hidden');
    $('#grade-row').addClass('custom-hidden');
  } else if (user == STUDENT) {
    $('#usecase-row').addClass('custom-hidden');
    $('#grade-row').removeClass('custom-hidden');
  }
}

// setup filter view based on grade selection
gradeDropDownChange = (val) => {
  grade = parseInt(val);
  if (grade != 14 && grade != 15){
    $('#subject-row').removeClass('custom-hidden');
  } else {
  $('#subject-row').addClass('custom-hidden');
  $('#subject-dropdown').dropdown('clear');
  }
}

// method to open seleted link to new tab
openInNewTab = (link) => {
  if (event.target.classList.contains('yt-link')){
    return;
  }
  window.open(link, '_blank');
}

// method to open selected link to same tab
sameWindowLink = (link) => {
  window.location = link;
}

// setup filter based on language selection
languageDropDownChange = (val) => {
  let oldLang = LANGUAGE;
  LANGUAGE = val;
  let href = window.location.href;
  let newHref = href.replace(oldLang,LANGUAGE);
  sameWindowLink(newHref);
}

// populate api data
populateData = (data, status) => {
  if (status !== "success")
    return;
  $('#data-grid').empty();
  $('#data-grid-youtube').empty();
  $('.youtube-divider').hide();
  if (data.length==0)
    $('.no-data').show();
  else
    $('.no-data').hide();

  if (user == TEACHER)
    populateTeacherData(data);
  else if (user == STUDENT)
    populateStudentData(data);
}

// convert value of selected grade in filter
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

// find unique list from the data list
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

// get device values based on integer value
convertDevice = (device) => {
  if (device == "1")
    return SMARTPHONE;
  else if (device == "2")
    return LAPTOP;
  else
    return SMARTPHONE +", " + LAPTOP;
}

// get links to use based on device value
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

// get usercase value based on integer value
convertUseCase = (useCase) => {
  if (useCase == "1")   return TEACHING;
  if (useCase == "2")   return DEVELOPMENT;
  if (useCase == "3")   return ASSESSMENT;
  if (useCase == "4")   return SPECIAL;
}

// populate Teacher data in cards
populateTeacherData = (data) => {
  let title_to_usecase = {};
  let title_to_description = {};
  let title_to_link = {};
  let title_to_cost = {};
  let title_to_device = {};
  let title_to_language = {};

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

    if (!(content_title in title_to_language)) {
      title_to_language[content_title] = [];
    }
    title_to_language[content_title].push(obj['medium']);
  }
  for (content_title in title_to_usecase) {
    let content_usecase = uniqueList(title_to_usecase[content_title]);
    let content_language = uniqueList(title_to_language[content_title]);
    let linkToUse = getLinkToUse(title_to_device[content_title], title_to_link[content_title]);

    var flag = linkToUse.includes("youtube");

    if (flag==true){
      var links = linkToUse.split(";");
      let tempelement = ``;
      for (i in links){
        var d1 = links[i].split("==");
        d1[0]=d1[0].split('%2C').join(',');
      	let temp=``;
        if (d1[1]==undefined){
          if(links.length==1){
              temp = `<tr><td><a href="${d1[0]}" target="_blank"><i class="youtube icon"></i>${content_title}</a></td></tr>`;
          }else{
      	     temp = `<tr><td><a href="${d1[0]}" target="_blank"><i class="youtube icon"></i>${d1[0]}</a></td></tr>`;
          }
        }else{
          if(links.length==1){
              temp = `<tr><td><a href="${d1[1]}" target="_blank"><i class="youtube icon"></i>${content_title}</a></td></tr>`;
          }else{
      	     temp = `<tr><td><a href="${d1[1]}" target="_blank"><i class="youtube icon"></i>${d1[0]}</a></td></tr>`;
          }
        }
        tempelement = tempelement + temp ;
      }

      let element = `
        <div onclick="openInNewTab('${linkToUse}');" class="card">
          <div class="header"><h2>${content_title}</h2></div>
          <div class="row custom-forced-width">
              <div class="row custom-grey-font left aligned"><div class="ui image custom-logo"><i class="book icon"></i></div>${content_usecase.map(convertUseCase).join(", ")}</div>
              <div class="row custom-grey-font left aligned"><div class="ui image custom-logo"><i class="rupee sign icon"></i></div>${title_to_cost[content_title]}</div>
              <div class="row custom-grey-font left aligned"><div class="ui image custom-logo"><i class="mobile alternate icon"></i></div>${convertDevice(title_to_device[content_title])}</div>
              <div class="row custom-grey-font left aligned"><div class="ui image custom-logo"><i class="language icon"></i></div>${content_language.join(", ")}</div>
          </div>
          <div class="ui divider"></div>
          <div class="description">${title_to_description[content_title]}</div>
          <div class="extra content">
            <table class="ui celled table">
              <tbody>
                ${tempelement}
              </tbody>
            </table>
          </div>
        </div>`;

        $('.youtube-divider').show();
        $('#data-grid-youtube').append(element);
    }else{
      let element = `
        <div onclick="openInNewTab('${linkToUse}');" class="card">
          <div class="header"><h2>${content_title}</h2></div>
          <div class="row custom-forced-width">
              <div class="row custom-grey-font left aligned"><div class="ui image custom-logo"><i class="book icon"></i></div>${content_usecase.map(convertUseCase).join(", ")}</div>
              <div class="row custom-grey-font left aligned"><div class="ui image custom-logo"><i class="rupee sign icon"></i></div>${title_to_cost[content_title]}</div>
              <div class="row custom-grey-font left aligned"><div class="ui image custom-logo"><i class="mobile alternate icon"></i></div>${convertDevice(title_to_device[content_title])}</div>
              <div class="row custom-grey-font left aligned"><div class="ui image custom-logo"><i class="language icon"></i></div>${content_language.join(", ")}</div>
          </div>
          <div class="ui divider"></div>
          <div class="description">${title_to_description[content_title]}</div>
        </div>`;

      $('#data-grid').append(element);
    }
  }
  // make filter sticky for web
  $('.ui.sticky')
    .sticky({
      context: '#example1'
    })
  ;
}

// populate Student data in cards
populateStudentData = (data) => {
  let title_to_subject = {};
  let title_to_grade = {};
  let title_to_description = {};
  let title_to_link = {};
  let title_to_cost = {};
  let title_to_device = {};
  let title_to_language = {};

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

    if (!(content_title in title_to_language)) {
      title_to_language[content_title] = [];
    }
    title_to_language[content_title].push(obj['medium']);

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
    let content_language = uniqueList(title_to_language[content_title]);
    let linkToUse = getLinkToUse(title_to_device[content_title], title_to_link[content_title]);
    var flag = linkToUse.includes("youtube");
    var first_link = '';

    if (flag==true){
      var links = linkToUse.split(";");
      let tempelement = ``;
      for (i in links){
        var d1 = links[i].split("==");
        d1[0]=d1[0].split('%2C').join(',');

        //get the first link
        if (i==0) {
          if(d1[1]==undefined){
            first_link = d1[0]
          }else {
            first_link = d1[1]
          }
        }

      	let temp=``;
        if (d1[1]==undefined){
          if(links.length==1){
              temp = `<tr style="padding:0px;margin:0px;"><td style="padding:0px !important;margin:0px;"><a href="${d1[0]}" class="yt-link" target="_blank"><i class="youtube icon"></i>${content_title}</a></td></tr>`;
          }else{
      	     temp = `<tr style="padding:0px;margin:0px;"><td style="padding:0px !important;margin:0px;"><a href="${d1[0]}" class="yt-link" target="_blank"><i class="youtube icon"></i>${d1[0]}</a></td></tr>`;
          }
        }else{
          if(links.length==1){
              temp = `<tr style="padding:0px;margin:0px;"><td style="padding:0px !important;margin:0px;"><a href="${d1[1]}" class="yt-link" target="_blank"><i class="youtube icon"></i>${content_title}</a></td></tr>`;
          }else{
      	     temp = `<tr style="padding:0px;margin:0px;"><td style="padding:0px !important;margin:0px;"><a href="${d1[1]}" class="yt-link" target="_blank"><i class="youtube icon"></i>${d1[0]}</a></td></tr>`;
          }
        }
        tempelement = tempelement + temp ;
      }

      let element = `
        <div onclick="openInNewTab('${first_link}');" class="ui link card ga-card-click">
          <div class="header"><h2>${content_title}</h2></div>
          <div class="meta"><h5>${content_grade.join(", ")}</h5></div>
          <div class="row custom-forced-width">
              <div class="row custom-grey-font left aligned"><div class="ui image custom-logo"><i class="book icon"></i></div>Subject: ${content_subject.join(", ")}</div>
              <div class="row custom-grey-font left aligned"><div class="ui image custom-logo"><i class="rupee sign icon"></i></div>Price: ${title_to_cost[content_title]}</div>
              <div class="row custom-grey-font left aligned"><div class="ui image custom-logo"><i class="mobile alternate icon"></i></div>Device: ${convertDevice(title_to_device[content_title])}</div>
              <div class="row custom-grey-font left aligned"><div class="ui image custom-logo"><i class="language icon"></i></div>Language: ${content_language.join(", ")}</div>
          </div>
          <div class="ui divider"></div>
          <div class="description">${title_to_description[content_title]}</div>
          <div class="extra content">
            <table class="ui celled table">
              <tbody>
                ${tempelement}
              </tbody>
            </table>
          </div>
        </div>`;
        $('.youtube-divider').show();
        $('#data-grid-youtube').append(element);
    }else{
      let element = `
        <div onclick="openInNewTab('${linkToUse}');" class="ui link card">
          <div class="header"><h2>${content_title}</h2></div>
          <div class="meta"><h5>${content_grade.join(", ")}</h5></div>
          <div class="row custom-forced-width">
            <div class="">
              <div class="row custom-grey-font left aligned"><div class="ui image custom-logo"><i class="book icon"></i></div>Subject: ${content_subject.join(", ")}</div>
              <div class="row custom-grey-font left aligned"><div class="ui image custom-logo"><i class="rupee sign icon"></i></div>Price: ${title_to_cost[content_title]}</div>
              <div class="row custom-grey-font left aligned"><div class="ui image custom-logo"><i class="mobile alternate icon"></i></div>Device: ${convertDevice(title_to_device[content_title])}</div>
              <div class="row custom-grey-font left aligned"><div class="ui image custom-logo"><i class="language icon"></i></div>Language: ${content_language.join(", ")}</div>
          </div>
          </div>
          <div class="ui divider"></div>
          <div class="description">${title_to_description[content_title]}</div>
        </div>`;
        $('#data-grid').append(element);
    }
  }
  // make filter sticky for web
  $('.ui.sticky')
    .sticky({
      context: '#example1'
    });
}

onSearch = () => {
  if (user == TEACHER) {
    $.ajax({
      url: API_LINK+'api/searchTeacherMaterial',
      data: {
        use_case: $('#usecase-dropdown').dropdown('get values'),
        language: LANGUAGE,
        medium: $('#medium-dropdown').dropdown('get values')
      },
      success: populateData,
    });
  } else if (user == STUDENT) {
    let grade = $('#grade-dropdown').dropdown('get value') || 13;
    grade = parseInt(grade);
    $.ajax({
      url: API_LINK+'api/searchStudentMaterial',
      data: {
        subject: $('#subject-dropdown').dropdown('get values'),
        grade: grade,
        language: LANGUAGE,
        medium: $('#medium-dropdown').dropdown('get values')
      },
      success: populateData,
    });
  }
}

$("#search-button").click(onSearch);

$('#language-dropdown').dropdown({
   onChange: languageDropDownChange
});

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
$('#medium-dropdown').dropdown({
  "clearable": true
});
