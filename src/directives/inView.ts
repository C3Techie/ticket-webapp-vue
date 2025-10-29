import type { DirectiveBinding } from 'vue';

const inViewDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const options = binding.value || { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.dispatchEvent(new CustomEvent('in-view'));
          observer.unobserve(el);
        }
      });
    }, options);
    observer.observe(el);
    // Store observer for cleanup
    (el as any)._inViewObserver = observer;
  },
  unmounted(el: HTMLElement) {
    const observer = (el as any)._inViewObserver;
    if (observer) observer.disconnect();
  }
};

export default inViewDirective;
