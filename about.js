$(function() {
  $('.js-nav a, .js-connect').click(function(e) {
    e.preventDefault();
    $('body, html').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 750);
  });
});

var testimonials = [{
  "name": "cederholm",
  "quote": "<a href=\"#\">Iconic Gits LLC</a>  has been our go-to for corporate gifting and promotional items. Their experienced team consistently finds unique, budget-friendly gifts. We highly recommend their excellent in-house printing and embroidery services for uniforms and coveralls."
}]


testimonial = testimonials[Math.floor(Math.random() * testimonials.length)];
  document.getElementById("quote-quote").innerHTML = testimonial.quote
  document.getElementById("quote-attrib").innerHTML = testimonial.attribution
  document.getElementById("quote-wrapper").className = testimonial.name