/**
 * @tagName - name tag
 * @props - object with element properties
 */

export default class WebComponent {
  constructor(tagName, props) {
    this.tagName = tagName;
    this.props = props;

    this.element = null;
    this.parent = null;

    this.create();
    this.setProps();
  }

  create() {
    this.element = document.createElement(this.tagName);
  }

  setProps() {
    for (const prop in this.props) {
      if (Object.hasOwn(this.props, prop)) {
        switch (prop) {
          case 'text':
            this.element.textContent = this.props[prop];
            break;
          case 'class':
            this.element.classList.add(...this.props.class.split(' '));
            break;
          default:
            this.setProp(prop, this.props[prop]);
        }
      }
    }
  }

  setProp(prop, value) {
    this.element[prop] = value;
  }

  appendToDOM(container) {
    if (typeof container === 'string') {
      this.parent = document.querySelector(container);
    } else {
      this.parent = container;
    }
    if (this.parent instanceof HTMLElement) {
      this.parent.appendChild(this.element);
    } else {
      throw new Error('Container is not HTMLElement');
    }
  }

  appendToComponent(component) {
    if (component instanceof WebComponent) {
      component.element.appendChild(this.element);
      this.parent = component.element;
    } else {
      throw new Error(`${component} is not component`);
    }
  }

  insertText(text) {
    this.element.innerHTML += text;
  }

  addClass(className) {
    this.element.classList.add(className);
  }

  get value() {
    return this.element.value ? this.element.value : '';
  }

  set value(text) {
    this.element.value = text;
  }

  insertElem(element) {
    this.element.appendChild(element);
  }

  insertComponent(component) {
    this.element.appendChild(component.element);
  }

  registerListener(type, callback) {
    this.element.addEventListener(type, callback);
  }

  removeListener(type, callback) {
    this.element.removeEventListener(type, callback);
  }

  remove() {
    this.element.remove();
  }

  removeAllContent() {
    this.element.innerHTML = '';
  }

  scrollToEnd() {
    this.element.scrollTop = this.element.scrollHeight - this.element.clientHeight;
  }
}
