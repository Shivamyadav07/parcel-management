var data = [

    {

        id: 10,

        name: "PARCEL1",

        sequence: 1,

        group: "Mumbai"

    },

    {

        id: 11,

        name: "PARCEL2",

        sequence: 2,

        group: "Mumbai"

    },

    {

        id: 13,

        name: "PARCEL3",

        sequence: 3,

        group: "Mumbai"

    },

    {

        id: 19,

        name: "PARCEL4",

        sequence: 4,

        group: "Delhi"

    },

    {

        id: 18,

        name: "PARCEL5",

        sequence: 5,

        group: "Delhi"

    },

    {

        id: 21,

        name: "PARCEL6",

        sequence: 6,

        group: "Kolkata"

    },

    {

        id: 12,

        name: "PARCEL7",

        sequence: 7,

        group: "Kolkata"

    },

    {

        id: 22,

        name: "PARCEL8",

        sequence: 8,

        group: "Kolkata"

    },

    {

        id: 23,

        name: "PARCEL9",

        sequence: 9,

        group: "Kolkata"

    },

    {

        id: 24,

        name: "PARCEL10",

        sequence: 10,

        group: "Mumbai"

    },

    {

        id: 25,

        name: "PARCEL11",

        sequence: 11,

        group: "Mumbai"

    },

    {

        id: 31,

        name: "PARCEL12",

        sequence: 12,

        group: "Mumbai"

    },

    {

        id: 34,

        name: "PARCEL13",

        sequence: 13,

        group: "Mumbai"

    },

    {

        id: 35,

        name: "PARCEL14",

        sequence: 14,

        group: "Delhi"

    },

    {

        id: 41,

        name: "PARCEL15",

        sequence: 15,

        group: "Delhi"

    },

    {

        id: 42,

        name: "PARCEL16",

        sequence: 16,

        group: "Delhi"

    },

    {

        id: 43,

        name: "PARCEL17",

        sequence: 17,

        group: "Delhi"

    },

    {

        id: 44,

        name: "PARCEL18",

        sequence: 18,

        group: "Kolkata"

    },

    {

        id: 53,

        name: "PARCEL19",

        sequence: 19,

        group: "Kolkata"

    },

    {

        id: 57,

        name: "PARCEL20",

        sequence: 20,

        group: "Kolkata"

    }

];
var copyData = [...data];

// creating function to get group color and parcel color dynamically
function getGroupColor(group) {
    switch (group) {
        case 'Mumbai':
            return 'rgb(240,21,94)';
        case 'Delhi':
            return 'rgb(241,194,50)';
        case 'Kolkata':
            return 'rgb(60,121,216)';
        default:
            return 'rgb(241,194,50)';
    }
}

var selectedData = "";
var selectedIndex = "";

// function for creating new header group
function createHeaderGroup(currgroup, count) {
    let group = document.createElement("div");
    group.textContent = currgroup;
    group.classList.add("group", currgroup);
    group.style.width = count * 140 + "px";
    return group;
}

