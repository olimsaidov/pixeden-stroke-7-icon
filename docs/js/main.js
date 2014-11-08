
$(document).ready(function(){

$("input[class=code-value]").each(function() {
    var unicode = "&amp;#x" + $(this).val();
    $(this).parent().append('<span class="unicode-text">('+unicode+')</span>');
});

$('.selectpicker').selectpicker();    

$('.selectpicker').change(function(){
    val = $('.selectpicker option:selected').val();
    $('.font-icon-detail span:first-child').css( "font-size", val + "px" );
    $('#content').removeClass().addClass("size"+val);
});

$('#chkbx-1').change(function() {
   if($(this).is(":checked")) {
        $('.font-icon-code').slideDown();
      return;
   }
    $('.font-icon-code').slideUp();
});

$('#s1').change(function() {
   if($(this).is(":checked")) {
        $('body').addClass("dark");
      return;
   }
        $('body').removeClass("dark");
});

    $('#nav').affix({
        offset: { top: $('#nav').offset().top },
    });

$('#nav').on('affix.bs.affix', function () {
    $('#font_options_bar').height($("#nav").height());
});

$('#nav').on('affixed-top.bs.affix', function () {
    $('#font_options_bar').height('auto');
});

    // Init Skrollr
    var s = skrollr.init({
        forceHeight: false,
        render: function(data) {
        }
    });

}) // Ready