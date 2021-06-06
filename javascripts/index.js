// 추가
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
};