// this is the function for rendering the application according to data
function renderParcel(parcelData) {
    let parcel_group = document.querySelector(".parcel_group");
    parcel_group.innerHTML = "";
    let currentGroup = null;
    let count = 0;

    let display_parcel = document.querySelector(".display_parcel");
    display_parcel.innerHTML = "";

    let parcel_text = document.querySelector(".selected_parcel");
    parcel_text.innerHTML = "";

    selectedData = "";
    selectedIndex = "";

    document.querySelector("input").value = "";
    document.querySelector("select").value = "";

    parcelData.map((e, index) => {

        // logic for when to create new group and when to just increment the count
        if (e.group !== currentGroup) {
            if (currentGroup !== null) {
                let groupDiv = createHeaderGroup(currentGroup, count);
                parcel_group.appendChild(groupDiv)
            }
            currentGroup = e.group;
            count = 1;
        } else {
            count++;
        }

        // creation of parcel div and appending it into the display_parcel container 
        let parcelDiv = document.createElement("div");
        parcelDiv.setAttribute("class", "parcelDiv");

        let name = document.createElement("div");
        name.innerText = e.name;

        let sequence = document.createElement("div");
        sequence.innerText = e.sequence
        sequence.style.backgroundColor = getGroupColor(e.group);
        sequence.setAttribute("class", "sequence_div");

        parcelDiv.append(name, sequence);

        // addition of event for selecting particular parcel and show the selected parcel
        parcelDiv.addEventListener("click", function () {
            if (parcelDiv.classList.contains("selected")) {
                parcelDiv.classList.remove("selected");
                document.querySelector(".selected_parcel").textContent = ""
                selectedData = "";
                selectedIndex = "";
                parcelDiv.style.border = ""
            }
            else {
                let selectedParcel = document.querySelector(".selected");
                if (selectedParcel) {
                    selectedParcel.classList.remove("selected");
                    selectedParcel.style.border = ""
                    selectedData = ""
                    selectedIndex = "";
                }
                parcelDiv.classList.add("selected");
                document.querySelector(".selected_parcel").textContent = e.name;
                selectedData = e;
                selectedIndex = index;
                parcelDiv.style.border = "2px dashed rgb(30,134,134)"
            }
        })
        display_parcel.append(parcelDiv);
    })

    // creation add addition of the last group header because it was not getting added while mapping the data
    if (currentGroup !== null) {
        let groupDiv = createHeaderGroup(currentGroup, count);
        parcel_group.appendChild(groupDiv)
    }
}

renderParcel(data);

// function and logic to handle the addition of new parcel after selected parcel
function handleAddAfter() {
    if (!selectedData) {
        alert("User needs to select a parcel first")
    }
    else {
        let name = document.querySelector("input").value;
        let location = document.querySelector("select").value;
        if (name === "" || location === "") {
            alert("Please enter Name and Location")
        } else {
            const newParcel = {
                id: data.length + 1,
                name: name,
                sequence: selectedData.sequence + 1,
                group: location
            }
            for (let i = selectedIndex + 1; i < copyData.length; i++) {
                copyData[i].sequence += 1;
            }
            copyData.splice(selectedIndex + 1, 0, newParcel);
            renderParcel(copyData);
        }
    }
}

// function and logic to handle the addition of new parcel before selected parcel
function handleAddBefore() {
    if (!selectedData) {
        alert("User needs to select a parcel first")
    }
    else {
        let name = document.querySelector("input").value;
        let location = document.querySelector("select").value;
        if (name === "" || location === "") {
            alert("Please enter Name and Location")
        } else {
            const newParcel = {
                id: data.length + 1,
                name: name,
                sequence: selectedData.sequence,
                group: location
            }
            for (let i = selectedIndex; i < copyData.length; i++) {
                copyData[i].sequence += 1;
            }
            copyData.splice(selectedIndex, 0, newParcel);
            renderParcel(copyData);
        }
    }
}

// function and logic to handle the replacement of selected parcel
function handleReplace() {
    if (!selectedData) {
        alert("User needs to select a parcel first")
    }
    else {
        let name = document.querySelector("input").value;
        let location = document.querySelector("select").value;
        if (name === "" || location === "") {
            alert("Please enter Name and Location")
        } else {
            const newParcel = {
                id: data.length + 1,
                name: name,
                sequence: selectedData.sequence,
                group: location
            }
            copyData.splice(selectedIndex, 1, newParcel);
            renderParcel(copyData);
        }
    }
}

// function and logic to handle the deletion of selected parcel
function handleDelete() {
    if (!selectedData) {
        alert("User needs to select a parcel first")
    } else {
        copyData.splice(selectedIndex, 1);
        renderParcel(copyData);
    }

}

// function and logic to show the original data
function handleRefresh() {
    renderParcel(data);
}

// function and logic to display final result after all operations are done on data
function handleShowFinal() {
    renderParcel(copyData);
}