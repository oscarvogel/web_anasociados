(function(){
  // Carousel sencillo: prev/next scroll + autoplay
  function qs(sel, ctx){ return (ctx||document).querySelector(sel); }
  function qsa(sel, ctx){ return Array.from((ctx||document).querySelectorAll(sel)); }

  document.addEventListener('DOMContentLoaded', function(){
    var track = qs('.clients-track');
    if(!track) return;

    var prev = qs('.clients-prev');
    var next = qs('.clients-next');
    var scrollAmount = Math.round(track.clientWidth * 0.6);
    var autoInterval = null;

    function scrollBy(amount){
      track.scrollBy({ left: amount, behavior: 'smooth' });
    }

    if(prev) prev.addEventListener('click', function(){ scrollBy(-scrollAmount); resetAuto(); });
    if(next) next.addEventListener('click', function(){ scrollBy(scrollAmount); resetAuto(); });

    // keyboard accessibility
    document.addEventListener('keydown', function(e){
      if(e.key === 'ArrowLeft') { scrollBy(-scrollAmount); resetAuto(); }
      if(e.key === 'ArrowRight') { scrollBy(scrollAmount); resetAuto(); }
    });

    // autoplay (pauses on pointer interaction)
    function startAuto(){
      if(autoInterval) return;
      autoInterval = setInterval(function(){
        if(track.scrollWidth - track.scrollLeft - track.clientWidth < 5) {
          // rewind
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollBy(scrollAmount);
        }
      }, 3500);
    }
    function stopAuto(){ if(autoInterval){ clearInterval(autoInterval); autoInterval = null; } }
    function resetAuto(){ stopAuto(); startAuto(); }

    track.addEventListener('pointerenter', stopAuto);
    track.addEventListener('pointerdown', stopAuto);
    track.addEventListener('pointerleave', startAuto);

    // init
    // recalc on resize
    window.addEventListener('resize', function(){ scrollAmount = Math.round(track.clientWidth * 0.6); });
    startAuto();
  });
})();
