$(document).ready(function () {

    jQuery.noConflict();
    var url_base = "https://api.github.com/users/";
    var url_repos;
    var url_starred;

    $("#searhButton").click(function () {
        var field = $('#pesquisa_id').val();
        if (field != null && field != "" && field != undefined) {
            $('.content').empty();
            $.getJSON(url_base + field, function (data) {
                url_repos = data.repos_url;
                url_starred = data.starred_url;
                processJsonSearchUser(data);
            }).fail(function() {
                swal("Error","No result for search query.", "error");
            });
        }
    });

    function processJsonSearchUser(json) {

        var nome = json.name != null && json.name != "" ? json.name : "";
        var blog = json.blog != null && json.blog != "" ? json.blog : "";
        var company = json.company != null && json.company != "" ? json.company : "";
        var bio = json.bio != null && json.bio != "" ? json.bio : "";

        var content = $('.content');
        content.append(
            '<div class="card" style="width: 18rem;">'
                + '<img class="card-img-top" width="120" height="100" src="'+json.avatar_url+'">'
                + '<div class="card-body">'
                   + '<h5 class="card-title">'+nome+'</h5>'
                   + '<a class="card-title" target="_blank" href="'+blog+'">'+blog+'</a>'
                   + '<h5 class="card-title">'+company+'</h5>'
                   + '<p class="card-text">'+bio+'</p>'
                   + '<a class="btn btn-primary" target="_blank" href="'+json.html_url+'">GitHub Page</a>'
            +'</div>');
        content.append('</br>');
        content.append('<button id="searchRepos" type="button" class="btn btn-primary">Repos</button> ');
        content.append(' <button id="searchStarted" disabled type="button" class="btn btn-info">Starred</button>');
        content.append('<br>');
        content.append('<br>');
        content.append(
            '<div class="repos">'
                +'<ul class="list-group"></ul>'+
            '</div>');
    }

    $(document).on('click', '#searchRepos', function () {

        if (url_repos != null && url_repos != "" && url_repos != undefined) {
            $.getJSON(url_repos, function (data) {
                if(data == null || data.length == 0){
                    swal("Info","No repository found.", "info");
                } else {
                    processJsonSearchRepos(data);
                }
            }).fail(function() {
                swal("Error","No result for search query.", "error");
            });
        }
    });


    /**
        Not implemented
     **/
    $(document).on('click', '#searchStarted', function () {
        if (url_starred != null && url_starred != "" && url_starred != undefined) {
            $.getJSON(url_starred, function (data) {
                processJsonSearchRepos(data);
            }).fail(function() {
                swal("Error","No result for search query.", "error");
            });
        }
    });

    function processJsonSearchRepos(data) {
        $('.list-group').empty();
        for (i in data) {
            $(".list-group").append('<li class="list-group-item">' + data[i].full_name + ' ' + '<a target="_blank" href="' + data[i].html_url + '"' + '>' + data[i].html_url + '</a>').append('</li>');
        }
    }
});
