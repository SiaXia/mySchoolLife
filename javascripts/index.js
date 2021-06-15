// 추가
const graph = new Image();

// X좌표 계산
const pointX = (index) => {
  return (index + 1) * 78 + 50;
};
// Y좌표 계산
const pointY = (grade) => {
  return 75 * (4.5 - grade) + 25;
};
const point = [];
const grade = [3.27, 3.56, 2.17, 2.8, 3.67, 3.67, 4.5, 4.5];
let canvas, context, x, y;

// onclick시 윈도우 열기
const href = (url) => {
  window.open(url, '_blank');
};

const onLoad = (pageNumber) => {
  // header
  const header = document.getElementById('header');
  const headerArticle = document.createElement('article');
  const nav = document.createElement('nav');
  const a = document.createElement('a');
  const ul = document.createElement('ul');
  const type = [
    {
      id: 'intro',
      text: '소개',
      href: `${pageNumber !== 0 ? '' : 'pages/'}introduction.html`,
    },
    {
      id: 'cur',
      text: '교과활동',
      href: `${pageNumber !== 0 ? '' : 'pages/'}curriculum.html`,
    },
    {
      id: 'excur',
      text: '비교과활동',
      href: `${pageNumber !== 0 ? '' : 'pages/'}extracurricular.html`,
    },
    {
      id: 'proj',
      text: '프로젝트',
      href: `${pageNumber !== 0 ? '' : 'pages/'}projects.html`,
    },
    {
      id: 'closing',
      text: '맺는말',
      href: `${pageNumber !== 0 ? '' : 'pages/'}closing.html`,
    },
  ];
  a.id = 'title';
  a.innerText = '방구석 이찬빈'; // 제목 변경
  pageNumber !== 0 ? (a.href = '../index.html') : (a.style.cursor = 'default');
  nav.appendChild(a);

  for (let i = 0; i < 5; i++) {
    const tmp = document.createElement('a');
    tmp.id = type[i].id;
    tmp.innerText = type[i].text;
    tmp.href = type[i].href;
    ul.appendChild(tmp);
  }
  nav.appendChild(ul);
  headerArticle.appendChild(nav);
  header.appendChild(headerArticle);

  // footer
  const section = document.getElementById('footer');
  const footer = document.createElement('footer');
  const footerArticle = document.createElement('article');
  const p1 = document.createElement('p');
  const p2 = document.createElement('p');
  p1.innerText = '© 2021 by Lee Chanbin.';
  p2.innerText = '웹개발입문 6조';

  footerArticle.id = 'footer';
  footerArticle.appendChild(p1);
  footerArticle.appendChild(p2);
  footer.appendChild(footerArticle);
  section.appendChild(footer);

  switch (pageNumber) {
    case 0:
      clock();
      let intervalClock = () => setInterval(clock, 0);
      intervalClock();
      return;
    case 2:
      makeCanvas();
      return;
    default:
      return;
  }
};
const clock = () => {
  const date = document.getElementById('date');
  const clock = document.getElementById('clock');
  const nowDate = new Date();
  const hour = nowDate.getHours();
  const min = nowDate.getMinutes();
  date.innerText = nowDate.toLocaleDateString();
  clock.innerText = timeFormat(hour, min);
};

// 시간 포맷
const timeFormat = (hour, min) => {
  // 0 이하일 경우 0 추가
  const zeroFormat = (text) => {
    return text < 10 ? '0' + text : text;
  };
  // 오후
  if (hour > 12) {
    return `${zeroFormat(hour - 12)}:${zeroFormat(min)} PM`;
  }
  // 오전
  else return `${zeroFormat(hour)}:${zeroFormat(min)} AM`;
};

