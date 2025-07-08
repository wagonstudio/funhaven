/* SCROLL LENIS */
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      const lenis = new Lenis({
        smooth: true,
        smoothWheel: true,
        syncTouch: false,
        syncTouchLerp: 0.1,
        duration: 1.9,
        lerp: 0.08
      })
      
      lenis.on('scroll', (e) => {
        // console.log(e)
        // controller.update();
      })
      
      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      
      requestAnimationFrame(raf)
    }, 1000); 
  });
/* END SCROLL LENIS */
/* SPLITTING */
  document.addEventListener('DOMContentLoaded', function() {
	Splitting();
  });
/* SPLITTING */
/* CURRENT YEAR */
  document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll(".current-year").forEach(element => {
          element.textContent = new Date().getFullYear();
      });
  });
/* END CURRENT YEAR */
/* EFFECT NAV BEANS */
  document.addEventListener("DOMContentLoaded", function () {
    const bean_head = document.querySelector(".bean-i");
    const navContainer = bean_head?.closest("._nav"); // 🔒 Solo opera dentro del nav donde está el bean
  
    if (!navContainer) return;
  
    const navItems_head = navContainer.querySelectorAll(".nav-item > a");
  
    let beanTop_fixed = null;
    let isClicking_head = false;
    let lastScrollY = window.scrollY;
    let currentActiveIndex = 0;
  
    function moveBeanTo_head(el_head) {
      const rect_head = el_head.getBoundingClientRect();
      const navRect_head = navContainer.getBoundingClientRect();
  
      if (rect_head.height < 5 || rect_head.width < 5 || rect_head.top < 0 || rect_head.top > window.innerHeight) return;
  
      const width_head = rect_head.width;
      const height_head = rect_head.height;
      const left_head = rect_head.left - navRect_head.left;
  
      if (beanTop_fixed === null) {
        beanTop_fixed = rect_head.top - navRect_head.top;
      }
  
      bean_head.style.width = width_head + "px";
      bean_head.style.height = height_head + "px";
      bean_head.style.left = left_head + "px";
      bean_head.style.top = beanTop_fixed + "px";
    }
  
    navItems_head.forEach(link_head => {
      link_head.addEventListener("mouseenter", () => moveBeanTo_head(link_head));
    });
  
    const activeItem_head = navContainer.querySelector(".current > a");
    if (activeItem_head) {
      moveBeanTo_head(activeItem_head);
      currentActiveIndex = [...navItems_head].indexOf(activeItem_head);
    }
  
    const controller_head = new ScrollMagic.Controller();
  
    navItems_head.forEach((link_head, index) => {
      const href_head = link_head.getAttribute("href");
      if (href_head && href_head.startsWith("#")) {
        const section_head = document.querySelector(href_head);
  
        link_head.addEventListener("click", () => {
          isClicking_head = true;
          moveBeanTo_head(link_head);
          currentActiveIndex = index;
          setTimeout(() => {
            isClicking_head = false;
          }, 1000);
        });
  
        if (section_head) {
          new ScrollMagic.Scene({
            triggerElement: section_head,
            triggerHook: 0.4,
            duration: section_head.offsetHeight
          })
          .on("enter", () => {
            if (!isClicking_head) {
              moveBeanTo_head(link_head);
              currentActiveIndex = index;
            }
          })
          .on("leave", () => {
            const scrollingUp = window.scrollY < lastScrollY;
  
            if (scrollingUp && index > 0 && !isClicking_head) {
              const prevLink = navItems_head[index - 1];
              moveBeanTo_head(prevLink);
              currentActiveIndex = index - 1;
            }
          })
          .addTo(controller_head);
        }
      }
    });
  
    window.addEventListener("scroll", () => {
      if (window.scrollY <= 10 && navItems_head.length > 0 && !isClicking_head) {
        moveBeanTo_head(navItems_head[0]);
        currentActiveIndex = 0;
      }
      lastScrollY = window.scrollY;
    });
  });

