// var statistics={

//     "numRepublicans":0,
//     "numDemocrats":0,
//     "numIndependent":0,
//     "numTotal":0,
//     "aveRepVotes":0,
//     "aveDemVotes":0,
//     "aveIndVotes":0
// }

// var republicans = [];
// var democrats = [];
// var independent = [];

var members = data.results[0].members;

// var sumRep = 0;
// var sumDem = 0;
// var sumInd = 0;


// for (i =0; i < members.length; i++) {

//     var member = members[i];

//     if(member.party == "R"){
//         republicans.push(member);
//         statistics.numRepublicans ++;
//         sumRep += parseInt (member.votes_with_party_pct, 10);
//         var avVotes = sumRep / republicans.length;
//         // statistics.aveRepVotes.push(avVotes);

//     }else if(member.party == "D") {
//         democrats.push(member);
//         statistics.numDemocrats ++;

//     }else if(member.party == "I"){
//         independent.push(member);
//         statistics.numIndependent ++;

//     }
// }

// console.log(sumRep / statistics.numDemocrats);
// // console.log(aveRepVotes);

// // console.log(statistics.numDemocrats);
// // console.log(republicans.length,statistics.numRepublicans);
// // console.log(statistics.numIndependent);

var senate = {
    D: {
        number: 0,
        sum: 0,
        average: 0
    },
    R: {
        number: 0,
        sum: 0,
        average: 0
    },
    I: {
        number: 0,
        sum: 0,
        average: 0
    },
    total: {
        number: 0,
        sum: 0,
        average: 0
    }
}
/* Here, we are creating a for loop that will sweep the members object and creating
a variable called member. Then, by use square brackets [], we can access the info 
under member.party, which will return D, I or R. When I say senate [member.party], if 
it returns ["D"]. senate ["D"] indicates a coincidence. So, senate[D] will bring the value 
of D in my object. This is a way to avoid going for if member.party ==="D", which would also 
be an option. It's just a cleaner way.
*/
for (var i = 0; i < members.length; i++) {
    var member = members[i];

    //Down: senate is the var up. [member.party] is a comparisson with the D,R or 
    //I objects. .sum, .number, .average are the internal objects.

    senate[member.party].number++;
    /* Here, we are getting the number according to the party and adding 1 to the number. 
    This is how we are counting the total numbers of member in a certain group (Dems, Reps, or Ind)*/
    senate[member.party].sum += parseFloat(member.votes_with_party_pct);
    /* Here, we are using the operator +=. What does it do? Instead of going:
    x = x+ y; I can use x +=y. 
    So, basically, what we're dong here is :
    senate[member.party].average = senate[member.party].average + parseFloat(member.votes_with_party_pct);
    The first time it loops, it will retunr 0 (initial value in the object) + the first 
    percent of votes in the list, say 80. The second time it loops, it will bring 80 + the new value, say 90.
    The third time it loops, the new value of sum will be 170(80+90) and will add the next value, etc. 
     */
    senate[member.party].average = senate[member.party].sum / senate[member.party].number;
    /* Here, we are calculating the average by dividing the total number, count, to summed value.
     */
}

$('#demRep').append(senate.D.number);
$('#votDem').append(senate.D.average.toFixed(2)+"%");

$('#repRep').append(senate.R.number);
$('#votRep').append(senate.R.average.toFixed(2)+"%");

$('#indRep').append(senate.I.number);
$('#votInd').append(senate.I.average.toFixed(2)+"%");


// members = members.sort(function(a, b) {
//     return (a.votes_with_party_pct - b.votes_with_party_pct)
// });
// console.log(members);

// var porcentaje = Math.ceil(members.length/100*10);

// var politiciansLoyal = [];
// var i=0;

// while(politiciansLoyal.length < porcentaje) {

// politiciansLoyal.push(politiciansLoyal[i]);
// i++; 

// }
// console.log(politiciansLoyal);
 

function getLeastLoyalPartyMembers(percentage, members) {
    members = members.sort(function(member1, member2) {
        return parseFloat(member1.votes_with_party_pct) - parseFloat(member2.votes_with_party_pct);
    })
    return getPercentageOfMembers(percentage, members);
}

function getMostLoyalPartyMembers(percentage, members) {
    members = members.sort(function(member1, member2) {
        return parseFloat(member2.votes_with_party_pct) - parseFloat(member1.votes_with_party_pct);
    })
    return getPercentageOfMembers(percentage, members);
}

function getPercentageOfMembers(percentage, partyMembers) {
    var partyMembersNeeded = Math.ceil(partyMembers.length * percentage)
    var selectedPartyMembers = []
    var i = 0;
    while (selectedPartyMembers.length < partyMembersNeeded) {
        selectedPartyMembers.push(partyMembers[i]);
        if (partyMembers[i].votes_with_party_pct == partyMembers[i + 1].votes_with_party_pct) {
            partyMembersNeeded++;
        }
        i++;
    }
    return selectedPartyMembers;
}