// 캔버스 그리기
const makeCanvas = () => {
  // initialize points
  for (let i = 0; i < 8; i++) {
    point.push({
      index: i,
      grade: grade[i],
      x: pointX(i),
      y: pointY(grade[i]),
    });
  }

  // canvas
  canvas = document.getElementById('myCanvas');
  context = canvas.getContext('2d');

  drawGraph();

  for (let i = 0; i < point.length; i++) {
    makeThePoint(point[i].x, point[i].y, 5);
  }

  canvas.addEventListener(
    'mousemove',
    (e) => {
      move(e);
    },
    false
  );

  canvas.addEventListener(
    'mousedown',
    (e) => {
      down(e);
    },
    false
  );
};

// 그래프 그리기
const drawGraph = () => {
  // background
  context.beginPath();
  context.rect(0, 0, 800, 370);
  context.fillStyle = 'white';
  context.fill();

  context.font = '1em MaruBuri-Regular';
  let y = 25,
    grade = 4.5;
  for (let i = 0; i < 5; i++) {
    // grade
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.strokeText(grade--, 15, y + 5);

    // outer line
    context.strokeStyle = 'rgba(0,0,0,0.5)';
    context.lineWidth = 0.25;
    context.moveTo(50, y);
    context.lineTo(750, y);
    y = y + 75;
  }
  context.stroke();

  // text
  context.beginPath();
  context.lineWidth = 1;
  context.fillStyle = '#FDB927';
  for (let i = 0; i < point.length; i++) {
    if (i < point.length - 1) {
      context.strokeStyle = 'rgb(253,185,39)';
      context.moveTo(point[i].x, point[i].y);
      context.lineTo(point[i + 1].x, point[i + 1].y);
      context.stroke();
    }
    context.strokeStyle = 'black';
    // my grade
    context.strokeText(point[i].grade, point[i].x - 16, point[i].y + 35);
    // period
    context.strokeText(
      `${Math.floor(point[i].index / 2) + 1}/${(point[i].index % 2) + 1}`,
      point[i].x - 16,
      350
    );
  }
};

// 점에 들어왔을 때
const getIntoThePoint = (e, x, y) => {
  if (
    e.offsetX <= x + 5 &&
    e.offsetX >= x - 5 &&
    e.offsetY <= y + 5 &&
    e.offsetY >= y - 5
  ) {
    return true;
  } else return false;
};
// 점에서 나갔을 때
const getOutFromThePoint = (e, x, y) => {
  if (
    !getIntoThePoint(e, x, y) &&
    e.offsetX <= x + 9 &&
    e.offsetX >= x - 9 &&
    e.offsetY <= y + 9 &&
    e.offsetY >= y - 9
  ) {
    return true;
  } else return false;
};
// 점 생성
const makeThePoint = (x, y, rad) => {
  context.beginPath();
  context.strokeStyle = '#FDB927';
  context.arc(x, y, rad, 0, 2 * Math.PI, false);
  context.fillStyle = '#e74c3c';
  context.fill();
  context.stroke();
};
const changeTableHead = (text) => {
  const thead = document.getElementById('thead');
  const thr = document.createElement('tr');
  const thd = document.createElement('td');

  thead.innerHTML = null;
  thd.innerText = text;
  thd.colSpan = '2';
  thr.appendChild(thd);
  thead.appendChild(thr);
};
const changeTableItems = (text1, text2) => {
  const tbody = document.getElementById('tbody');
  const tbr = document.createElement('tr');
  const tbd1 = document.createElement('td');
  const tbd2 = document.createElement('td');

  tbd1.innerText = text1;
  tbd2.innerText = text2;
  tbr.appendChild(tbd1);
  tbr.appendChild(tbd2);
  tbody.appendChild(tbr);
};
const removeTableItems = () => {
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = null;
};

const move = (e) => {
  for (let i = 0; i < point.length; i++) {
    x = point[i].x;
    y = point[i].y;
    if (getIntoThePoint(e, x, y)) canvas.style.cursor = 'pointer';
    else if (getOutFromThePoint(e, x, y)) canvas.style.cursor = 'default';
  }
};

