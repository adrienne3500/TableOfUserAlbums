// import the express module
const express = require("express");

// creates an express object by calling the express module as a function
// we'll add route handlers to this object
// to specify what our server should do when different URLs are visited
const app = express();

const port = 3000;
const hostname = "localhost";

// load from JSON file
const apiFile = require("./albums.json");
const albums = apiFile["albums"];


app.get("/", function(req, res) {
    res.send(
        `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Ag-Grid Basic Example</title>
    <script src="https://unpkg.com/ag-grid-community/dist/ag-grid-community.min.js"></script>
    <script>
const bandCol = { headerName: "Band", field: "band_name" };
const albumCol = { headerName: "Album", field: "album_title" };
const genresCol = { headerName: "Genres", field: "genres" };

function addLeadingZeroIfNeeded(value) {
    if (value < 10) {
        value = "0"+value;
    }
    return value;
}

const lastPlayedCol = {
    headerName: "Last Played",
    field: "last_listened",
    sort: "desc",
    comparator: (date1, date2) => {
        if (valueIsNullish(date1) && !valueIsNullish(date2)) {
            return 1;
        } else if (!valueIsNullish(date1) && valueIsNullish(date2)) {
            return -1;
        } else if (valueIsNullish(date1) && valueIsNullish(date2)) {
            return 0;
        }
        return (date1 - date2);
    },
    valueFormatter: (params) => {
        let date = new Date(params.data.last_listened);
        let month = date.getMonth() + 1;
        month = addLeadingZeroIfNeeded(month);
        let day = date.getDate();
        day = addLeadingZeroIfNeeded(day);
        let hours = date.getHours();
        let timeOfDay = (hours < 12) ? "am" : "pm";
        if (hours > 12) {
            hours = hours - 12;
        }
        hours = addLeadingZeroIfNeeded(hours);
        let minutes = date.getMinutes();
        minutes = addLeadingZeroIfNeeded(minutes);
        return month + '/' + day + '/' + date.getFullYear() + ' ' + hours + ':' + minutes + " " + timeOfDay;
    }
};

const dateCol = {
    headerName: "Date Released",
    field: "release_date",
    valueFormatter: (params) => {
        let date = new Date(params.data.release_date);
        let month = date.getMonth() + 1;
        month = addLeadingZeroIfNeeded(month);
        let day = date.getDate();
        day = addLeadingZeroIfNeeded(day);
        let hours = date.getHours();
        if (hours > 12) {
            hours = hours - 12;
        }

        return month + '/' + day + '/' + date.getFullYear()
    }
};



const columnDefs = [
    bandCol,
    albumCol,
    genresCol,
    lastPlayedCol,
    dateCol,
];


const defaultColDef = {
    valueFormatter: params => {
        let value = params.value;
        if (valueIsNullish(value)) {
            return "--"
        } else {
            return value
        }
    }
}

function valueIsNullish(value) {
    return (value === null || value === undefined || value.length === 0);
}


function mockFetchHelper(
    isSuccess = true,
    returnValue,
    timeoutValue = 1000
) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isSuccess) {
                resolve(returnValue);
            } else {
                reject(returnValue);
            }
        }, timeoutValue);
    });
}

async function getMockFetchVal() {
    const mockFetchVal = await mockFetchHelper(true, ${ JSON.stringify(albums) });
    return mockFetchVal;
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
    getMockFetchVal().then(mockFetchVal => {
        const gridDiv = document.querySelector('#myGrid');
        // let the grid know which columns and what data to use
        const gridOptions = {
            columnDefs: columnDefs,
            rowData: mockFetchVal,
            defaultColDef: defaultColDef,
            onGridReady(params) {
                params.api.sizeColumnsToFit();
                params.api.resetRowHeights();
            }
        };
        new agGrid.Grid(gridDiv, gridOptions);
    });
});
</script>

</head>
<body>
    <div id="myGrid" style="height: 300px; width:1000px;" class="ag-theme-alpine"></div>
</body>
</html>`

);
});

// the server will now listen for HTTP requests at the url
// http://localhost:3000
app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
