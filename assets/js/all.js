"use strict";

function slidar() {
  var slider = document.querySelector('.dragList');
  var isDown = false;
  var startX;
  var scrollLeft;
  slider.addEventListener('mousedown', function (e) {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', function () {
    isDown = false;
  });
  slider.addEventListener('mouseup', function () {
    isDown = false;
  });
  slider.addEventListener('mousemove', function (e) {
    if (!isDown) return;
    e.preventDefault();
    var x = e.pageX - slider.offsetLeft;
    var walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
  });
}

AOS.init({
  duration: 600
});

if (document.title === "DOYOGA ReservationStep1") {
  // show details
  var showdetails = function showdetails() {
    courseLevel.classList.remove('d-none');
    reservationBtn.classList.remove('d-none');
  }; // change title
  // add border


  var currentCard = function currentCard(e) {
    e.target.parentElement.parentElement.classList.add("border-4");
  }; // remove other courses and style(md)


  var displayNoneOtherCourses = function displayNoneOtherCourses(e) {
    var target = e.target.parentElement.parentElement.parentNode;
    target.classList.remove('d-none', 'd-lg-block');
    var nextTarget = target.nextElementSibling;
    var previousTarget = target.previousElementSibling;

    while (nextTarget) {
      nextTarget.classList.add('d-none', 'd-lg-block');
      nextTarget.children[0].classList.remove('border-4');
      nextTarget = nextTarget.nextElementSibling;
    }

    while (previousTarget) {
      previousTarget.classList.add('d-none', 'd-lg-block');
      previousTarget.children[0].classList.remove('border-4');
      previousTarget = previousTarget.previousElementSibling;
    }
  }; // ***** show course level end*****
  // ***** select course level *****


  var removeActive = function removeActive() {
    courseItem.forEach(function (item) {
      item.classList.remove('active');
    });
  }; // ***** select course level end *****
  // ***** 預約監聽 localStorage *****


  // ***** show course level *****
  var course = document.querySelector('.course');
  var courseLevel = document.querySelector('.courseLevel');
  var reservationBtn = document.querySelector('.reservationBtn');
  var courseName = document.querySelector('.courseName');
  var reservationName = "";
  var reservationLevel = '基礎';
  course.addEventListener('click', function (e) {
    e.preventDefault();
    courseName.textContent = e.target.dataset.level;
    reservationName = e.target.dataset.level;
    displayNoneOtherCourses(e);
    showdetails();
    currentCard(e);
    slidar();
  });
  var courseItem = document.querySelectorAll(".courseLevelList-item");
  var courseTypeName = document.querySelector('.courseTypeName');
  courseTypeName.textContent = '基礎';
  courseItem.forEach(function (item) {
    item.addEventListener('click', function (e) {
      removeActive();
      e.currentTarget.classList.add('active');
      courseTypeName.textContent = e.currentTarget.dataset.course;
      reservationLevel = e.currentTarget.dataset.course;
    });
  });
  var goStep2Btn = document.querySelector('.goStep2Btn');
  goStep2Btn.addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.setItem('reservationCourse', "".concat(reservationName, "\u8AB2\u7A0B-").concat(reservationLevel));
    window.location.href = './reservationStep2.html';
  }); // ***** 預約監聽 localStorage end *****
}

if (document.title === "DOYOGA ReservationStep2" || document.title === "DOYOGA ReservationStep3") {
  var _courseName = document.querySelector('.courseName');

  _courseName.textContent = localStorage.getItem('reservationCourse') || '首次體驗課程-基礎';
}

if (document.title === "DOYOGA Index" || document.title === "DOYOGA Course" || document.title === "DOYOGA yogaSpace" || document.title === "DOYOGA Course Time") {
  slidar();
}