const down = (e) => {
  const major = document.getElementById('major');
  const desc = document.getElementById('desc');
  drawGraph();
  for (let i = 0; i < point.length; i++) {
    x = point[i].x;
    y = point[i].y;
    if (getIntoThePoint(e, x, y)) {
      makeThePoint(x, y, 10);
      major.innerText = '';
      removeTableItems();
      switch (point[i].index) {
        case 0:
          changeTableHead('1학년 1학기');
          changeTableItems('C프로그래밍실습I', 'B+');
          changeTableItems('정보사회론', 'B+');
          changeTableItems('C프로그래밍I', 'B');
          changeTableItems('공업수학I', 'D+');
          desc.innerText = '학교 생활에 적응하던 학기';
          break;
        case 1:
          changeTableHead('1학년 2학기');
          changeTableItems('C프로그래밍실습II', 'B+');
          changeTableItems('C프로그래밍II', 'B');
          changeTableItems('공업수학II', 'C');
          desc.innerText = 'C언어로 언어에 대해 이해하던 학기';
          break;
        case 2:
          changeTableHead('2학년 1학기');
          changeTableItems('C++프로그래밍', 'C+');
          changeTableItems('자료구조', 'C');
          changeTableItems('데이터통신', 'D+');
          changeTableItems('논리회로설계', 'D+');
          changeTableItems('공업수학I(재)', 'C+');
          desc.innerText = 'C++과 더불어 전공 기초를 다지던 학기';
          break;
        case 3:
          changeTableHead('2학년 2학기');
          changeTableItems('윈도우즈프로그래밍', 'B+');
          changeTableItems('컴퓨터구조', 'C');
          changeTableItems('신호및시스템', 'D+');
          changeTableItems('자료구조(재)', 'B+');
          changeTableItems('논리회로설계(재)', 'B+');
          desc.innerText = '재수강을 위주로 전공을 들으며 꿈을 생각했던 학기';
          break;
        case 4:
          changeTableHead('3학년 1학기');
          changeTableItems('컴퓨터그래픽스', 'A');
          changeTableItems('알고리즘', 'A');
          changeTableItems('컴퓨터네트워크', 'A');
          changeTableItems('자바프로그래밍', 'B+');
          changeTableItems('고급자바프로그래밍', 'B+');
          changeTableItems('파이썬프로그래밍', 'B');
          desc.innerText =
            '군 복학 후 마음을 다잡고 여러 언어를 배우며 적성을 찾아가던 학기';
          break;
        case 5:
          changeTableHead('3학년 2학기');
          changeTableItems('게임프로그래밍', 'A');
          changeTableItems('디지털영상처리', 'A');
          changeTableItems('운영체제', 'A');
          changeTableItems('머신러닝', 'B+');
          changeTableItems('자바프로젝트', 'B+');
          changeTableItems('모바일프로그래밍', 'B');
          desc.innerText =
            '흥미있는 전공을 들으며 작은 프로젝트를 하나씩 시작해보는 학기';
          break;
        case 6:
          changeTableHead('4학년 1학기');
          changeTableItems('웹개발입문', 'A+');
          changeTableItems('웹프로그래밍', 'A+');
          changeTableItems('프론트엔드개발', 'A+');
          changeTableItems('데이터베이스', 'A+');
          changeTableItems('캡스톤디자인', 'A+');
          desc.innerText =
            '프론트엔드 개발자가 되기 위해 본격적으로 웹 공부 및 프로젝트 시작!';
          break;
        case 7:
          changeTableHead('4학년 2학기');
          changeTableItems('백엔드프레임워크', 'A+');
          changeTableItems('소프트웨어캡스톤디자인', 'A+');
          desc.innerText = '백엔드 지식을 쌓으며 프로젝트로 학교생활 마무리';
          break;
      }
    } else makeThePoint(x, y, 5);
  }
};
