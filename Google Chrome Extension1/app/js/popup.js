$(document).ready(function () {
    $("#myTags").tagit({ allowSpaces: true });
    $(".ui-autocomplete-input").attr("placeholder", "Enter tags");
    $(function () {
        $("#myTags").removeClass("ui-corner-all");
        $(".ui-autocomplete-input").focus(function () {
            $("#myTags").addClass("blur");
        });
        $(".ui-autocomplete-input").focusout(function () {
            $("#myTags").removeClass("blur");
        });
    });
    var url;
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        $("#page_url").val(tabs[0].url);
        $("#page_title").val(tabs[0].title);
    });
    
    
    $('#save').on("click", function () {

        var url = $("#page_url").val();
        var note = $("#page_summary").val();
        //var tagnames = $("#page_tag").val().split(",");
        var title = $("#page_title").val();
        //alert("Sending data url=" + url + "Note=" + note + "tags=" + $("#page_tag").val() + "title=" + title);
        var tagData = [];

        for (var i = 0; i < $(".tagit-label").length; i++) {
            tagData[i] = {
                "ID": i,
                "Name": $(".tagit-label")[i].innerHTML,
                "ParentID": "1",
                "UserID": "2"
            };
        }

        var srcData = {
            "Source": {
                "ID": 0,
                "UserID": 2,
                "Title": title,
                "Link": url,
                "Summary": note,
                "ReadLater": false,
                "SaveOffline": false,
                "Privacy": false,
                "Rating": 0,
                "ModifiedAt": Date()
            },
            "Tags": tagData
        }

        // Script to add Source to database.
        $.ajax({
            type: "POST",
            dataType: "application/json",
            data: srcData,
            url: 'http://localhost:5555/api/Source',
            success: function (data) {
                document.body.innerHTML += "<b><center>Saved</b></center>";
                setTimeout(function () {
                    window.close();
                }, 2000);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                document.body.innerHTML += "<b><center>Sorry...NOT saved</b></center>";
            }
        });
        
    });

});