if (document.title === "DOYOGA Index") {
  var init = function init() {
    page.pages = feedback.length / 3;
    renderData(page.currentPage);
  };

  var renderData = function renderData(currentPage) {
    var data = [];

    for (var i = 0; i < 3; i++) {
      data.push(feedback[i + (currentPage - 1) * 3]);
    }

    var str = "";
    data.forEach(function (item) {
      str += "\n        <li class=\"d-flex d-md-none bg-white rounded align-items-center p-6 mb-3\">\n          <div class=\"flex-shrink-0\">\n            <img src=\"".concat(item.pic, "\" alt=\"user-img\">\n          </div>\n          <div class=\"flex-grow-1 ms-7\">\n            <h4 class=\"fs-6 mb-3\">").concat(item.user, " <class=\"fs-8 ms-3\">Oct 17 2020</span></h4>\n            <ul class=\"d-flex mb-3\">\n              <li class=\"me-1\"><i class=\"material-icons text-secondary\">star</i></li>\n              <li class=\"me-1\"><i class=\"material-icons text-secondary\">star</i></li>\n              <li class=\"me-1\"><i class=\"material-icons text-secondary\">star</i></li>\n              <li class=\"me-1\"><i class=\"material-icons text-secondary\">star</i></li>\n              <li><i class=\"material-icons text-secondary\">star</i></li>\n            </ul>\n            <p class=\"mb-0\">").concat(item.message, "</p>\n          </div>\n        </li>\n      ");
    });
    mobileMessage.innerHTML = str;
  };

  var disablePage = function disablePage() {
    if (page.currentPage === page.pages) {
      nextPageBtn.classList.add('isDisabled');
    }

    if (page.currentPage === 1) {
      prePageBtn.classList.add('isDisabled');
    }
  }; // 監聽下一頁


  // ***** swiper *****
  var slider2 = document.querySelector('.dragList2nd');
  var isDown = false;
  var startX;
  var scrollLeft;
  slider2.addEventListener('mousedown', function (e) {
    isDown = true;
    startX = e.pageX - slider2.offsetLeft;
    scrollLeft = slider2.scrollLeft;
  });
  slider2.addEventListener('mouseleave', function () {
    isDown = false;
  });
  slider2.addEventListener('mouseup', function () {
    isDown = false;
  });
  slider2.addEventListener('mousemove', function (e) {
    if (!isDown) return;
    e.preventDefault();
    var x = e.pageX - slider2.offsetLeft;
    var walk = (x - startX) * 3;
    slider2.scrollLeft = scrollLeft - walk;
  }); // ***** swiper end *****
  // ***** pagination *****

  var feedback = [{
    pic: './assets/images/user-1.png',
    user: 'Joanne',
    message: '服務很好、設備優良！'
  }, {
    pic: './assets/images/user-2.png',
    user: '穎旻',
    message: '上課後身體健康很多'
  }, {
    pic: './assets/images/user-3.png',
    user: '子琪',
    message: '上課很有趣！'
  }, {
    pic: './assets/images/user-4.png',
    user: '葉子',
    message: '老師的教學很專業'
  }, {
    pic: './assets/images/user-5.png',
    user: 'Ray',
    message: '很舒壓'
  }, {
    pic: './assets/images/user-6.png',
    user: '俊儀',
    message: '讚的！'
  }];
  var prePageBtn = document.querySelector('.prePageBtn');
  var nextPageBtn = document.querySelector('.nextPageBtn');
  var mobileMessage = document.querySelector('.mobileMessage');
  var page = {
    currentPage: 1,
    pages: 0
  };
  init();
  nextPageBtn.addEventListener('click', function () {
    if (page.currentPage < page.pages) {
      page.currentPage++;
      disablePage();
    }

    if (page.currentPage > 1) {
      prePageBtn.classList.remove('isDisabled');
    }

    renderData(page.currentPage);
  }); // 監聽前一頁

  prePageBtn.addEventListener('click', function () {
    if (page.currentPage > 1) {
      page.currentPage--;
      disablePage();
    }

    if (page.currentPage < page.pages) {
      nextPageBtn.classList.remove('isDisabled');
    }

    renderData(page.currentPage);
  }); // ***** pagination end *****
}

if (document.title === "DOYOGA ReservationStep2") {
  var element = document.querySelector('input[name="datepicker"]');
  var datepicker = new Datepicker(element, {
    autohide: true,
    format: 'yyyy/mm/dd',
    clearBtn: true
  });
}
//# sourceMappingURL=all.js.map
