(() => {
  function makeTabs() {
    const node = document.querySelector('.main__devices');

    let selected = node.querySelector('.section__tab_active').dataset.id;
    const select = node.querySelector('.section__select');

    const tabs = node.querySelector('.section__tabs');
    const panels = node.querySelectorAll('.section__panel');

    const listIds = Array.from(tabs.children).map((node) => node.dataset.id);

    function selectTab(newId) {
      const index = listIds.indexOf(newId);
      const oldIndex = listIds.indexOf(selected);

      const newTab = tabs.children[index];
      const newPanel = panels[index];
      const oldTab = tabs.children[oldIndex];
      const oldPanel = panels[oldIndex];

      selected = newId;

      newTab.classList.add('section__tab_active');
      newTab.setAttribute('aria-selected', 'true');
      newTab.setAttribute('tabindex', '0');
      newTab.focus({
        preventScroll: true,
      });

      newPanel.classList.remove('section__panel_hidden');
      newPanel.setAttribute('aria-hidden', 'false');

      select.value = newId;

      oldTab.classList.remove('section__tab_active');
      oldTab.setAttribute('aria-selected', 'false');
      oldTab.removeAttribute('tabindex');

      oldPanel.classList.add('section__panel_hidden');
      oldPanel.setAttribute('aria-hidden', 'true');
    }

    select.addEventListener('input', () => {
      selectTab(select.value);
    });

    tabs.addEventListener('click', (event) => {
      const newId = event.target.dataset.id;
      selectTab(newId);
    });

    tabs.addEventListener('keydown', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
        return;
      }

      let index = listIds.indexOf(selected);
      if (event.which === 37) {
        // left
        --index;
      } else if (event.which === 39) {
        // right
        ++index;
      } else if (event.which === 36) {
        // home
        index = 0;
      } else if (event.which === 35) {
        // end
        index = listIds.length - 1;
      } else {
        return;
      }

      if (index >= listIds.length) {
        index = 0;
      } else if (index < 0) {
        index = listIds.length - 1;
      }

      selectTab(listIds[index]);
      event.preventDefault();
    });
  }

  function makeMenu() {
    const node = document.querySelector('.header__menu');
    const menuText = node.querySelector('.header__menu-text');
    let expanded = false;
    const links = document.querySelector('.header__links');

    node.addEventListener('click', () => {
      expanded = !expanded;
      node.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      menuText.innerHTML = expanded ? 'Закрыть меню' : 'Открыть меню';
      links.classList.toggle('header__links_opened', expanded);
      links.classList.add('header__links-toggled');
    });
  }

  makeTabs();
  makeMenu();
})();