if ( $( "#loyaltyTable" ).length ) {
 

var leastLoyal = getLeastLoyalPartyMembers(0.1, members);

var notLoyalSenator = ''

for(i=0; i < leastLoyal.length; i++) {

  var member = leastLoyal[i];  
var name = member.first_name + ' ' + (member.middle_name || "") + ' ' + member.last_name;

var ownVotes = parseInt(parseInt(member.total_votes) / 100 * parseFloat(member.votes_with_party_pct));

notLoyalSenator += '<tr>';
notLoyalSenator += '<td>' + name + '</td>';
notLoyalSenator += '<td>' + ownVotes+ '</td>';
notLoyalSenator += '<td>' + member.votes_with_party_pct + '</td>';
notLoyalSenator += '</tr>';
}


 
    $( "#loyaltyTable" ).html(notLoyalSenator);
 
}


if ( $( "#plusLoyaltyTable" ).length ) {

var mostLoyal = getMostLoyalPartyMembers(0.1, members);
var veryLoyalSenator = ''

for(i=0; i < mostLoyal.length; i++) {

  var member = mostLoyal[i];  
var name = member.first_name + ' ' + (member.middle_name || "") + ' ' + member.last_name;
console.log(member);
var ownVotes = parseInt(parseInt(member.total_votes) / 100 * parseFloat(member.votes_with_party_pct));

veryLoyalSenator += '<tr>';
veryLoyalSenator += '<td>' + name + '</td>';
veryLoyalSenator += '<td>' + ownVotes+ '</td>';
veryLoyalSenator += '<td>' + member.votes_with_party_pct + '</td>';
veryLoyalSenator += '</tr>';
}

 $( "#plusLoyaltyTable" ).html(veryLoyalSenator);
 
}

// function getLeastLoyal(percentage,partyMembers) {

//     partyMembers = partyMembers.sort(function(a, b) {
//     return (a.votes_with_party_pct - b.votes_with_party_pct)
// });
//     console.log(partyMembers);
// }

function getMissedVotesPercentage(percentage, partyMembers) {
    var partyMembersNeeded = Math.ceil(partyMembers.length * percentage)
    var selectedPartyMembers = []
    var i = 0;
    while (selectedPartyMembers.length < partyMembersNeeded) {
        selectedPartyMembers.push(partyMembers[i]);
        if (partyMembers[i].missed_votes_pct == partyMembers[i + 1].missed_votes_pct) {
            partyMembersNeeded++;
        }
        i++;
    }
    return selectedPartyMembers;
}

function getLeastEngaged(percentage, members) {
    members = members.sort(function(member1, member2) {
        return parseFloat(member2.missed_votes_pct) - parseFloat(member1.missed_votes_pct);
    })
    return getMissedVotesPercentage(percentage, members);
}

function getMostEngaged(percentage, members) {
    members = members.sort(function(member1, member2) {
        return parseFloat(member1.missed_votes_pct) - parseFloat(member2.missed_votes_pct);
    })
    return getMissedVotesPercentage(percentage, members);
}







if ($('#leastEngagedTable').length) {

var leastEngaged = getLeastEngaged(0.1, members);
var leastEngagedSenator= '';

for(i=0; i < leastEngaged.length; i++) {

  var member = leastEngaged[i];  
var name = member.first_name + ' ' + (member.middle_name || "") + ' ' + member.last_name;
console.log(member);
var missedVotes = parseInt(member.missed_votes);

leastEngagedSenator += '<tr>';
leastEngagedSenator += '<td>' + name + '</td>';
leastEngagedSenator += '<td>' + missedVotes+ '</td>';

leastEngagedSenator += '<td>' + member.missed_votes_pct + "%"+'</td>';
leastEngagedSenator += '</tr>';
}

$('#leastEngagedTable').html(leastEngagedSenator);

}






if ($('#veryEngagedTable').length) {

var mostEngaged = getMostEngaged(0.1, members);
var veryEngagedSenator= '';

for(i=0; i < mostEngaged.length; i++) {

  var member = mostEngaged[i];  
var name = member.first_name + ' ' + (member.middle_name || "") + ' ' + member.last_name;
console.log(member);
var missedVotes = parseInt(member.missed_votes);

veryEngagedSenator += '<tr>';
veryEngagedSenator += '<td>' + name + '</td>';
veryEngagedSenator += '<td>' + missedVotes+ '</td>';

veryEngagedSenator += '<td>' + member.missed_votes_pct + "%"+'</td>';
veryEngagedSenator += '</tr>';
}

$('#veryEngagedTable').html(veryEngagedSenator);

}

 

