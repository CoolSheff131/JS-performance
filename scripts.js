(() => {
  function bind(node, event, handler) {
    node.addEventListener(event, handler);
  }

  function makeTabs() {
    const node = document.querySelector('.main__devices');

    let selected = node.querySelector('.section__tab_active').dataset.id;
    const select = node.querySelector('.section__select');

    const tabs = node.querySelector('.section__tabs');
    const panels = node.querySelectorAll('.section__panel');

    const list = Array.from(tabs.children).map((node) => node.dataset.id);

    function selectTab(newId) {
      const index = list.indexOf(newId);
      const oldIndex = list.indexOf(selected);

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

    bind(tabs, 'click', (event) => {
      const newId = event.target.dataset.id;
      selectTab(newId);
    });

    bind(tabs, 'keydown', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
        return;
      }

      let index = list.indexOf(selected);
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
        index = list.length - 1;
      } else {
        return;
      }

      if (index >= list.length) {
        index = 0;
      } else if (index < 0) {
        index = list.length - 1;
      }

      selectTab(list[index]);
      event.preventDefault();
    });
  }

  function makeMenu() {
    const node = document.querySelector('.header__menu');
    let expanded = false;
    const links = document.querySelector('.header__links');

    node.addEventListener('click', () => {
      expanded = !expanded;
      node.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      node.querySelector('.header__menu-text').textContent = expanded
        ? 'Закрыть меню'
        : 'Открыть меню';
      links.classList.toggle('header__links_opened', expanded);
      links.classList.add('header__links-toggled');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    makeTabs();
    makeMenu();
  });
})();