/* END EFFECT NAV BEAN */
/* ACTIVE CART */
  document.addEventListener('DOMContentLoaded', function () {
      const btn = document.querySelector('.btnactivecart');
      const drawer = document.querySelector('.drawer');

      btn.addEventListener('click', function () {
          drawer.classList.toggle('active');
      });
  });
/* END END ACTIVE CART */
/* CARTJS */
  function showToast(message, type = 'success') {
    $('#cartToastMessage').text(message);
    $('#cartToast').removeClass('bg-success bg-danger').addClass('bg-' + type);
    var toast = new bootstrap.Toast(document.getElementById('cartToast'));
    toast.show();
  }
  $(document).ready(function () {
  
    // ============================
    // 🚀 Initialization
    // ============================
  
    CartJS.getCart({
      success: function(data) {
        updateCartCount();
      }
    });
  
    // ============================
    // 🛒 Add Product to Cart
    // ============================
  
    $('body').off('click', '.btn-add-cart, .quick-add').on('click', '.btn-add-cart, .quick-add', function (e) {
      e.preventDefault();
      e.stopPropagation(); // ✅ Evita eventos duplicados
  
      var $btn = $(this);
      var $form = $btn.closest('form');
      var variantId = $form.find('input[name="id"]').val();
  
      if ($btn.hasClass('add-to-cart')) {
        CartJS.addItem(variantId, 1, {}, {
          "success": function(data) {
            showToast('Added to cart');
            updateCartDrawer(true); // Open drawer after adding
            updateCartCount();
          },
          "error": function(jqXHR) {
            var errorMsg = 'Oops! Error adding product';
            if (jqXHR && jqXHR.responseText) {
              try {
                var response = JSON.parse(jqXHR.responseText);
                errorMsg = response.description || errorMsg;
              } catch (e) {
                console.error("Error parsing response:", e);
              }
            }
            showToast(errorMsg, 'danger');
          }
        });
      } else {
        $btn.attr('data-bs-toggle', 'modal');
      }
    });
  
    // ============================
    // 🟢 Update Cart Item Count
    // ============================
  
    function updateCartCount() {
      var itemCount = CartJS.cart.item_count;

    }
  
    // ============================
    // 🛠️ Update Cart Drawer
    // ============================
  
    function updateCartDrawer(openDrawer = false) {
      $.get('/cart', function(data) {
        var cartItems = $(data).find('#CartDrawer-CartItems').html();
        $('#CartDrawer-CartItems').html(cartItems);
  
        const cartDrawer = document.querySelector('cart-drawer');
        const drawer = document.querySelector('.drawer');
        const cartTotalPrice = $(data).find('.totals__total-value').first().text().trim();
  
        // Verificar si el carrito tiene productos
        if (CartJS.cart.item_count > 0) {
          $('.drawer__inner-empty').hide();
          $('cart-drawer-items').removeClass('is-empty');
          $('.cart__footer').show();
          drawer.classList.remove('is-empty');
        } else {
          $('.drawer__inner-empty').show();
          $('cart-drawer-items').addClass('is-empty');
          $('.cart__footer').hide();
          drawer.classList.add('is-empty');
        }
  
        // ✅ Actualizar el precio sin duplicarlo
        $('.totals__total-value').each(function() {
          $(this).empty().text(cartTotalPrice);
        });
  
        // Abrir el drawer si es necesario
        if (openDrawer) {
          $(drawer).addClass('active');
          $('#CartDrawer-Overlay').addClass('active');
        }
  
        // ✅ Mantener ícono original del carrito
        const itemCount = CartJS.cart.item_count;
        $('.mega-nav-count .count-items').text(itemCount);
      });
    }
  
  
$('body').off('click', '.cart-remove-button').on('click', '.cart-remove-button', function (e) {
  e.preventDefault();

  const line = $(this).data('line');
  if (!line) return;

  CartJS.removeItem(line, {
    "success": function(data) {
      showToast('Removed from cart');
      updateCartDrawer();
      updateCartCount();
    },
    "error": function(jqXHR) {
      var errorMsg = 'Oops! Error removing product';

      if (jqXHR && jqXHR.responseText) {
        try {
          var response = JSON.parse(jqXHR.responseText);
          errorMsg = response.description || errorMsg;
        } catch (e) {
          console.error("Error parsing response", e);
        }
      }

      showToast(errorMsg, 'danger');
    }
  });
});

  
    // ============================
    // 🟡 Open Cart Drawer on Click
    // ============================
  
    $('body').on('click', 'form .add-to-cart', function (e) {
      e.preventDefault();
      $('cart-drawer').addClass('active');
      $('#CartDrawer-Overlay').addClass('active');
    });
  
    // ============================
    // ❌ Close Cart Drawer
    // ============================
  
    $('#CartDrawer-Overlay').on('click', function () {
      $('cart-drawer').removeClass('active');
      $(this).removeClass('active');
    });
  
  
  });
