function checkLanguage(
    value
)
{
    $(document).ready(function() {
        if (value != 'default') {
            $('#returnCheckLanguage').css("display","none");
        } else {
            $('#returnCheckLanguage').css("display","block");
        }
    });
}
