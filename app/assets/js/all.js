function slidar(){
  const slider = document.querySelector('.dragList');
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
  });
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
  });
}

AOS.init({
  duration: 600
});

if (document.title ==="DOYOGA ReservationStep1"){
  // ***** show course level *****
  const course = document.querySelector('.course');
  const courseLevel = document.querySelector('.courseLevel');
  const reservationBtn = document.querySelector('.reservationBtn');
  const courseName = document.querySelector('.courseName');
  let reservationName = "";
  let reservationLevel = '基礎';
  
  course.addEventListener('click', function (e) {
    e.preventDefault();
    courseName.textContent = e.target.dataset.level;
    reservationName = e.target.dataset.level;
    displayNoneOtherCourses(e);
    showdetails();
    currentCard(e);
    slidar();
  })

  // show details
  function showdetails(){
    courseLevel.classList.remove('d-none');
    reservationBtn.classList.remove('d-none');
  }
  // change title
  // add border
  function currentCard(e){
    e.target.parentElement.parentElement.classList.add("border-4");
  }
  // remove other courses and style(md)
  function displayNoneOtherCourses(e){
    const target = e.target.parentElement.parentElement.parentNode;
    target.classList.remove('d-none', 'd-lg-block');
    let nextTarget = target.nextElementSibling;
    let previousTarget = target.previousElementSibling;

    while(nextTarget){
      nextTarget.classList.add('d-none', 'd-lg-block');
      nextTarget.children[0].classList.remove('border-4');
      nextTarget = nextTarget.nextElementSibling;
    }
    while (previousTarget) {
      previousTarget.classList.add('d-none', 'd-lg-block');
      previousTarget.children[0].classList.remove('border-4');
      previousTarget = previousTarget.previousElementSibling;
    }
  }
  // ***** show course level end*****

  // ***** select course level *****
  const courseItem = document.querySelectorAll(".courseLevelList-item");
  const courseTypeName = document.querySelector('.courseTypeName');
  courseTypeName.textContent = '基礎';

  courseItem.forEach((item) => {
    item.addEventListener('click', function(e){
      removeActive();
      e.currentTarget.classList.add('active');
      courseTypeName.textContent = e.currentTarget.dataset.course;
      reservationLevel = e.currentTarget.dataset.course;
    })
  })

  function removeActive(){
    courseItem.forEach((item) => {
      item.classList.remove('active');
    })
  }
  // ***** select course level end *****

  // ***** 預約監聽 localStorage *****
  const goStep2Btn = document.querySelector('.goStep2Btn');

  goStep2Btn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem('reservationCourse', `${reservationName}課程-${reservationLevel}`);
    window.location.href = '../../reservationStep2.html';
  })
  // ***** 預約監聽 localStorage end *****
}

if (document.title === "DOYOGA ReservationStep2" || document.title === "DOYOGA ReservationStep3"){
  const courseName = document.querySelector('.courseName');
  courseName.textContent = localStorage.getItem('reservationCourse') || '首次體驗課程-基礎';
}

if (document.title === "DOYOGA Index" || document.title === "DOYOGA Course" || document.title === "DOYOGA yogaSpace" || document.title === "DOYOGA Course Time"){
  slidar();
}

if (document.title === "DOYOGA Index"){
  // ***** swiper *****
  const slider2 = document.querySelector('.dragList2nd');
  let isDown = false;
  let startX;
  let scrollLeft;
  slider2.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider2.offsetLeft;
    scrollLeft = slider2.scrollLeft;
  });
  slider2.addEventListener('mouseleave', () => {
    isDown = false;
  });
  slider2.addEventListener('mouseup', () => {
    isDown = false;
  });
  slider2.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider2.offsetLeft;
    const walk = (x - startX) * 3;
    slider2.scrollLeft = scrollLeft - walk;
  });
  // ***** swiper end *****

  // ***** pagination *****
  const feedback = [
    {
      pic: './assets/images/user-1.png',
      user: 'Joanne',
      message: '服務很好、設備優良！'
    },
    {
      pic: './assets/images/user-2.png',
      user: '穎旻',
      message: '上課後身體健康很多'
    },
    {
      pic: './assets/images/user-3.png',
      user: '子琪',
      message: '上課很有趣！'
    },
    {
      pic: './assets/images/user-4.png',
      user: '葉子',
      message: '老師的教學很專業'
    },
    {
      pic: './assets/images/user-5.png',
      user: 'Ray',
      message: '很舒壓'
    },
    {
      pic: './assets/images/user-6.png',
      user: '俊儀',
      message: '讚的！'
    }
  ]
  const prePageBtn = document.querySelector('.prePageBtn');
  const nextPageBtn = document.querySelector('.nextPageBtn');
  const mobileMessage = document.querySelector('.mobileMessage');

  const page = {
    currentPage: 1,
    pages: 0
  }

  init();
  
  function init() {
    page.pages = feedback.length / 3;
    renderData(page.currentPage);
  }

  function renderData(currentPage){
    let data = [];
    for(let i = 0; i < 3; i++){
      data.push(feedback[i + (currentPage-1)*3 ]);
    }
    let str = "";
    data.forEach((item) => {
      str += `
        <div class="d-flex d-md-none bg-white rounded align-items-center p-6 mb-3">
          <div class="flex-shrink-0">
            <img src="${item.pic}" alt="user-img">
          </div>
          <div class="flex-grow-1 ms-7">
            <h4 class="fs-6 mb-3">${item.user} <class="fs-8 ms-3">Oct 17 2020</span></h4>
            <ul class="d-flex mb-3">
              <li class="me-1"><i class="material-icons text-secondary">star</i></li>
              <li class="me-1"><i class="material-icons text-secondary">star</i></li>
              <li class="me-1"><i class="material-icons text-secondary">star</i></li>
              <li class="me-1"><i class="material-icons text-secondary">star</i></li>
              <li><i class="material-icons text-secondary">star</i></li>
            </ul>
            <p class="mb-0">${item.message}</p>
          </div>
        </div>
      `
    })
    mobileMessage.innerHTML = str;
  }

  function disablePage(){
    if(page.currentPage === page.pages){
      nextPageBtn.classList.add('isDisabled');
    }
    if (page.currentPage === 1) {
      prePageBtn.classList.add('isDisabled');
    }
  }
  // 監聽下一頁
  nextPageBtn.addEventListener('click', ()=>{
    if (page.currentPage < page.pages){
      page.currentPage++;
      disablePage();
    }
    if (page.currentPage > 1){
      prePageBtn.classList.remove('isDisabled');
    }
    renderData(page.currentPage);
  })
  // 監聽前一頁
  prePageBtn.addEventListener('click', () => {
    if (page.currentPage > 1) {
      page.currentPage--;
      disablePage();
    }
    if (page.currentPage < page.pages) {
      nextPageBtn.classList.remove('isDisabled');
    }
    renderData(page.currentPage);
  })
  // ***** pagination end *****
}

if (document.title === "DOYOGA ReservationStep2"){
  const element = document.querySelector('input[name="datepicker"]');
  const datepicker = new Datepicker(element, {
    autohide: true,
    format: 'yyyy/mm/dd',
    clearBtn: true,
  });
}