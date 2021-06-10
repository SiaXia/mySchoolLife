// 추가
const graph = new Image();
const point = [
  { index: 0, x: 103, y: 83 },
  { index: 1, x: 227, y: 63 },
  { index: 2, x: 350, y: 160 },
  { index: 3, x: 474, y: 115 },
  { index: 4, x: 597, y: 55 },
  { index: 5, x: 721, y: 55 },
];
let canvas, context, x, y;
const onLoad = (isPage) => {
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
      href: `${isPage ? '' : 'pages/'}introduction.html`,
    },
    {
      id: 'cur',
      text: '교과활동',
      href: `${isPage ? '' : 'pages/'}curriculum.html`,
    },
    {
      id: 'excur',
      text: '비교과활동',
      href: `${isPage ? '' : 'pages/'}extracurricular.html`,
    },
    {
      id: 'proj',
      text: '프로젝트',
      href: `${isPage ? '' : 'pages/'}projects.html`,
    },
    {
      id: 'closing',
      text: '맺는말',
      href: `${isPage ? '' : 'pages/'}closing.html`,
    },
  ];
  a.id = 'title';
  a.innerText = '방구석 이찬빈';
  isPage ? (a.href = '../index.html') : (a.style.cursor = 'default');
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

  // canvas
  canvas = document.getElementById('myCanvas');
  context = canvas.getContext('2d');

  context.drawImage(graph, 0, 0, 800, 370);
  for (let i = 0; i < 6; i++) {
    makeThePoint(point[i].x, point[i].y, 5);
  }
  canvas.addEventListener(
    'mousedown',
    (e) => {
      down(e);
    },
    false
  );
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
    (e.offsetX == x + 6 && e.offsetY <= y + 5 && e.offsetY >= y - 5) ||
    (e.offsetX == x - 6 && e.offsetY <= y + 5 && e.offsetY >= y - 5) ||
    (e.offsetY == y + 6 && e.offsetX <= x + 5 && e.offsetX >= x - 5) ||
    (e.offsetY == y - 6 && e.offsetX <= x + 5 && e.offsetX >= x - 5)
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
const down = (e) => {
  const major = document.getElementById('major');
  const desc = document.getElementById('desc');
  context.drawImage(graph, 0, 0, 800, 370);
  for (let i = 0; i < 6; i++) {
    x = point[i].x;
    y = point[i].y;
    makeThePoint(x, y, 5);
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
      }
    }
  }
};
graph.src = '../image/graph.JPG';