/* END CARTJS */
/* MENU */
  const fullMenu_i = document.querySelector('._fullmenu');
  const buttons_i = document.querySelectorAll('.btnactivemenu');
  const closers_i = document.querySelectorAll('.closemenu');
  const links_i = document.querySelectorAll('aside._fullmenu._i ._content li a');
  // Toggle individual al hacer clic en .btnactivemenu
  buttons_i.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault(); // previene bugs de navegación si el botón es un <a>
      const isOpen = fullMenu_i.classList.contains('on');
      
      // Asegura que solo una acción ocurra por clic
      if (!isOpen) {
        button.classList.add('on');
        fullMenu_i.classList.add('on');
      } else {
        button.classList.remove('on');
        fullMenu_i.classList.remove('on');
      }
    });
  });
  // Toggle global al hacer clic en .closemenu
  closers_i.forEach(closer => {
    closer.addEventListener('click', e => {
      e.preventDefault();
      const isOpen = fullMenu_i.classList.contains('on');
      if (isOpen) {
        buttons_i.forEach(button => button.classList.remove('on'));
        fullMenu_i.classList.remove('on');
      }
    });
  });
  // Remover 'on' al hacer clic en los enlaces dentro del menú
  links_i.forEach(link => {
    link.addEventListener('click', () => {
      buttons_i.forEach(button => button.classList.remove('on'));
      closers_i.forEach(closer => closer.classList.remove('on'));
      fullMenu_i.classList.remove('on');
    });
  });
/* END MENU */
/* SCROLL */
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const targetEl = document.querySelector(targetId);

        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  });
/* END SCROLL */
/* BUTTON  ANIMATION */
  document.querySelectorAll('._btn').forEach(function(button_anim) {
    button_anim.addEventListener('click', function (e) {
      const real = this.querySelector('._real');
      const back = this.querySelector('._back');
      const isLink = this.tagName.toLowerCase() === 'a';
      const href = this.getAttribute('href');
  
      if (real && back) {
        e.preventDefault(); // Detenemos la navegación inmediata si es <a>
  
        real.classList.remove('anim-rebote-real');
        back.classList.remove('anim-rebote-back');
        void real.offsetWidth;
        void back.offsetWidth;
        real.classList.add('anim-rebote-real');
        back.classList.add('anim-rebote-back');
  
        if (isLink && href) {
          setTimeout(() => {
            window.location.href = href;
          }, 500); // Espera 0.5s antes de navegar
        }
      }
    });
  });

  window.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
      console.log('Designed and Developed by Wagon Studio');
      console.log('In collaboration with github.com/codevamon');
    }, 10000);
  });
/* END BUTTON ANIMATION */

