(function () {
  const about = document.querySelector('.banner-about');
  const intro = document.getElementById('brand-intro');
  if (about && intro) about.addEventListener('click', () => {
    intro.hidden = !intro.hidden;
    about.setAttribute('aria-expanded', String(!intro.hidden));
    if (!intro.hidden) intro.scrollIntoView({ block: 'nearest' });
  });
  const recipes = [
    [
      "스파게티 90g, 방울토마토 200g, 페타치즈 60g, 마늘 2쪽, 올리브오일 1½큰술, 바질 5장, 소금·후추",
      "오븐을 200°C로 예열하고 작은 오븐용 그릇을 준비하세요.",
      "토마토를 씻어 물기를 닦고 마늘을 얇게 썰어요.",
      "그릇에 토마토와 마늘, 오일 대부분을 넣어 버무리고 가운데에 페타를 놓아요. 남은 오일과 후추를 치세요.",
      "오븐에서 25~35분 구워요. 토마토 껍질이 터지고 페타가 부드러워지면 꺼내세요.",
      "굽는 동안 소금물에 면을 포장 시간에 맞춰 삶고, 건지기 전에 면수 반 컵을 남겨요.",
      "뜨거운 토마토와 페타를 포크로 으깨 소스를 만들어요.",
      "면을 넣어 섞고 뻑뻑하면 면수를 한 큰술씩 넣어 면에 소스가 고르게 묻게 하세요.",
      "바질을 손으로 찢어 올려요. 페타가 짭짤하니 간을 본 후 소금을 더하세요."
    ],
    [
      "스테이크용 소고기 150g, 밥 1공기, 마늘 3쪽, 식용유 1큰술, 간장·물 각 1큰술, 설탕 ½작은술, 소금·후추",
      "밥을 데우고 간장, 물, 설탕을 작은 그릇에 섞어요.",
      "마늘을 얇게 썰고 약불에 식용유와 함께 올려 천천히 익혀요.",
      "마늘이 옅은 금색이 되면 건져 키친타월에 펴 두세요. 팬에 남은 기름은 고기 굽는 데 써요.",
      "소고기 표면을 닦고 소금과 후추를 뿌려요.",
      "팬을 중강불로 달군 뒤 고기 양면과 가장자리를 구워요. 두께에 따라 불을 낮춰 속까지 익혀요.",
      "고기를 접시에 옮겨 잠시 쉬게 한 뒤 결 반대 방향으로 얇게 썰어요.",
      "팬에 소스를 넣고 눌어붙은 고기 맛을 긁어 섞으며 살짝 끓여요.",
      "밥에 고기와 소스를 얹고 마늘칩은 먹기 직전에 올려 바삭함을 살려요."
    ],
    [
      "아르보리오 쌀 85g, 버섯 150g, 양파 ¼개, 마늘 1쪽, 육수 약 400ml, 버터 15g, 생크림 2큰술, 파르메산 15g",
      "육수를 작은 냄비에서 데우고 약불로 따뜻하게 유지해요.",
      "버섯은 먹기 좋게 썰고 양파와 마늘은 잘게 다져요.",
      "팬에 버터 절반을 녹여 버섯을 볶아요. 수분이 날아가고 노릇해지면 덜어두세요.",
      "남은 버터에 양파와 마늘을 볶다가 양파가 투명해지면 쌀을 넣고 1분 정도 섞어요.",
      "따뜻한 육수를 한 국자 붓고 중약불에서 저어요. 쌀이 육수를 흡수하면 한 국자 더 넣어요.",
      "육수를 나눠 넣으며 약 18~22분 익혀요. 쌀이 부드러우면서 가운데에 씹는 맛이 조금 남으면 충분해요.",
      "버섯 대부분과 생크림을 넣고 섞어요. 너무 되직하면 남은 육수를 한두 큰술 더하세요.",
      "불을 끄고 파르메산을 섞은 뒤 간을 봐요. 남겨둔 버섯을 위에 올려 따뜻할 때 드세요."
    ]
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
    const [ingredients, ...steps] = recipe;
    const ingredientLine = document.createElement('p');
    ingredientLine.textContent = '1인분 재료 · ' + ingredients;
    const list = document.createElement('ol');
    steps.forEach((step) => {
      const item = document.createElement('li');
      item.textContent = step;
      list.append(item);
    });
    panel.append(ingredientLine, list);
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
