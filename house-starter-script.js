jQuery(document).ready(function($) {

    $.getJSON('https://nytimes-ubiqum.herokuapp.com/congress/113/house', function(data, textStatus) {


        var members = data.results[0].members;
        // var houseTable = '';



        // for (var i = 0; i < members.length; i++) {
        //     var dir = members[i];
        //     var names = dir.first_name + ' ' + (dir.middle_name || "") + ' ' + dir.last_name;

        //     houseTable += '<tr class="' + dir.party + '">';

        //     houseTable += '<td>' + '<a href=  "' + dir.url + '" target = _blank >' + names + '</a>' + '</td>';
        //     houseTable += '<td>' + dir.party + '</td>';
        //     houseTable += '<td>' + dir.state + '</td>';
        //     houseTable += '<td>' + dir.seniority + '</td>';
        //     houseTable += '<td>' + dir.votes_with_party_pct + '%' + '</td>';


        //     houseTable += '</tr>';;


        // }
        // houseTable += '</tbody>';
        // // document.getElementById("house-data").innerHTML = houseTable;
        // $("#house-data tbody").html(houseTable);


        var FilterStates = [];

        for (var i = 0; i < members.length; i++) {
            var dir = members[i];

            if ($.inArray(dir.state, FilterStates) == -1) {
                FilterStates.push(dir.state)
            }


        }

        FilterStates = FilterStates.sort();
        var select = $('#state-filter');

        select.append('<option value="all">State</option>');

        for (var i = 0; i < FilterStates.length; i++) {
            var state = FilterStates[i];

            select.append('<option class="state-option" value="' + state + '">' + state + '</option>');

        }



        var currentFilter = {
            state: "all",
            parties: []
        }



        $(".party-element").click(function() {

            currentFilter.parties = [];

            $('input.party-element').each(function() {
                if ($(this).is(':checked')) {
                    currentFilter.parties.push($(this).val())
                }
            });

            updateTable();
        });


        $("#state-filter").change(function() {

            currentFilter.state = $(this).val();
            updateTable();

        });


        function updateTable() {
            console.log("Show update Table")
            $('tbody tr').each(function(i, tr) {

                var stateMatches = false;


                if (currentFilter.state != "all") {

                    if ($(tr).find('td:contains("' + currentFilter.state + '")').length > 0) {
                        stateMatches = true;
                    }

                } else {
                    stateMatches = true;
                }
                 var partyMatches = false;

                if (currentFilter.parties.length != 0) {
                    $.each(currentFilter.parties, function(index, party) {
                        if ($(tr).hasClass(party)) {
                            partyMatches = true;
                        }

                    });
                } else {
                    partyMatches = true;
                }


                if (partyMatches && stateMatches) {
                    $(tr).show()
                } else {
                    $(tr).hide()
                }

            })

        }

    });


});