/* GLOBAL ANIMATION */
  $(document).ready(function() {
	setTimeout(function() {
		$('section._i').addClass('move_1');
		$('section._ii').addClass('move_1');
		$('body').addClass('move_1');
		setTimeout(function() {
			$('section._i').addClass('move_2');
			$('section._ii').addClass('move_2');
    		$('body').addClass('move_2');
			setTimeout(function() {
				$('section._i').addClass('move_3');
				$('section._ii').addClass('move_3');
        		$('body').addClass('move_3');
				setTimeout(function() {
					$('section._i').addClass('move_4');
					$('section._ii').addClass('move_4');
            		$('body').addClass('move_4');
					setTimeout(function() {
						$('section._i').addClass('move_5');
						$('section._ii').addClass('move_5');
                		$('body').addClass('move_5');
    					setTimeout(function() {
    						$('section._i').addClass('move_6');
    						$('section._ii').addClass('move_6');
                    		$('body').addClass('move_6');
        					setTimeout(function() {
        						$('section._i').addClass('move_7');
        						$('section._ii').addClass('move_7');
                        		$('body').addClass('move_7');
        					}, 500);
    					}, 300);
					}, 100);
				}, 0);
			}, 0);
		}, 0);
	}, 0);
  });
  $(document).ready(function() {
    $('.splitting.words').each(function() {
        $(this).find('span.char').each(function(index) {
            var delay = (index * 0.015).toFixed(2); 
            $(this).css('transition-delay', delay + 's');
        });
    });
  
    $('.splitting.words').each(function() {
        $(this).find('.word').each(function(index) {
            var delay = (index * 0.025).toFixed(2); 
            $(this).css('transition-delay', delay + 's');
        });
    });
  });
/* END GLOBAL ANIMATION */
/* SCROLLMAGIC */
  document.addEventListener('DOMContentLoaded', function () {
    let controller = new ScrollMagic.Controller({
      refreshInterval: 0,
    });  
    let height_i = $("main>section._i").height();
    let height_ii = $("main>section._ii").height();
    let height_iii = $("main>section._iii").height();
    let height_iv = $("main>section._iv").height();
    let height_v = $("main>section._v").height();
    let height_vi = $("main>section._vi").height();
    let height_vii = $("main>section._vii").height();
    let height_viii = $("main>section._viii").height();
    let height_ix = $("main>section._ix").height();
    let height_x = $("main>section._x").height();

    
    var scene_header_1 = new ScrollMagic.Scene({triggerElement: "#trigger_header" })
      .setClassToggle("#shopify-section-head", "down")
      .triggerHook(0.4)
      //.addIndicators()
      .addTo(controller);

    
    /*
        var anim_ii_2 = TweenMax.to("._marquee._1 ._track ._content", 0.5, {x: "-10%", ease: Power1.easeInOut});
        var scene_ii_2 = new ScrollMagic.Scene({triggerElement: "#trigger_header", duration: (height_i * 3) })
          .setTween(anim_ii_2)
          .triggerHook(0.9)
          //.addIndicators()
          .addTo(controller);
        
        var anim_ii_3 = TweenMax.to("._marquee._2 ._track ._content", 0.5, {x: "-10%", ease: Power1.easeInOut});
        var scene_ii_3 = new ScrollMagic.Scene({triggerElement: "._marquee._2", duration: (height_i * 3) })
          .setTween(anim_ii_3)
          .triggerHook(0.9)
          //.addIndicators()
          .addTo(controller);
        
        var anim_ii_4 = TweenMax.to("._marquee._3 ._track ._content", 0.5, {x: "-10%", ease: Power1.easeInOut});
        var scene_ii_4 = new ScrollMagic.Scene({triggerElement: "._marquee._3", duration: (height_i * 3) })
          .setTween(anim_ii_4)
          .triggerHook(0.9)
          //.addIndicators()
          .addTo(controller);
    */
    
  });
/* END SCROLLMAGIC */


/* SCROLL */
   var scrollPos = 0;
  // adding scroll event
   window.addEventListener('scroll', function(){
    // detects new state and compares it with the new one
     if ((document.body.getBoundingClientRect()).top > scrollPos)
       $("#shopify-section-head").addClass("up");
     else
       $("#shopify-section-head").removeClass("up");
    // saves the new position for iteration.
     scrollPos = (document.body.getBoundingClientRect()).top;
   });
/* END SCROLL */



document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    console.log("Built with ❤️ by Wagon Studio with github.com/codevamon");
  }, 5000); // 5000 milisegundos = 1 segundos
});