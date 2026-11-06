(function () {
  const recipes = [
    ['방울토마토, 페타치즈, 파스타, 바질', '토마토와 페타치즈에 올리브오일을 뿌려 200°C 오븐에서 토마토가 부드러워질 때까지 굽습니다.', '삶은 파스타를 넣고 섞은 뒤 바질을 올립니다.'],
    ['소고기, 마늘, 밥, 간장', '얇게 썬 마늘을 바삭하게 구워 덜어두고, 같은 팬에 소고기를 굽습니다.', '밥에 먹기 좋게 썬 고기와 간장 소스를 얹고 마늘칩을 올립니다.'],
    ['버섯, 쌀, 육수, 크림, 파르메산', '버섯과 쌀을 볶고 따뜻한 육수를 조금씩 부어가며 쌀이 익을 때까지 저어줍니다.', '크림과 파르메산을 섞어 농도를 맞춥니다.']
  ];
  document.querySelectorAll('.food-card').forEach((card, i) => {
    const recipe = recipes[i];
    if (!recipe) return;
    const name = card.querySelector('strong').textContent;
    const label = card.querySelector('.food-copy > span');
    label.textContent = '이 메뉴가 기대돼요 · 레시피 보기';
    const panel = document.createElement('div');
    panel.className = 'recipe-panel';
    panel.id = 'recipe-' + i;
    panel.hidden = true;
    card.setAttribute('aria-controls', panel.id);
    card.setAttribute('aria-expanded', 'false');
    const title = document.createElement('h3');
    title.textContent = name + ' 레시피';
    panel.append(title);
    recipe.forEach((step, n) => {
      const line = document.createElement('p');
      line.textContent = (n ? n + '. ' : '재료: ') + step;
      panel.append(line);
    });
    const link = document.createElement('a');
    link.className = 'experience-cta';
    link.href = '#apply';
    link.dataset.cta = 'recipe';
    link.textContent = '이 메뉴로 체험하기';
    link.addEventListener('click', () => {
      const selected = document.getElementById('selected-menu');
      selected.textContent = '선택한 메뉴: ' + name;
      selected.hidden = false;
    });
    panel.append(link);
    const group = document.createElement('div');
    group.className = 'recipe-group';
    card.before(group);
    group.append(card, panel);
    card.addEventListener('click', () => {
      panel.hidden = !panel.hidden;
      card.setAttribute('aria-expanded', String(!panel.hidden));
      label.textContent = panel.hidden ? '이 메뉴가 기대돼요 · 레시피 보기' : '레시피 닫기';
    });
  });
})();
