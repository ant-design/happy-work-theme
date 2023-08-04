window.requestAnimationFrame = setTimeout;
window.cancelAnimationFrame = clearTimeout;

global.requestAnimationFrame = global.setTimeout;
global.cancelAnimationFrame = global.clearTimeout;
