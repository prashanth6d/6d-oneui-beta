/* Shared renderer for the 6D ONE UI colour reference cards.
   Reads window.PALETTE = [{ title, colors:[ …swatches ] }] and paints
   rich swatch cards: colour panel with WCAG contrast badges (black-text +
   white-text ratio & AA/AAA grades), #HEX / RGBA readouts and a one-line
   usage note (where the colour is used).
   A swatch is either  { name, hex, use }  or a gradient
   { name, gradient:'<css>', stops:[{pct,hex}], use }. All numbers are derived
   from the token value so they can never drift from the source. */
(function () {
  function hexToRgb(hex) {
    hex = hex.replace('#', '').trim();
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    return [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16));
  }
  function lum(r, g, b) {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  function grade(ratio, large) {
    if (large) return ratio >= 4.5 ? 'AAA' : ratio >= 3 ? 'AA' : '';
    return ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : '';
  }
  function badgeLabel(ratio) {
    const g = [grade(ratio, false), grade(ratio, true)].filter(Boolean).join(' ');
    return ratio.toFixed(2) + (g ? ' ' + g : '');
  }
  function esc(s) { return String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])); }

  function swatchCard(sw) {
    if (sw.gradient) {
      const stops = (sw.stops || []).map(s =>
        `<span><span class="cc-stopdot" style="background:${s.hex}"></span>${s.pct} &nbsp;${esc(s.hex.replace('#', '').toUpperCase())}</span>`
      ).join('');
      return `<div class="cc">
        <div class="cc-fill cc-grad" style="background:${sw.gradient}">
          <div class="cc-stops${sw.textDark ? ' dark' : ''}">${stops}</div>
        </div>
        <div class="cc-name">${esc(sw.name)}</div>
        <div class="cc-meta cc-hex">Gradient</div>
        <div class="cc-meta">${(sw.stops || []).map(s => s.hex.toUpperCase()).join(' → ')}</div>
        ${sw.use ? `<div class="cc-use">${esc(sw.use)}</div>` : ''}
      </div>`;
    }
    const [r, g, b] = hexToRgb(sw.hex);
    const L = lum(r, g, b);
    const rBlack = (L + 0.05) / 0.05;   // black text on this colour
    const rWhite = 1.05 / (L + 0.05);   // white text on this colour
    const HEX = '#' + sw.hex.replace('#', '').toUpperCase();
    return `<div class="cc">
      <div class="cc-fill" style="background:${sw.hex}">
        <div class="cc-badges">
          <span class="cc-badge"><span class="cc-dot dark"></span>${badgeLabel(rBlack)}</span>
          <span class="cc-badge"><span class="cc-dot light"></span>${badgeLabel(rWhite)}</span>
        </div>
      </div>
      <div class="cc-name">${esc(sw.name)}</div>
      <div class="cc-meta cc-hex">${HEX}</div>
      <div class="cc-meta">RGBA (${r}, ${g}, ${b}, 1)</div>
      ${sw.use ? `<div class="cc-use">${esc(sw.use)}</div>` : ''}
    </div>`;
  }

  function render() {
    const root = document.getElementById('palette');
    if (!root || !window.PALETTE) return;
    root.innerHTML = window.PALETTE.map(sec => `
      <section class="cc-section">
        <h2 class="cc-h">${esc(sec.title)}</h2>
        <div class="cc-grid">${sec.colors.map(swatchCard).join('')}</div>
      </section>`).join('');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
