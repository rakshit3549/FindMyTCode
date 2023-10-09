
const spreadsheetId = '1QkX41onUjrmg6dUa8Zv1jYlpft858GjyE2ReyCN2_Uo'
fetch(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&sheet=TCode_list`)
    .then(res => res.text())
    .then(text => {
        const json = JSON.parse(text.substring(47).slice(0, -2))
        const jsondata = json['table']["rows"];

        let trHTML = '';
        for (var i = 1; i < jsondata.length; ++i) {
            trHTML += '<tr><td class="col1" scope="row">' + (i) +
                '</td><td class="col2">' + jsondata[i]['c'][0]['v'] +
                '</td><td class="col3">' + jsondata[i]['c'][1]['v'] +
                '</td></tr>';
        }
        var tableContent = document.getElementById('tableContent');
        tableContent.innerHTML = trHTML;
        trHTML = '';

    }).then(() => {
        document.getElementById("table-container").style.visibility = "visible";
    }).then(() => {

        const rows = document.getElementById('tableContent')
            .getElementsByTagName('tr');

        let searchTimer;
        function filterTable() {

            clearTimeout(searchTimer);
            searchTimer = setTimeout(() => {
                let foundMatch = false;
                const searchQuery = document.getElementById('search').value.toLowerCase();

                for (let i = 0; i < rows.length; i++) {
                    const row = rows[i];
                    const tcode = row.getElementsByTagName('td')[1].innerText.toLowerCase();
                    const description = row.getElementsByTagName('td')[2].innerText.toLowerCase();

                    if (tcode.includes(searchQuery) || description.includes(searchQuery)) {
                        row.style.display = '';
                        foundMatch = true;
                    } else {
                        row.style.display = 'none';
                    }
                }
                const table = document.getElementById('table');
                table.style.display = foundMatch ? '' : 'none';
            }, 250);
        };

        const searchInput = document.getElementById('search');
        searchInput.addEventListener('input', filterTable);

    });
