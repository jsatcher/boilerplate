// Must init foundation before any of the built-in components will work.
$(document).foundation();

// Add the "modal-is-open" class to the body when a modal is opened
// @see http://foundation.zurb.com/docs/components/reveal.html
$(document).on('open.fndtn.reveal', function (evt) {
  $('body').addClass('modal-is-open');
});

// Remove the "modal-is-open" class to the body when a modal is closed
// @see http://foundation.zurb.com/docs/components/reveal.html
$(document).on('closed.fndtn.reveal', function (evt) {
  $('body').removeClass('modal-is-open');
});

// Read the contents of an uploaded file into the background property
// of a DOM element.
// @see https://developer.mozilla.org/en-US/docs/Web/API/FileReader
$('input[type=file]').on('change', function(evt) {

    var file = this.files[0];
    var reader = new FileReader();
    var viewer = $('[data-provider-name='+ this.name + ']');

    // Nothing to do if the MIME type isn't an image...
    if (!viewer || file.type.match('image') === false) {
        return;
    }

    reader.onload = function(evt) {
        viewer
            .css('background-image', 'url(' + evt.target.result + ')')
            .css('background-size', 'cover');
    };

    reader.readAsDataURL(file);
});

// This is a cheap way to get the "setup" modal to show up after
// account creation. Worth pulling out for a better solution later.
if (window.location.search.match('action=create')) {
    setTimeout(function() {
        $('#setup-modal').foundation('reveal', 'open');
    }, 50);
}